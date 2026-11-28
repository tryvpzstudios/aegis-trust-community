# Public Contributor Tasks

**Status:** PROPOSED = not approved for work; OPEN = maintainer-approved; IN PROGRESS = accepted; REVIEW = submitted; DONE = verified and merged.

Confirm task status in GitHub Issues before starting.

## Starter tasks — open for proposals
### 1. Mobile-first accessibility review
Deliver: keyboard navigation checklist, screen-reader observations and mobile layout recommendations. Use only public pages.

### 2. Evidence terminology glossary
Deliver: concise glossary distinguishing evidence, claim, source, provenance, verification, confidence, unknown, disputed and limitation. Cite public sources; avoid overstated conclusions.

### 3. Synthetic test-case design
Deliver: synthetic examples for metadata consistency, missing evidence, contradictory sources and uncertainty. No real people, private evidence or personal data.

### 4. Documentation clarity review
Deliver: issues and proposed edits for onboarding, contribution workflow and safety language.

### 5. Localization proposal
Deliver: English-to-Malayalam terminology and plain-language UX suggestions. Do not present translations as definitive legal advice.

## Creator Protection research track — proposed
### 6. Creator content protection market & workflow map
Deliver: a public-source research map of creator pain points (reuploads, impersonation, fake sponsorships, scam collabs, evidence/takedown friction), existing platform tools and gaps, and a clearly sourced competitor comparison. Do not contact creators or claim market validation.

### 7. Platform-terms/API feasibility matrix
Deliver: source-linked table for public/official APIs, policy limits, rate limits, available reporting paths and lawful monitoring options for major platforms. Do not scrape private content, bypass access controls, or provide circumvention methods.

### 8. Synthetic creator incident benchmark
Deliver: synthetic cases covering exact repost, transformed clip, audio reuse, false match, impersonation report, fake sponsor offer and conflicting ownership claims. Include ground truth labels, limitations and false-positive/false-negative expectations.

### 9. Shareable verification UX
Deliver: mobile-first public prototype/mock-up for an evidence receipt, creator verification link and safe badge language. Clearly distinguish registered/integrity-checked from verified authorship or truth.

## Media & Cinema Protection research track — proposed
### 10. Film asset lifecycle map
Deliver: public research mapping studio/producer → distributor → cinema/exhibitor → OTT → promotion asset workflows and leak-risk evidence points. No confidential industry data.

### 11. Synthetic leak-trace benchmark
Deliver: synthetic video/audio/frame fingerprints and simulated transformations with known relationships, false matches and missing evidence. Build a reproducible evaluation plan; do not claim real-world piracy detection.

### 12. Rights-holder evidence workflow
Deliver: public-source study of rights-holder evidence needs, URL/timestamp capture, incident grouping, report structure and appeal/correction safeguards. No unauthorized monitoring.

## AI-resilient infrastructure track — proposed
### 13. Deterministic no-AI baseline
Deliver: test plan and small public demo showing intake, hashes, schemas, evidence graph, rule checks, report export and audit record still work with AI disabled.

### 14. Provider-independent AI adapter design
Deliver: public interface proposal for interchangeable providers, timeout/circuit-breaker, output schema validation, fallback and clearly marked degraded mode. Do not expose private implementation details.

## Open-source developer growth track — proposed
### 15. Beginner onboarding audit
Deliver: test the public repository onboarding flow as a new contributor and report friction, expected skills, task clarity, setup time and improvement suggestions.

### 16. Contributor recognition design
Deliver: transparent recognition proposal covering code, testing, docs, research, accessibility, translation, triage and community work. No implied employment, equity, prizes or revenue-sharing.

## Research proposals
- Open-source dependency/license review for candidate libraries (report only).
- Threat-model template for a hypothetical evidence-intake workflow.
- Accessibility and low-bandwidth design patterns.
- Interoperability survey of public provenance standards.
- Responsible AI evaluation checklist with limitations and false-positive/false-negative reporting.

## Claim a task
Open an issue titled **[TASK CLAIM] Task name**. Include your GitHub profile, relevant experience/sample, proposed deliverable, estimated time and risks. Wait for explicit maintainer acceptance before treating it as assigned.

## Not available for public tasks
Private core architecture/code, secrets, signing keys, private evidence/customer data, sensitive algorithms, patent-sensitive inventions, vulnerabilities, production access, deployment credentials and legal/financial decisions.

## Maintainer validation additions
- API deterministic fuzz/stress harness: `node tests/verify_evidence_api_fuzz.mjs` — 150 seeded malformed payloads/schema mutations plus bounded 300-node/900-edge graph. **Integrated into CI; verified passing.**
- Engine optimization regression/performance harness: `node tests/verify_engine_performance.mjs` — semantic equivalence and bounded 1,000-node graph. **Integrated into CI; verified passing.**
