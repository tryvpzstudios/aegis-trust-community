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
