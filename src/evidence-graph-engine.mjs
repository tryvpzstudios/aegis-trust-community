/**
 * AEGIS TRUST Evidence Graph Engine v0.2 (synthetic/public prototype)
 * Conservative graph validation and relationship summaries.
 * NOT a truth, authenticity, legal, safety, or confidence engine.
 */
const ALLOWED_RELATIONS=new Set(["supports","contradicts","derived_from","same_subject","context_for","integrity_checked","observed_from","assesses"]);
const RELATION_TYPE_RULES={
  supports:["evidence","claim"],
  contradicts:["evidence","claim"],
  integrity_checked:["evidence","evidence"],
  observed_from:["observation","evidence"]
};

export function validateGraph(graph) {
  const errors=[];
  if(!graph||typeof graph!=="object"||Array.isArray(graph)) return ["Graph must be an object"];
  if(graph.synthetic!==true) errors.push("Only explicitly synthetic graphs accepted by this public prototype");
  if(!Array.isArray(graph.nodes)) errors.push("nodes must be an array");
  if(!Array.isArray(graph.edges)) errors.push("edges must be an array");
  if(errors.length) return errors;
  const ids=new Set();
  const nodeTypes=new Map();
  for(const [i,n] of graph.nodes.entries()){
    if(!n||typeof n!=="object"||Array.isArray(n)||!n.id||!n.type||!n.label) errors.push(`node[${i}] requires id, type, label`);
    else if(ids.has(n.id)) errors.push(`duplicate node id: ${n.id}`);
    else {ids.add(n.id);nodeTypes.set(n.id,n.type);}
  }
  for(const [i,e] of graph.edges.entries()){
    if(!e||typeof e!=="object"||Array.isArray(e)||!ids.has(e.from)||!ids.has(e.to)) errors.push(`edge[${i}] has unknown endpoint`);
    if(e?.from===e?.to) errors.push(`edge[${i}] self-loop is not allowed`);
    if(!ALLOWED_RELATIONS.has(e?.relation)) errors.push(`edge[${i}] unsupported relation`);\n    const expected=RELATION_TYPE_RULES[e?.relation];\n    if(expected&&ids.has(e?.from)&&ids.has(e?.to)&&(nodeTypes.get(e.from)!==expected[0]||nodeTypes.get(e.to)!==expected[1])) errors.push(`edge[${i}] ${e.relation} must connect ${expected[0]} to ${expected[1]}`);
  }
  return errors;
}
export function analyzeGraph(graph) {
  const errors=validateGraph(graph);
  if(errors.length) return {valid:false,errors};
  const claims=graph.nodes.filter(n=>n.type==="claim");
  const counts=new Map(claims.map(c=>[c.id,{support:0,contra:0}]));
  const adj=new Map(graph.nodes.map(n=>[n.id,[]]));
  // Single pass over edges builds relationship counts and adjacency.
  for(const e of graph.edges){
    adj.get(e.from).push(e.to);
    adj.get(e.to).push(e.from);
    const c=counts.get(e.to);
    if(c){if(e.relation==="supports")c.support++;else if(e.relation==="contradicts")c.contra++;}
  }
  const claimResults=claims.map(c=>{
    const {support,contra}=counts.get(c.id);
    let status="NOT_CHECKED";
    if(support&&contra)status="DISPUTED";
    else if(contra)status="DISPUTED";
    else if(support)status="INDETERMINATE";
    return {claim_id:c.id,status,supporting_relationships:support,contradicting_relationships:contra};
  });
  const paths={};
  for(const claim of claims){
    const seen=new Set([claim.id]),queue=[claim.id];
    // Head index avoids repeated Array.shift() reindexing on large traversals.
    for(let head=0;head<queue.length;head++){
      const cur=queue[head];
      for(const next of adj.get(cur)){
        if(!seen.has(next)){seen.add(next);queue.push(next);}
      }
    }
    paths[claim.id]=[...seen];
  }
  return {valid:true,graph_id:graph.graph_id??null,node_count:graph.nodes.length,edge_count:graph.edges.length,claims:claimResults,connected_nodes_from_claim:paths,
    limitations:["Synthetic-only public prototype","Relationship labels are assertions in the graph, not proof","No source authenticity or truth determination","No numeric confidence or credibility score","Connected-path traversal is topology-only"]};
}
