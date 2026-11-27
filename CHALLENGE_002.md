# AEGIS TRUST — Adversarial Trust Challenge #002

## Can an integrity check preserve meaning—not merely bytes?

**All content in this challenge is synthetic.** This is a design-review exercise, not a production security implementation or a claim that AEGIS TRUST has a secure verifier.

## Scenario

A fictional evidence packet contains a statement:

> The fictional water sample was **not** approved for release.

A fictional manifest records:
- A payload digest
- A collection timestamp
- A source identifier
- A verifier status

A downstream system displays a shortened, normalized version of the statement. Reviewers are asked to assess the packet, but the display transformation and the manifest's field-binding rules are not fully specified.

## The challenge

Design a review that can identify what an integrity check establishes—and what it does **not** establish.

1. Define the exact byte representation that is hashed. Is it the original file, a canonical representation, or a transformed display string?
2. Identify which manifest fields must be cryptographically bound together and why.
3. Explain how normalization, encoding, whitespace, punctuation, language, and display transformations could create ambiguity.
4. Distinguish payload integrity from source authenticity, timestamp reliability, semantic preservation, and truth of the claim.
5. Propose a minimal, deterministic verification record.
6. Define test cases that should produce **PASS**, **FAIL**, **INDETERMINATE**, or **NOT CHECKED**—and justify each.
7. Describe how the interface should communicate limitations without misleading a non-technical user.

## Submission format

Post a concise proposal in a GitHub Issue or submit a Markdown file containing:

- Threat model and assumptions
- Data representation / canonicalization rule
- Field-binding design
- At least 5 synthetic test cases
- Expected outcomes with reasons
- Known limitations

## Ground rules

- Use synthetic data only. Do not target real systems, accounts, people, organizations, or files.
- Do not submit malware, exploit code, credentials, or instructions for attacking a live service.
- A hash match proves only a relationship to the hashed bytes under the stated process; it does not independently prove authorship, truth, context, or safety.
- Missing evidence is not proof of fabrication.
- Separate facts, hypotheses, and unknowns.
- Challenge submissions are proposals and are not production-approved.

## Why this matters

A trustworthy system must explain **what was checked, what passed, what failed, what could not be checked, and what the check cannot prove**.

**No employment, payment, equity, prizes, or revenue-share is promised for this public challenge.**
