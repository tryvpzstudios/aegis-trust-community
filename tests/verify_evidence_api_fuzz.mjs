import assert from "node:assert/strict";
import {createEvidenceApiServer} from "../scripts/evidence-api-server.mjs";

const server=createEvidenceApiServer();
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const base="http://127.0.0.1:"+server.address().port;
const post=(payload,headers={"content-type":"application/json"})=>fetch(base+"/v1/analyze",{method:"POST",headers,body:payload});
const safeGraph=(nodes=2,edges=1)=>({synthetic:true,graph_id:"fuzz",nodes:Array.from({length:nodes},(_,i)=>({id:"n"+i,type:i===0?"claim":"evidence",label:"Node "+i})),edges:edges?Array.from({length:edges},(_,i)=>({from:"n"+(i%nodes),to:"n"+((i+1)%nodes),relation:"supports"})):[]});
try {
  // Strict media-type boundary cases.
  let media=await post("{}",{"content-type":"application/jsonp"});assert.equal(media.status,415);
  media=await post("{}",{"content-type":"application/json-evil"});assert.equal(media.status,415);
  media=await post(JSON.stringify(safeGraph()),{"content-type":"application/json; charset=utf-8"});assert.equal(media.status,200);
  // Deterministic boundary fuzz: malformed JSON, scalar/object/array payloads, and schema mutations.
  const malformed=["", "{", "null", "[]", "true", "42", "\"x\"", "{\"synthetic\":true"];
  for(const body of malformed){const r=await post(body);assert.ok([400,422].includes(r.status),`unexpected status for ${JSON.stringify(body)}: ${r.status}`);await r.text();}
  const mutations=[
    g=>({...g,synthetic:1}), g=>({...g,nodes:null}), g=>({...g,edges:null}),
    g=>({...g,nodes:[null,...g.nodes.slice(1)]}), g=>({...g,edges:[null]}),
    g=>({...g,edges:[{from:"missing",to:"n0",relation:"supports"}]}),
    g=>({...g,edges:[{from:"n0",to:"n0",relation:"supports"}]}),
    g=>({...g,edges:[{from:"n0",to:"n1",relation:"\u0000"}]}),
    g=>({...g,graph_id:"\u0007"}),
    g=>({...g,nodes:[{id:"n0",type:"claim",label:"\u001b"} ,g.nodes[1]]}),
    g=>({...g,nodes:[{id:"n0",type:[],label:"x"},g.nodes[1]]}),
    g=>({...g,edges:[{from:[],to:"n1",relation:"supports"}]})
  ];
  for(const mutate of mutations){const r=await post(JSON.stringify(mutate(safeGraph())));assert.ok([400,422].includes(r.status),`mutation unexpectedly accepted: ${r.status}`);await r.text();}
  // Seeded deterministic random malformed JSON strings.
  let seed=0xAE615;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed;};
  const chars="{}[],:\\\"0123456789truefalsenull abcdef\\n\\t";
  for(let i=0;i<150;i++){let s="";for(let j=0,n=rand()%120;j<n;j++)s+=chars[rand()%chars.length];const r=await post(s);assert.ok(r.status<500,`server error on fuzz input ${i}: ${r.status}`);await r.text();}
  // Bounded dense-ish synthetic graph (API limits respected). Record latency without fragile hard threshold.
  const stress=safeGraph(1000,3000);
  const started=performance.now();const r=await post(JSON.stringify(stress));const elapsed=performance.now()-started;
  assert.equal(r.status,200,"bounded graph should be accepted");const out=await r.json();assert.equal(out.result.node_count,1000);assert.equal(out.result.edge_count,3000);
  console.log("PASS: malformed/schema mutation cases");
  console.log("PASS: 150 deterministic fuzz payloads (no 5xx)");
  console.log(`PASS: maximum configured graph stress (1000 nodes / 3000 edges) in ${elapsed.toFixed(1)} ms; latency recorded, not thresholded`);
} finally {await new Promise(resolve=>server.close(resolve));}
