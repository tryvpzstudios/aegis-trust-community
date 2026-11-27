# Synthetic Evidence Status Vocabulary

This repository uses these labels for test examples and proposals. They are not a production certification system.

- **PASS** — the defined check completed and its stated criterion passed. Scope must be explicit.
- **FAIL** — a defined check completed and its criterion failed. Do not generalize this to a claim being false unless the check actually establishes that.
- **INDETERMINATE** — required evidence is missing, insufficient, or cannot be assessed.
- **DISPUTED** — relevant observations conflict and the conflict is preserved for review.
- **NOT_CHECKED** — no check was requested or performed.

Rules:
1. Missing evidence is not proof of falsity.
2. Integrity match is not proof of authenticity, truth, context, semantic preservation, or safety.
3. Contradictions must remain visible; do not silently choose a preferred source.
4. Statuses describe checks and evidence states, not universal truth labels.

See [synthetic vectors](tests/synthetic-evidence-status-vectors.json) and [validator](tests/verify_evidence_vectors.mjs).
