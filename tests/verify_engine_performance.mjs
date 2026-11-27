import assert from "node:assert/strict";
import {analyzeGraph,validateGraph} from "../src/evidence-graph-engine.mjs";
function graph(nodes,edges){return {synthetic:true,graph_id:"perf-equivalence",nodes,edges};}
const nodes=[{id:"C1",type:"claim",label:"Claim 1"},{id:"C2",type:"claim",label:"Claim 2"},{id:"E1",type:"evidence",label:"Evidence 1"},{id:"E2",type:"evidence",label:"Evidence 2"},{id:"E3",type:"evidence",label:"Evidence 3"}];
const edges=[{from:"E1",to:"C1",relation:"supports"},{from:"E2",to:"C1",relation:"contradicts"},{from:"E3",to:"C2",relation:"supports"},{from:"C1",to:"E3",relation:"context_for"}];
const result=analyzeGraph(graph(nodes,edges));
assert.equal(result.valid,true);
assert.deepEqual(result.claims,[{claim_id:"C1",status:"DISPUTED",supporting_relationships:1,contradicting_relationships:1},{claim_id:"C2",status:"INDETERMINATE",supporting_relationships:1,contradicting_relationships:0}]);
assert.deepEqual(result.connected_nodes_from_claim.C1,["C1","E1","E2","E3","C2"]);
assert.deepEqual(result.connected_nodes_from_claim.C2,["C2","E3","C1","E1","E2"]);
assert.equal(analyzeGraph(graph(nodes,[])).claims[0].status,"NOT_CHECKED");
// Large connected graph: bounded test, verifies traversal completes and all nodes are reachable.
const n=1000,e=2997;
const largeNodes=Array.from({length:n},(_,i)=>({id:"N"+i,type:i===0?"claim":"evidence",label:"N"+i}));
const largeEdges=Array.from({length:e},(_,i)=>({from:"N"+(i%n),to:"N"+((i+1)%n),relation:"context_for"}));
const large=graph(largeNodes,largeEdges);
assert.deepEqual(validateGraph(large),[]);
const t=performance.now();const out=analyzeGraph(large);const elapsed=performance.now()-t;
assert.equal(out.valid,true);assert.equal(out.connected_nodes_from_claim.N0.length,n);
console.log("PASS: optimized analysis preserves claim statuses and traversal semantics");
console.log(`PASS: 1000-node / 2997-edge bounded traversal completed in ${elapsed.toFixed(1)} ms`);
