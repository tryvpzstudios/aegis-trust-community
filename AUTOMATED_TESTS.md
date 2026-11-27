# AEGIS TRUST — Automated Repository Checks

Run locally (Node.js 20+):

```bash
node tests/verify_repo.mjs
```

The script checks:
- SHA-256 known-answer vectors (empty input and ASCII `abc`) using Node's crypto implementation.
- Mobile viewport metadata in the landing page, verifier, and self-test.
- Verifier privacy and limitation markers.
- Presence of expected known-answer values in the browser self-test.
- Landing-page links to the verifier and both challenges.

**Scope:** These checks validate repository structure and test vectors. They do not execute the browser UI, prove that deployed HTTPS works, validate C2PA, or certify security.
