# MABRIG AccessLearn — GitHub + Cloudflare Pages connection

## Verified project identity
- GitHub owner: `mabrig1` (authenticated account visible through GitHub connector).
- Proposed **new** repository: `MABRIG-AccessLearn`. **The repository has not yet been created.**
- Hosting: Cloudflare Pages GitHub integration (not Workers Builds or Pages Direct Upload).

## Create and upload the repository
1. Open https://github.com/new?name=MABRIG-AccessLearn and create a **private** blank repository owned by `mabrig1`. Do not add a README, license, or `.gitignore` in the GitHub wizard since they are included in these files.
2. From the prepared folder run `git init && git branch -M main && git add . && git commit -m "feat: bootstrap AccessLearn inclusive classroom MVP" && git remote add origin https://github.com/mabrig1/MABRIG-AccessLearn.git && git push -u origin main`. Authenticate using GitHub's normal authentication flow, never paste a token into chat. Alternatively, after repo creation this ChatGPT GitHub connector can upload files to the new repo.
3. Ensure GitHub Actions `AccessLearn quality gate` reports green before a production release.

## Connect Pages Git integration
1. Open https://dash.cloudflare.com/?to=/:account/workers-and-pages and select `Create > Pages > Connect to Git`.
2. Authorize the Cloudflare GitHub integration to access **only** `mabrig1/MABRIG-AccessLearn`, if possible.
3. Select repository, `main` branch and `React (Vite)` preset. Root directory: `/` (repository root).
4. Build command: `npm run build`; build output directory: `dist`; project name: `mabrig-accesslearn`. Node runtime: 22 (if Cloudflare needs an override, `NODE_VERSION=22`).
5. Test resulting `*.pages.dev` URL on mobile and desktop. Cloudflare automatically deploys `/functions/api/agents.ts` along with frontend.

## Configuration
Build environment values (not passwords):
- `VITE_SUPABASE_URL` = your dedicated project's API URL
- `VITE_SUPABASE_ANON_KEY` = your dedicated project's publishable/anon key

Runtime encrypted secrets (do not put them in `VITE_` vars, repository or chat):
- `OPENROUTER_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `AI_ALLOWED_EMAILS` (pilot-teacher email allowlist)
- `ALLOWED_ORIGIN` = exact deployed HTTPS origin, e.g. `https://mabrig-accesslearn.pages.dev` **only after confirmed deployed**

Optional role models: `OPENROUTER_MODEL`, `OPENROUTER_PLANNER_MODEL`, `OPENROUTER_ADAPTER_MODEL`, `OPENROUTER_ASSESSMENT_MODEL`.

## Production acceptance checklist
- [ ] Repo creation and push verified by fetching commit from GitHub
- [ ] GitHub Actions full build and tests passing
- [ ] Cloudflare integration and first production deployment succeeded
- [ ] URL serves actual AccessLearn app with 200 HTTP and mobile layout
- [ ] `/api/agents` unauthenticated call fails safely (401 or configuration 503)
- [ ] Secrets configured with no frontend exposure; CORS/origin and WAF rules tested
- [ ] Supabase migration reviewed and applied to a dedicated project
- [ ] Pilot teacher sign-in, consent, cloud lessons and review gate tested
- [ ] Real Android offline reconnect, accessible reading, and screen reader review completed

Do not claim production readiness until these are checked with evidence.
