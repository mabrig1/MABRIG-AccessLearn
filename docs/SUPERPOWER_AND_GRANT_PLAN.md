# ACCESSLEARN SUPERPOWER — product specification and funder evidence plan

**Date:** 19 October 2026 · **Status:** Design proposal; source prototype included, not yet cloud-deployed.

## Hard competitive truth

Converting PDFs or using text-to-speech is not novel: Bookshare Plus offers accessible remediation and ReadSpeaker TextAid offers extensive accessibility tools. Kolibri is mature offline infrastructure. We cannot win by merely adding a chatbot or claiming a novel PDF tool.

Our precise, testable wedge is: **teacher-controlled, source-verifiable Nigerian classroom materials with offline learner access and quantified pilot evidence**. Adoption, affordability and verified academic correctness are the differentiators to test with users, not guaranteed competitive advantages.

## Seven agent roles (versioned)

| Role | Output / permitted action | Accountability | Status |
|---|---|---|---|
| 1 Intake and Permission Guard | Confirm content rights, reject missing consent | Teacher confirmation, no student diagnoses | Built (basic) |
| 2 Curriculum Mapper | Objectives and outline, from uploaded lesson | Teacher checks objective alignment | Implemented for cloud mode |
| 3 Accessibility Remediator | Simplified reading and key terms | Source quotes and educator review | Implemented for cloud mode |
| 4 Assessment Designer | Four-option questions with quoted evidence | Deterministic evidence audit | Implemented for cloud mode |
| 5 Evidence / Risk Auditor | Detect absent exact source quotations, missing questions, invalid answers | Rules are necessary but not sufficient | Built (basic) |
| 6 Learner Learning Coach | Step-by-step hints grounded in approved pack | Never invent unavailable source content; safe minor handling | Future |
| 7 Impact Evaluation Analyst | Aggregated completion, consented pre/post measures and export | Institutional approvals, no fabricated learning gains | Demo metrics only |

Teacher approval is a mandatory gate between agents and learners, and is not an AI agent.

## Differentiated future superpowers (not yet in code)

- **Nigerian Language Learning Bridge:** Igbo, Hausa, Yoruba and Pidgin content reviewed by educators; confidence flags where translations are questionable. Local language support cannot be claimed without evaluation.
- **Source-Locked Tutor:** retrieval only from teacher-approved lesson packs, with sentence-level citations and abstention for unknowns.
- **Accessibility Repair Queue:** flags headings, images without alt text, tables without headers, scanned-PDF OCR confidence, caption availability and math transcription quality.
- **Low-Data Broadcast:** teacher sends compressed offline lesson bundles to students, optionally via LAN/local hotspot without creating an online chat surveillance system.
- **Disability-Led Co-Design:** real learners using screen readers, switch access, magnification and captions shape prioritisation. No diagnosis labels needed to use features.
- **Multi-Model Router:** configurable OpenRouter models per role; reserve more capable models for hard verification tasks, smaller affordable models for layout and quizzing. Log model id/cost per run server-side without personal source text in logs.

## Pilot success criteria (proposed, must be validated)

- 90%+ of testers can start an assigned lesson without facilitator intervention after orientation.
- 95%+ of prepared content pages pass automated accessibility checks **and** a defined manual sample audit; not a claim of formal WCAG conformance.
- Measure median teacher preparation time against current workflow; pre-register a target of 30% reduction.
- Offline open rate on three low-cost Android devices after airplane mode activation.
- Compare pre/post assessment results with participant consent; avoid attributing gains to the app without careful study design.
- Report drop-off and device/internet access barriers transparently; do not fabricate beneficiaries or outcomes.

## Funding story

Cohort 4 application is closed as of 19 Oct 2026. A future round has not been confirmed. The next application is a target, not guaranteed eligibility. Stage the pitch as `Problem → Pilot learners → Low-data teacher workflow → Accessibility evidence → Adoption → Verified outcomes → Sustainability`. Partnership letters and disability community feedback matter more than the number of agents.

## Indicative use of an up-to-$100,000 award (proposal only)

- $25,000 — disability-led accessibility research, user compensation, independent audits.
- $20,000 — Android/offline engineering, robust document remediation and QA.
- $15,000 — educator training and local-language content partnerships.
- $15,000 — school pilots, monitoring, ethics, educational evaluation.
- $10,000 — cloud operations, AI inference and cyber/privacy protections.
- $10,000 — distribution, institutional partnerships and support.
- $5,000 — contingency.

This is a grant application example, not a quote or confirmed grant disbursement.

## Quality gates

1. No automatic public publishing of AI content.
2. Evidence checks must flag source quotes not literally present; exact matches do not ensure correctness.
3. Minimise data, redact identifiers, and restrict pilot teacher LLM access.
4. Offline content must actually open in airplane mode during physical test.
5. Document how content rights are acquired before conversion or distribution.
6. Ensure accessible alternative for all AI services and clear human escalation.
7. Measure and publish uncertainties and failures as well as successes.
