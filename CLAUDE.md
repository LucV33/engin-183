# gmv.live

## Project Origin
- Project was created and started in **Lovable** (AI app builder)
- GitHub repo: `LucV33/engin-183` (locally cloned as `gmv-live` — same repo, renamed)
- Lovable has 2-way sync with GitHub — changes in Lovable push to the `lovable` branch, and merges to `main` sync back
- Lovable handles **hosting and deployment** (no separate hosting needed)
- **Landing page and UI design** work happens in Lovable
- **Backend logic, integrations, and complex features** are done via Claude Code

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui (styling & components)
- Supabase (backend/auth/database)
- React Router (routing)
- TanStack React Query (data fetching)
- Vitest (testing)

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run test` — run tests
- `npm run test:watch` — run tests in watch mode

## Branch Conventions
- `main` — production branch (auto-deploys via Lovable)
- `lovable` — Lovable 2-way sync branch (do not push manually)
- `feat/description` — feature branches (branch off main)
- `fix/description` — bug fix branches (branch off main)

## Workflow
1. **Lovable** (landing page, UI): edit in Lovable → auto-pushes to `lovable` branch → merge to `main` via PR
2. **Claude Code** (backend, features): create feature branch from `main` → make changes → PR → merge to `main`
3. Lovable 2-way sync means merges to `main` flow back into Lovable automatically

## Collaborators
- Collaborators work via GitHub (branches + PRs)
- Each collaborator needs their own `.env` with Supabase credentials (share the publishable anon key directly)
- No Vercel access needed — Lovable handles deployment

## Project Structure
- `src/` — application source code
- `src/components/` — React components (shadcn/ui based)
- `src/pages/` — page components
- `supabase/` — Supabase config and migrations
- `public/` — static assets

## Environment
- Copy `.env.example` to `.env` and fill in your Supabase credentials
- Never commit `.env` — it's in `.gitignore`

## Deployment
- **Lovable**: primary hosting and deployment — auto-deploys from `main` via 2-way sync
- Vercel was previously connected but causes access issues for collaborators (requires Pro for team access) — not needed since Lovable handles hosting

## Supabase
- Project is currently managed under Lovable's Supabase organization
- Free tier: 500MB database, 1GB file storage, 50k monthly active users
- **TODO before launch**: migrate to your own Supabase account for full control
  - Create account at https://supabase.com
  - Create new project, migrate schema + data
  - Update env vars in `.env` and Lovable project settings
- dont read env vars ever. 
