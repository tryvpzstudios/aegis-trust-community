import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
assert.equal(sha(Buffer.alloc(0)), "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
assert.equal(sha(Buffer.from("abc", "utf8")), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");

const verifier = await readFile("verifier.html", "utf8");
const selfTest = await readFile("verifier-self-test.html", "utf8");
const landing = await readFile("index.html", "utf8");
for (const [name, html] of [["verifier", verifier], ["self-test", selfTest], ["landing", landing]]) {
  assert.match(html, /<meta[^>]+viewport/i, name + " must include mobile viewport");
}
assert.match(verifier, /crypto\.subtle\.digest\(['"]SHA-256['"]/i);
assert.match(verifier, /uploaded:false/i);
assert.match(verifier, /limitations/i);
assert.match(selfTest, /e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855/i);
assert.match(selfTest, /ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad/i);
assert.match(landing, /verifier\.html/);
assert.match(landing, /CHALLENGE_001\.md/);
assert.match(landing, /CHALLENGE_002\.md/);
console.log("PASS: SHA-256 known-answer vectors");
console.log("PASS: required mobile viewport metadata");
console.log("PASS: verifier privacy/limitations markers");
console.log("PASS: self-test known-answer vectors");
console.log("PASS: landing-page links");
