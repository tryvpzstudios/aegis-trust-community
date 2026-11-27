import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
const schema=JSON.parse(await readFile("schemas/evidence-record-v1.schema.json","utf8"));
const sample=JSON.parse(await readFile("tests/evidence-record-valid-synthetic.json","utf8"));
const graph=JSON.parse(await readFile("tests/synthetic-evidence-graph-001.json","utf8"));
const ajv=new Ajv2020({allErrors:true,strict:true}); addFormats(ajv); const validate=ajv.compile(schema);
assert.equal(validate(sample),true,JSON.stringify(validate.errors));
const invalid=structuredClone(sample); invalid.synthetic=false; assert.equal(validate(invalid),false);
const badHash=structuredClone(sample); badHash.evidence_items[1].hash="xyz"; assert.equal(validate(badHash),false);
const ids=new Set(graph.nodes.map(n=>n.id)); assert.equal(ids.size,graph.nodes.length);
for(const e of graph.edges){assert.ok(ids.has(e.from));assert.ok(ids.has(e.to));}
assert.equal(graph.synthetic,true); assert.equal(graph.expected_interpretation.status,"INDETERMINATE");
assert.ok(graph.expected_interpretation.forbidden_inferences.some(x=>/hash match proves/i.test(x)));
console.log("PASS: JSON Schema synthetic evidence record");
console.log("PASS: invalid synthetic flag and malformed hash rejected");
console.log("PASS: graph node IDs and edge references");
console.log("PASS: limitations and forbidden inferences retained");