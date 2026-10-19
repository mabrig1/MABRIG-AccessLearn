# Cloudflare: Workers Builds and Pages deployment

**For the existing Cloudflare Workers Builds project shown in the screenshot:**
- Framework: Vite / React
- Root directory: `/` (source files must be in repository root)
- Install: `npm install` (or platform default)
- **Build command: `npm run build`** (do not leave `None`)
- **Deploy command: `npx wrangler deploy`**
- Wrangler configuration: `wrangler.jsonc`, deploys `dist` assets and the `src/worker.ts` API adapter.
- API smoke check after deployment: `GET /api/health` -> JSON with `status: ok`.
- Public site: inspect Workers deployment URL in Cloudflare; do not assume deployed.

For a Cloudflare Pages project: build `npm run build`, output `dist`, branch `main`, Pages Functions in `functions/api/agents.ts`.

Backend secrets/vars (Cloudflare Workers or Pages): `OPENROUTER_API_KEY` secret, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `AI_ALLOWED_EMAILS` (approved pilot teachers), optional `ALLOWED_ORIGIN`, `OPENROUTER_MODEL`. Frontend build-time env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (public anon key, not service-role key). The OpenRouter key must never be exposed as VITE_*.

No production connectivity or deployment is implied by these configuration files. Cloud AI remains disabled until secure backend configuration is provided. Only use non-sensitive, permissioned classroom materials in the prototype.

## Version 0.2 user features

- Approved learning packs are labelled `published` instead of incorrectly labelled sample material.
- Learners can ask questions in the new **Ask the lesson** tab; answers quote matching source passages without inventing facts or needing cloud access.
- Teachers can export and restore a validated local JSON backup. Backups may contain teaching material: keep them private.
- Offline service worker no longer substitutes HTML for missing JavaScript assets.
- Offline regression tests run as part of GitHub Actions.
