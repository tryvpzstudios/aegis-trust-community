import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

function analyze(graph) {
  assert.equal(graph.synthetic, true, "engine test accepts synthetic graph only");
  assert.ok(Array.isArray(graph.nodes) && Array.isArray(graph.edges));
  const nodeMap = new Map();
  for (const n of graph.nodes) {
    assert.ok(n.id && n.type && n.label, "nodes require id/type/label");
    assert.ok(!nodeMap.has(n.id), "duplicate node id: " + n.id);
    nodeMap.set(n.id,n);
  }
  const adjacency = new Map([...nodeMap.keys()].map(id=>[id,[]]));
  const supporting = new Set(), contradicting = new Set();
  for (const e of graph.edges) {
    assert.ok(nodeMap.has(e.from), "unknown edge source: "+e.from);
    assert.ok(nodeMap.has(e.to), "unknown edge target: "+e.to);
    adjacency.get(e.from).push(e.to);
    if(e.relation==="supports") supporting.add(e.to);
    if(e.relation==="contradicts") contradicting.add(e.to);
  }
  const claimNodes=graph.nodes.filter(n=>n.type==="claim");
  const results=claimNodes.map(c=>{
    const hasSupport=supporting.has(c.id), hasConflict=contradicting.has(c.id);
    return {claim_id:c.id,status:hasSupport&&hasConflict?"DISPUTED":hasSupport?"INDETERMINATE":hasConflict?"DISPUTED":"NOT_CHECKED",
      support_edges:graph.edges.filter(e=>e.to===c.id&&e.relation==="supports").length,
      contradiction_edges:graph.edges.filter(e=>e.to===c.id&&e.relation==="contradicts").length,
      note:"Graph topology alone cannot establish claim truth. Status is conservative and scoped to recorded relationships."};
  });
  function reachable(start) {
    assert.ok(nodeMap.has(start),"unknown start node");
    const seen=new Set([start]), queue=[start];
    while(queue.length){const cur=queue.shift();for(const next of adjacency.get(cur)){if(!seen.has(next)){seen.add(next);queue.push(next);}}}
    return [...seen];
  }
  return {graph_id:graph.graph_id,node_count:nodeMap.size,edge_count:graph.edges.length,claims:results,reachability:Object.fromEntries(claimNodes.map(c=>[c.id,reachable(c.id)])),limitations:["Synthetic data only","Relationship edges are not proof","No source authentication or truth determination","No numeric confidence calculated"]};
}
const g1=JSON.parse(await readFile("tests/synthetic-evidence-graph-001.json","utf8"));
const g2=JSON.parse(await readFile("tests/synthetic-evidence-graph-002-conflict.json","utf8"));
const a1=analyze(g1), a2=analyze(g2);
assert.equal(a1.node_count,7);assert.equal(a1.edge_count,6);
assert.equal(a1.claims[0].status,"INDETERMINATE","support-only graph must remain indeterminate");
assert.ok(a1.reachability["CLM-001"].includes("EV-001"));
assert.equal(a2.claims[0].status,"DISPUTED","contradiction must not be hidden");
assert.equal(a2.claims[0].support_edges,1);assert.equal(a2.claims[0].contradiction_edges,1);
assert.ok(a2.limitations.some(x=>/no numeric confidence/i.test(x)));
console.log("PASS: graph topology and referential integrity");
console.log("PASS: support-only claim remains INDETERMINATE");
console.log("PASS: conflicting support/contradiction -> DISPUTED");
console.log("PASS: provenance reachability path");
console.log("PASS: limitations and no fabricated confidence");
