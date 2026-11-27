# AEGIS TRUST — 10-Day Master Roadmap (ChatGPT + Gemini Parallel Execution)

**Deadline:** Hard 10-day execution window. Do not move or reinterpret it.
**Execution principle:** Parallelize independent tasks, then integrate, verify, and close gaps. This is a completion target—not a claim that every component will be production-certified.

## Roles
- **ChatGPT / execution lead:** repository inspection, implementation, integration, test creation/runs, GitHub commits, verification, prioritization, final release package.
- **Gemini / independent workstream:** research, external standards/market research, adversarial review, independent recommendations and evidence packs. Gemini must not duplicate tasks already assigned unless explicitly requested.
- **Founder:** only decisions requiring approval, legal/IP decisions, external outreach/publication, paid engagements, or access/credentials.

## Baseline — verified existing assets
- Synthetic-only Evidence Graph Engine with conservative status semantics and topology traversal.
- Local loopback synthetic-only API prototype: `/health`, `/v1/analyze`, `/v1/report`; bounded request size/count/field validation and security headers.
- JSON/HTML evidence report generator.
- Synthetic evidence schema and test vectors.
- Browser local SHA-256 experiment and self-test.
- CI: repository checks, API fuzz/stress, engine performance validation.
- Public challenge #001/#002, developer entry challenge, contributor tasks/invitation draft.
- Public landing page and early revenue offer hypotheses.
- **Limits:** no production deployment, auth, TLS, persistence, rate limiting, real evidence support, external customer, validated paid demand, or forensic certification.

## Work packages and acceptance gates

### WP-01 — Independent adversarial technical audit (Days 1–2; ChatGPT + Gemini)
- Audit graph validation, semantics, traversal, API boundary, report generation/HTML escaping, schema, tests, dependency/CI, browser verifier.
- Test malformed input, edge cases, denial-of-service bounds, false inferences, privacy/security, usability.
- Deliver: issue list ranked CRITICAL/HIGH/MEDIUM/LOW, reproductions, suggested fixes, unresolved risks.
- Gate: all critical/high issues fixed or explicitly blocked with rationale; regression tests for fixes.

### WP-02 — Standards and interoperability research (Days 1–3; Gemini)
- Research current relevant provenance/authenticity standards and open specifications (including C2PA and adjacent standards where relevant).
- Verify primary sources, current version/status, licensing, interoperability, limitations, adoption evidence.
- Deliver evidence pack: source URL, date accessed, exact relevant section, finding, uncertainty, integration options.
- Gate: ChatGPT independently reviews; no unsupported compliance claims.

### WP-03 — Evidence model/schema completeness (Days 2–4; ChatGPT)
- Review schema against workflow requirements: claim, source, provenance, timestamps, custody/handling, integrity method, context, limitations, assessment, privacy and relations.
- Distinguish required vs optional; avoid storing unnecessary personal data.
- Deliver versioned schema proposal, migration/backward-compatibility notes, valid/invalid vectors.
- Gate: tests, documentation, no production/legal certification claim.

### WP-04 — Synthetic challenge/dataset & benchmark (Days 2–5; parallel)
- Add diverse synthetic cases: missing sources, conflicting evidence, altered bytes, metadata mismatch, time/context ambiguity, chain breaks, unsupported inference, benign false positives/negatives, malformed relationships.
- Define reproducible benchmark methodology; metrics only if measurable and limitations explained.
- Gemini proposes cases/research; ChatGPT implements fixtures, validators, tests.
- Gate: every case has expected conservative result and forbidden inference; CI passes.

### WP-05 — API contract and integration readiness (Days 3–6; ChatGPT)
- Define request/response contracts, errors, versioning, content types, bounds, health, report format.
- Evaluate schema validation integration and API-to-report consistency.
- Threat-model auth, rate limits, TLS, persistence, logging, deployment; do not expose prototype publicly.
- Gate: API contract tests and explicit production-blocker list.

### WP-06 — Browser verifier / public demo UX (Days 3–6; ChatGPT)
- Mobile accessibility, keyboard, screen-reader, low-bandwidth, clear privacy explanation, known-answer test, error states.
- Add truthful limitation messaging and safe demo flow.
- Gemini performs independent UX/accessibility critique.
- Gate: documented manual tests and automated checks where feasible.

### WP-07 — Security, privacy, abuse and dependency review (Days 4–7; Gemini + ChatGPT)
- Threat model; data minimization; XSS/HTML escaping; input boundaries; resource limits; dependency licenses/supply-chain; abuse scenarios; secret scanning.
- Gemini reports independent findings; ChatGPT validates and fixes.
- Gate: findings disposition and regression tests; production deployment remains blocked until required controls exist.

### WP-08 — Community and contributor pipeline (Days 4–7; ChatGPT)
- Improve contributor onboarding, entry challenge, scoped tasks, issue templates, contribution rules, safe public boundaries.
- Prepare outreach copy and target channels; **do not send externally without founder approval**.
- Gate: newcomer can understand repository, select a task, and submit safely.

### WP-09 — Revenue-first validation (Days 5–8; Gemini research + ChatGPT synthesis)
- Investigate buyer segments, actual problem/pain, current alternatives, buying triggers, public procurement/enterprise friction, credible comparable offers.
- Research only from credible sources; distinguish evidence from hypothesis.
- Produce 1–2 tightly scoped pilot offers, deliverables, exclusions, validation interview questions (written/no calls), pricing hypotheses only with evidence, and a path to first paid validation.
- Gate: clearly label customer demand/revenue as unvalidated until actual evidence.

### WP-10 — Patent Watchlist / protected invention review (Days 1–8; separate restricted work)
- Identify potential invention concepts from project work, not public disclosure.
- For each: concept summary, potential technical contribution, novelty uncertainty, preliminary prior-art search plan, disclosure risk, possible claim territory.
- No public disclosure, filing conclusions, or legal advice. Founder decides whether to seek qualified patent counsel.
- Gate: watchlist delivered separately; public repo contains no sensitive invention detail.

### WP-11 — Deployment and release candidate (Days 7–9; ChatGPT)
- Evaluate safe hosting options for public landing/demo only; keep prototype service private/loopback until controls.
- Release checklist, CI checks, reproducibility, accessibility, privacy, dependency review, backup/recovery, documentation.
- Gate: distinguish demo release from production service. No production readiness claim without evidence.

### WP-12 — Final integration and independent verification (Day 10)
- Merge completed work; run full CI; inspect failures; test fresh clone; verify all links/docs; audit claims; issue list.
- Deliver final package: verified artifacts, tests/results, unresolved blockers, release status, revenue status, patent watchlist (restricted), next-stage plan.
- Gate: release/no-release decision based on evidence, not deadline pressure.

## Day-by-day parallel execution
| Day | ChatGPT execution | Gemini independent work |
|---|---|---|
| 1 | Baseline + code audit + roadmap gaps | Standards landscape + audit checklist |
| 2 | Fix critical/high issues + regression tests | Independent adversarial review |
| 3 | Schema/model updates + integration tests | Standards compatibility evidence pack |
| 4 | Synthetic fixtures/challenge suite | Threat model + UX/accessibility review |
| 5 | API contract/schema validation + report fixes | Buyer/problem/alternative research |
| 6 | Mobile demo UX + contributor onboarding | Dataset proposals + independent review |
| 7 | Security/privacy/dependency fixes | Security findings + patent watch research |
| 8 | Revenue offer and pilot validation package | Market evidence + buyer hypotheses |
| 9 | Release candidate + deployment/CI audit | Independent release review |
| 10 | Final integration, full tests, decision/report | Final audit findings and evidence pack |

## Definition of done
- [ ] Critical/high findings fixed or explicitly blocked with evidence and mitigation.
- [ ] Tests run from clean checkout and CI verified.
- [ ] All new artifacts linked from README or task board.
- [ ] Demo works on mobile and states limitations.
- [ ] Synthetic data only in public repository.
- [ ] Standards claims sourced and scoped.
- [ ] API contract and production blockers documented.
- [ ] Contributor workflow is clear and safe.
- [ ] Revenue hypotheses are not presented as validated demand.
- [ ] Patent-sensitive concepts kept out of public disclosure.
- [ ] Final status uses COMPLETED / VERIFIED / IN PROGRESS / BLOCKED.
