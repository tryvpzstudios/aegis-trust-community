import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const suite = JSON.parse(await readFile("tests/synthetic-evidence-status-vectors.json", "utf8"));
assert.equal(suite.suite, "AEGIS-SYNTHETIC-EVIDENCE-STATUS-001");
assert.equal(suite.version, "1.0.0");
assert.ok(suite.cases.length >= 5, "at least five vectors required");
const allowed = new Set(["PASS", "FAIL", "INDETERMINATE", "DISPUTED", "NOT_CHECKED"]);
for (const c of suite.cases) {
  assert.ok(c.id && c.reason, "each vector must include id and rationale");
  assert.ok(allowed.has(c.expected), "unknown expected status: " + c.expected);
  const x = c.input;
  assert.ok(Array.isArray(x.required_evidence));
  assert.ok(Array.isArray(x.present_evidence));
  assert.ok(Array.isArray(x.observations));
  assert.ok(Array.isArray(x.contradictions));
}
const byId = Object.fromEntries(suite.cases.map(c => [c.id, c]));
assert.equal(byId.V002.expected, "INDETERMINATE", "missing evidence must not be treated as false");
assert.equal(byId.V003.expected, "DISPUTED", "conflicting observations must remain visible");
assert.equal(byId.V005.expected, "NOT_CHECKED", "no requested checks must be marked not checked");
assert.match(byId.V006.reason, /byte-level consistency only/i, "integrity must not imply truth/authenticity");
console.log("PASS: synthetic evidence-status vectors schema");
console.log("PASS: missing evidence -> INDETERMINATE");
console.log("PASS: conflicting observations -> DISPUTED");
console.log("PASS: no checks -> NOT_CHECKED");
console.log("PASS: integrity limitations explicitly stated");
console.log("PASS: " + suite.cases.length + " synthetic vectors loaded");
