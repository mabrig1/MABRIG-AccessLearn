# MABRIG AccessLearn — inclusive classroom agent prototype

**Status: source-code prototype; offline core smoke-tested, frontend dependency installation/build and cloud deployment NOT verified.** Mobile-responsive offline-capable Vite/React PWA, designed for a low-cost Cloudflare Pages deployment. No fake grant claims, fake analytics or fabricated accessibility certification.

## Working prototype features

- Accessible lesson studio: paste text, or import text-based PDF, DOCX, TXT, MD (scanned PDF OCR is not included).
- Local offline preparation: readable sections, source-quotation practice questions, deterministic evidence checks.
- Optional cloud multi-agent system: role-separated planner → accessibility adapter → assessment builder → deterministic evidence audit → human review, via Cloudflare Pages Function, OpenRouter and verified Supabase email authentication.
- Approval gate and browser-local lesson library; sample data are explicitly marked unverified.
- Learner experience: contrast, enlarged fonts, optional focus mode, device text-to-speech, practice questions, TXT download and local completion state.
- PWA caching and localStorage offline. Offline delivery must be retested on a real Android device after deployment.
- Local-only demonstration metrics, explicitly NOT pilot evidence.

## Run locally

```sh
npm install
node --experimental-strip-types tests/smoke.mjs
npm run check
npm run dev
```

Open the URL printed by Vite. Optional environment settings: copy `.env.example` to `.env.local` and insert your Supabase URL and publishable/anon key. This public key is safe to expose **only when RLS is properly configured**; never expose Supabase `service_role`.

No npm install/build verification was possible in the authoring environment because package installation did not complete. Run the commands above, resolve any TypeScript or dependency errors and check browser behaviour before publishing.

## Cloudflare Pages deployment

1. Create a new GitHub repository for this project and push its files (no credentials in Git).
2. Connect it to **Cloudflare Pages** (React/Vite, build command `npm run build`, output `dist`). Cloudflare Pages Functions automatically deploys `/functions/api/agents.ts` with the Pages project. This is the documented Cloudflare Pages full-stack Vite architecture, not an incompatible Next.js SSR-on-Pages path.
3. Configure build variables `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
4. Configure **encrypted runtime secrets** `OPENROUTER_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `AI_ALLOWED_EMAILS` (comma-separated authorised pilot teacher emails), `ALLOWED_ORIGIN` (deployed HTTPS origin). Optional: `OPENROUTER_MODEL` or role-specific `OPENROUTER_PLANNER_MODEL`, `OPENROUTER_ADAPTER_MODEL`, `OPENROUTER_ASSESSMENT_MODEL`. Ensure CORS and CSP match your chosen Supabase domain.
5. Run the database migration in a **dedicated** Supabase project only after review. This migration is provisioned for later authenticated storage; the UI currently stores lessons locally. Do not claim live multi-device sync.
6. Set Cloudflare WAF/rate-limit rules on `/api/agents` before admitting more pilot teachers. A user identity check alone does not prevent an authorised account from making costly repeated requests.
7. Confirm the model configured in your OpenRouter account is actually available and affordable. Three sequential LLM calls generate provider costs; failures are shown and the offline mode remains available.
8. Manually test on a low-end Android handset and with screen readers, keyboard-only navigation, offline reload, corrupt PDFs and malformed generated output.

## Safeguards

Cloud agent endpoint denies requests unless all required service secrets are configured, Supabase verifies the bearer token, an email allowlist accepts the identity, and the user affirms they are authorised to transmit the source. This **does not** replace school procurement, a data processing agreement or child-safety approval. Avoid collecting student health/disability diagnoses.

**Teacher approval is required** because even source-backed AI responses can be misleading. The deterministic QA verifies literal quotation presence and answer shape, not educational correctness. Additional output validation and human accessibility testing are needed before real institutional use.

## Next steps to a fundable pilot

Secure accessible content rights, interview disability inclusion coordinators, run consented tests with five learners using assistive tech, then a 2-school pilot and evaluation. Real baseline/follow-up results, not this demo dashboard, should support grant submissions. Research notes: `docs/BENCHMARK.md`.
