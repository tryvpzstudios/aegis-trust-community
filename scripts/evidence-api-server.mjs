import {createServer} from "node:http";
import {analyzeGraph} from "../src/evidence-graph-engine.mjs";
import {buildEvidenceReport} from "../src/evidence-report.mjs";

const MAX_BODY=1024*1024;
const MAX_NODES=1000;
const MAX_EDGES=3000;
const MAX_ID_LENGTH=128;
const MAX_TYPE_LENGTH=64;
const MAX_LABEL_LENGTH=2000;
const MAX_GRAPH_ID_LENGTH=128;
const ALLOWED_RELATIONS=new Set(["supports","contradicts","derived_from","same_subject","context_for","integrity_checked","observed_from","assesses"]);
const CONTROL_CHARS=/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

function send(res,status,obj){
 const body=JSON.stringify(obj);
 res.writeHead(status,{
  "content-type":"application/json; charset=utf-8",
  "content-length":Buffer.byteLength(body),
  "cache-control":"no-store",
  "x-content-type-options":"nosniff",
  "x-frame-options":"DENY",
  "referrer-policy":"no-referrer",
  "content-security-policy":"default-src 'none'; frame-ancestors 'none'",
  "permissions-policy":"camera=(), microphone=(), geolocation=()"
 });
 res.end(body);
}
async function body(req){
 let chunks=[],size=0;
 for await(const c of req){size+=c.length;if(size>MAX_BODY)throw Object.assign(new Error("Request body exceeds 1 MiB limit"),{status:413});chunks.push(c);}
 if(!size)throw Object.assign(new Error("JSON body required"),{status:400});
 try{return JSON.parse(Buffer.concat(chunks).toString("utf8"));}catch{throw Object.assign(new Error("Malformed JSON"),{status:400});}
}
function validateBoundary(g){
 const errors=[];
 if(!g||typeof g!=="object"||Array.isArray(g))return ["Request must be a JSON object"];
 if(g.synthetic!==true)return ["Only explicitly synthetic graphs accepted"];
 if(!Array.isArray(g.nodes))errors.push("nodes must be an array");
 if(!Array.isArray(g.edges))errors.push("edges must be an array");
 if(errors.length)return errors;
 if(g.nodes.length>MAX_NODES)errors.push(`nodes exceeds limit (${MAX_NODES})`);
 if(g.edges.length>MAX_EDGES)errors.push(`edges exceeds limit (${MAX_EDGES})`);
 if(g.graph_id!==undefined&&(typeof g.graph_id!=="string"||g.graph_id.length>MAX_GRAPH_ID_LENGTH||CONTROL_CHARS.test(g.graph_id)))errors.push("graph_id must be a safe string of at most 128 characters");
 for(let i=0;i<Math.min(g.nodes.length,MAX_NODES);i++){
  const n=g.nodes[i];
  if(!n||typeof n!=="object"||Array.isArray(n)){errors.push(`node[${i}] must be an object`);continue;}
  for(const [k,max] of [["id",MAX_ID_LENGTH],["type",MAX_TYPE_LENGTH],["label",MAX_LABEL_LENGTH]]){
   if(typeof n[k]!=="string"||n[k].length===0||n[k].length>max||CONTROL_CHARS.test(n[k]))errors.push(`node[${i}].${k} must be a non-empty safe string (max ${max})`);
  }
 }
 for(let i=0;i<Math.min(g.edges.length,MAX_EDGES);i++){
  const e=g.edges[i];
  if(!e||typeof e!=="object"||Array.isArray(e)){errors.push(`edge[${i}] must be an object`);continue;}
  for(const k of ["from","to"])if(typeof e[k]!=="string"||!e[k]||e[k].length>MAX_ID_LENGTH||CONTROL_CHARS.test(e[k]))errors.push(`edge[${i}].${k} must be a safe non-empty string (max ${MAX_ID_LENGTH})`);
  if(typeof e.relation!=="string"||!ALLOWED_RELATIONS.has(e.relation))errors.push(`edge[${i}].relation is unsupported`);
 }
 return errors;
}
export function createEvidenceApiServer(){return createServer(async(req,res)=>{
 if(req.method==="GET"&&req.url==="/health")return send(res,200,{ok:true,service:"AEGIS TRUST Evidence API prototype",version:"0.1.0",mode:"synthetic-only"});
 if(req.method!=="POST"||!["/v1/analyze","/v1/report"].includes(req.url))return send(res,404,{error:"NOT_FOUND",message:"Route not found"});
 const mediaType=req.headers["content-type"]?.split(";")[0].trim().toLowerCase();
 if(mediaType!=="application/json")return send(res,415,{error:"UNSUPPORTED_MEDIA_TYPE",message:"Content-Type must be application/json"});
 try{
  const g=await body(req);
  const boundaryErrors=validateBoundary(g);
  if(boundaryErrors.length)return send(res,422,{error:"INVALID_REQUEST",details:boundaryErrors});
  const result=req.url==="/v1/analyze"?analyzeGraph(g):buildEvidenceReport(g);
  if(result.valid===false)return send(res,422,{error:"INVALID_GRAPH",details:result.errors});
  return send(res,200,{ok:true,result});
 }catch(e){
  const status=e.status??400;
  const safeMessage=status===413?"Request body too large":status===400?"Malformed or missing JSON body":"Request rejected";
  return send(res,status,{error:status===413?"PAYLOAD_TOO_LARGE":"BAD_REQUEST",message:safeMessage});
 }
});}
if(process.env.AEGIS_API_AUTOSTART==="1"){
 const server=createEvidenceApiServer();
 const port=Number(process.env.PORT??8787);
 server.listen(port,"127.0.0.1",()=>console.log("AEGIS synthetic API listening on 127.0.0.1:"+port));
}
