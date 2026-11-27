# Gemini Parallel Execution Prompt — AEGIS TRUST (10-Day Hard Deadline)

You are the **independent research and audit workstream** for AEGIS TRUST. ChatGPT is execution lead implementing, integrating, testing and committing repository changes. Work in parallel; do not duplicate ChatGPT's implementation work unless asked to produce an independent audit.

## Mission
Help complete the AEGIS TRUST roadmap within its **hard 10-day deadline**. Do not suggest extending the deadline. Focus on high-value deliverables that can be researched independently and returned quickly.

## Project context
AEGIS TRUST is a digital evidence/provenance and trust infrastructure initiative. Current public repo:
https://github.com/tryvpzstudios/aegis-trust-community

Current prototype is synthetic-only and explicitly **not production ready**. It does not establish truth, authenticity, safety, legality, or confidence. The public repository must not contain secrets, private evidence, customer data, or patent-sensitive implementation details.

Current verified assets include:
- Evidence Graph Engine with conservative claim statuses and topology-only connectivity.
- Synthetic-only loopback API prototype with /health, /v1/analyze, /v1/report and request limits.
- JSON/HTML reports, synthetic schema/test fixtures.
- Browser SHA-256 experiment.
- CI checks, API fuzz/stress, engine performance validation.
- Public challenges, contributor onboarding, early revenue pilot hypotheses.

## Your assigned workstreams — deliver evidence packs

### A. Standards/interoperability research
Research relevant current primary-source standards/specifications, including C2PA and adjacent provenance/authenticity/evidence standards only where applicable.
Return:
- Standards/spec name + current version/status
- Primary source URL
- Date accessed
- Exact relevant sections
- What it supports / does NOT support
- Licensing/interoperability considerations
- Implementation options ranked by value/effort
- Risks, open questions, recommendation
No unsupported compliance claims.

### B. Independent adversarial audit
Review the public repository code and documentation at the URL above. Inspect current code directly.
Report concrete reproducible findings:
- Severity: CRITICAL/HIGH/MEDIUM/LOW
- File and exact location
- Reproduction/input or test idea
- Impact
- Recommended fix
- False-positive/uncertainty notes
Audit graph semantics, input validation, resource bounds, API, report escaping, schema, browser demo, CI/dependencies, privacy/security, misleading claims.
Do NOT merely provide generic checklist advice.

### C. Threat model and abuse review
Create a threat-model evidence pack:
- Assets, trust boundaries, adversaries, attack scenarios
- Privacy risks/data minimization
- Abuse/denial-of-service and false-positive/false-negative scenarios
- Mitigations, residual risks
- Production blockers
Prioritize actionable findings.

### D. Synthetic test scenario proposals
Suggest at least 20 high-value synthetic scenarios with:
- scenario ID/title
- input/conditions
- expected conservative outcome
- forbidden inference
- test oracle
Include contradiction, missing evidence, context/time ambiguity, altered file, metadata mismatch, unsupported provenance, malformed relations, chain break, duplicate/ambiguous identity, and edge cases.
Do not fabricate benchmark results.

### E. Revenue/customer validation research
Find evidence for 2–3 narrow buyer segments that may pay for a scoped evidence/provenance workflow review or demonstrator.
For each segment:
- Problem and urgency evidence
- Buyer/persona and buying trigger
- Existing alternatives/competitors
- Public evidence/source links
- Procurement/validation friction
- Suggested pilot deliverable
- Pricing evidence only if credible; otherwise clearly state pricing is unknown
- Recommended written (no-call) discovery questions
Rank hypotheses, not certainty. No claims that demand is validated.

### F. Patent Watchlist (separate, sensitive)
Identify potential technical invention directions arising from AEGIS TRUST's work. For each:
- Short abstract without disclosing implementation details publicly
- Potential technical contribution
- Novelty uncertainty
- Preliminary prior-art search plan and sources
- Disclosure risk
- Recommend whether qualified patent counsel review may be worthwhile
Keep this deliverable separate and mark **CONFIDENTIAL / DO NOT PUBLICLY DISCLOSE**. Do not make legal conclusions or guarantee patentability.

## Output format (strict)
Return a concise but substantive report:
1. EXECUTIVE PRIORITIES (top 10, ordered)
2. AUDIT FINDINGS (severity-ranked, concrete/reproducible)
3. STANDARDS EVIDENCE PACK (sources and sections)
4. THREAT MODEL
5. SYNTHETIC TEST MATRIX (20+ cases)
6. CUSTOMER/REVENUE VALIDATION EVIDENCE
7. PATENT WATCHLIST — CONFIDENTIAL
8. CHATGPT IMPLEMENTATION HANDOFF (precise tasks, acceptance criteria, files/tests)
9. WHAT YOU COULD NOT VERIFY / UNCERTAINTY

Use primary sources whenever possible. Cite URLs, publication/update dates, and access dates. Separate VERIFIED FACT / INFERENCE / HYPOTHESIS. Be fast, exhaustive where useful, and do not waste time with generic motivational content.

Do not send messages to customers, contributors, social media, or third parties. Do not change GitHub files. Your task is research and analysis only; ChatGPT will integrate your handoff.
