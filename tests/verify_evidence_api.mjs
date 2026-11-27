import assert from "node:assert/strict";
import {createEvidenceApiServer} from "../scripts/evidence-api-server.mjs";
import {readFile} from "node:fs/promises";
const graph=JSON.parse(await readFile("tests/synthetic-evidence-graph-001.json","utf8"));
const conflict=JSON.parse(await readFile("tests/synthetic-evidence-graph-002-conflict.json","utf8"));
const server=createEvidenceApiServer();await new Promise(r=>server.listen(0,"127.0.0.1",r));const base="http://127.0.0.1:"+server.address().port;
try{
 let r=await fetch(base+"/health");assert.equal(r.status,200);assert.equal((await r.json()).mode,"synthetic-only");
 r=await fetch(base+"/v1/analyze",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(graph)});assert.equal(r.status,200);assert.equal((await r.json()).result.claims[0].status,"INDETERMINATE");
 r=await fetch(base+"/v1/analyze",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(conflict)});assert.equal(r.status,200);assert.equal((await r.json()).result.claims[0].status,"DISPUTED");
 r=await fetch(base+"/v1/report",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(graph)});assert.equal(r.status,200);assert.equal((await r.json()).result.summary.claims[0].status,"INDETERMINATE");
 r=await fetch(base+"/v1/analyze",{method:"POST",headers:{"content-type":"text/plain"},body:"{}"});assert.equal(r.status,415);
 r=await fetch(base+"/v1/analyze",{method:"POST",headers:{"content-type":"application/json"},body:"{"});assert.equal(r.status,400);
 r=await fetch(base+"/v1/analyze",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...graph,synthetic:false})});assert.equal(r.status,422);
 r=await fetch(base+"/bad");assert.equal(r.status,404);
 r=await fetch(base+"/v1/analyze",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...graph,nodes:[...graph.nodes,{id:graph.nodes[0].id,type:"claim",label:"duplicate"}]})});assert.equal(r.status,422);
 console.log("PASS: health, analyze, report endpoints");
 console.log("PASS: conservative statuses INDETERMINATE/DISPUTED");
 console.log("PASS: content-type, malformed JSON, non-synthetic, invalid graph, 404 errors");
}finally{await new Promise(r=>server.close(r));}
