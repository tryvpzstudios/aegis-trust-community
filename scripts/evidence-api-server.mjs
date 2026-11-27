import {createServer} from "node:http";
import {analyzeGraph} from "../src/evidence-graph-engine.mjs";
import {buildEvidenceReport} from "../src/evidence-report.mjs";
const MAX_BODY=1024*1024;
function send(res,status,obj){const body=JSON.stringify(obj);res.writeHead(status,{"content-type":"application/json; charset=utf-8","content-length":Buffer.byteLength(body),"cache-control":"no-store","x-content-type-options":"nosniff"});res.end(body);}
async function body(req){let chunks=[],size=0;for await(const c of req){size+=c.length;if(size>MAX_BODY)throw Object.assign(new Error("Request body exceeds 1 MiB limit"),{status:413});chunks.push(c);}if(!size)throw Object.assign(new Error("JSON body required"),{status:400});try{return JSON.parse(Buffer.concat(chunks).toString("utf8"));}catch{throw Object.assign(new Error("Malformed JSON"),{status:400});}}
export function createEvidenceApiServer(){return createServer(async(req,res)=>{
 if(req.method==="GET"&&req.url==="/health"){return send(res,200,{ok:true,service:"AEGIS TRUST Evidence API prototype",version:"0.1.0",mode:"synthetic-only"});}
 if(req.method!=="POST"||!["/v1/analyze","/v1/report"].includes(req.url)){return send(res,404,{error:"NOT_FOUND",message:"Route not found"});}
 if(!req.headers["content-type"]?.toLowerCase().startsWith("application/json"))return send(res,415,{error:"UNSUPPORTED_MEDIA_TYPE",message:"Content-Type must be application/json"});
 try{const g=await body(req);if(g?.synthetic!==true)return send(res,422,{error:"SYNTHETIC_ONLY",message:"Prototype accepts only synthetic graphs marked synthetic:true"});
 const result=req.url==="/v1/analyze"?analyzeGraph(g):buildEvidenceReport(g);
 if(result.valid===false)return send(res,422,{error:"INVALID_GRAPH",details:result.errors});
 return send(res,200,{ok:true,result});
 }catch(e){return send(res,e.status??400,{error:e.status===413?"PAYLOAD_TOO_LARGE":"BAD_REQUEST",message:e.message});}
 });}
if(process.env.AEGIS_API_AUTOSTART==="1"){const server=createEvidenceApiServer();const port=Number(process.env.PORT??8787);server.listen(port,"127.0.0.1",()=>console.log("AEGIS synthetic API listening on 127.0.0.1:"+port));}
