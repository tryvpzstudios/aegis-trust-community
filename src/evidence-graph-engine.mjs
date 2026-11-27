/**
 * AEGIS TRUST Evidence Graph Engine v0.1 (synthetic/public prototype)
 * Conservative graph validation and relationship summaries.
 * NOT a truth, authenticity, legal, safety, or confidence engine.
 */
export function validateGraph(graph) {
  const errors=[];
  if(!graph||typeof graph!=="object") return ["Graph must be an object"];
  if(graph.synthetic!==true) errors.push("Only explicitly synthetic graphs accepted by this public prototype");
  if(!Array.isArray(graph.nodes)) errors.push("nodes must be an array");
  if(!Array.isArray(graph.edges)) errors.push("edges must be an array");
  if(errors.length) return errors;
  const ids=new Set();
  for(const [i,n] of graph.nodes.entries()){
    if(!n||typeof n!=="object"||!n.id||!n.type||!n.label) errors.push(`node[${i}] requires id, type, label`);
    else if(ids.has(n.id)) errors.push(`duplicate node id: ${n.id}`);
    else ids.add(n.id);
  }
  const allowed=new Set(["supports","contradicts","derived_from","same_subject","context_for","integrity_checked","observed_from","assesses"]);
  for(const [i,e] of graph.edges.entries()){
    if(!e||!ids.has(e.from)||!ids.has(e.to)) errors.push(`edge[${i}] has unknown endpoint`);
    if(e.from===e.to) errors.push(`edge[${i}] self-loop is not allowed`);
    if(!allowed.has(e.relation)) errors.push(`edge[${i}] unsupported relation`);
  }
  return errors;
}
export function analyzeGraph(graph) {
  const errors=validateGraph(graph);
  if(errors.length) return {valid:false,errors};
  const claims=graph.nodes.filter(n=>n.type==="claim").map(c=>{
    const inbound=graph.edges.filter(e=>e.to===c.id);
    const support=inbound.filter(e=>e.relation==="supports");
    const contra=inbound.filter(e=>e.relation==="contradicts");
    let status="NOT_CHECKED";
    if(support.length&&contra.length) status="DISPUTED";
    else if(contra.length) status="DISPUTED";
    else if(support.length) status="INDETERMINATE";
    return {claim_id:c.id,status,supporting_relationships:support.length,contradicting_relationships:contra.length};
  });
  const adj=new Map(graph.nodes.map(n=>[n.id,[]]));
  for(const e of graph.edges){adj.get(e.from).push({node:e.to,relation:e.relation});adj.get(e.to).push({node:e.from,relation:e.relation});}
  const paths={};
  for(const n of graph.nodes.filter(n=>n.type==="claim")){
    const seen=new Set([n.id]),queue=[n.id];
    while(queue.length){const cur=queue.shift();for(const x of adj.get(cur)){if(!seen.has(x.node)){seen.add(x.node);queue.push(x.node);}}}
    paths[n.id]=[...seen];
  }
  return {valid:true,graph_id:graph.graph_id??null,node_count:graph.nodes.length,edge_count:graph.edges.length,claims,connected_nodes_from_claim:paths,
    limitations:["Synthetic-only public prototype","Relationship labels are assertions in the graph, not proof","No source authenticity or truth determination","No numeric confidence or credibility score","Connected-path traversal is topology-only"]};
}
