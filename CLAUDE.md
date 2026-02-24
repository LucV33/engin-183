# gmv.live

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
- `main` — production branch (auto-deploys to Vercel)
- `lovable` — Lovable sync branch (do not push manually)
- `feat/description` — feature branches (branch off main)
- `fix/description` — bug fix branches (branch off main)

## Workflow
1. Create a feature branch from `main`: `git checkout -b feat/my-feature main`
2. Make changes, commit often
3. Push and open a PR: `gh pr create`
4. Get review, then merge to `main`
5. Lovable changes go to the `lovable` branch, then get merged to `main` via PR

## Project Structure
- `src/` — application source code
- `src/components/` — React components (shadcn/ui based)
- `src/pages/` — page components
- `supabase/` — Supabase config and migrations
- `public/` — static assets
