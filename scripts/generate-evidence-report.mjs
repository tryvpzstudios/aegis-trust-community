import {readFile,writeFile} from "node:fs/promises";
import {buildEvidenceReport,renderEvidenceReportHTML} from "../src/evidence-report.mjs";
const input=process.argv[2]??"tests/synthetic-evidence-graph-001.json";
const jsonOut=process.argv[3]??"evidence-report.json";
const htmlOut=process.argv[4]??"evidence-report.html";
const graph=JSON.parse(await readFile(input,"utf8"));
const report=buildEvidenceReport(graph);
await writeFile(jsonOut,JSON.stringify(report,null,2)+"\n");
await writeFile(htmlOut,renderEvidenceReportHTML(report));
if(!report.valid){console.error("Graph rejected:",report.errors);process.exitCode=1;}
else console.log("Generated:",jsonOut,htmlOut);
