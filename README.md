# MABRIG AccessLearn

Offline-first inclusive education app for Nigerian schools and universities.

This repository is being bootstrapped from the validated AccessLearn source package. The complete app uses React, TypeScript, Vite, Cloudflare Pages Functions and Supabase.

**Deployment target:** Cloudflare Pages. Build command: `npm run build`; output directory: `dist`; Node.js: `22`.

> Never expose `OPENROUTER_API_KEY` in client-side (`VITE_`) variables. Use Cloudflare runtime secrets for provider credentials.
