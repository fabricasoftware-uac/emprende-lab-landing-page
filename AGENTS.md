# AGENTS.md

## Stack
- Next.js 16 (App Router) + React 19
- pnpm (lockfile + workspace config exist; use `pnpm`, not npm/yarn)
- Tailwind CSS v4 via `@tailwindcss/postcss` (no tailwind.config)
- shadcn/ui (`new-york` style, RSC enabled) with `cn()` from `@/lib/utils`
- Drizzle ORM on PostgreSQL (Neon Serverless via `@neondatabase/serverless`)
- Better Auth with drizzle adapter + admin plugin
- Resend for email
- AWS S3 (Cloudflare R2) for uploads, deployed on Vercel

## Commands
```bash
pnpm dev          # next dev
pnpm build        # next build
pnpm start        # next start
pnpm lint         # eslint . (flat config, no-explicit-any enforced)
pnpm format       # prettier --write .
```

Seeds and scripts (run with `tsx`):
```bash
tsx seed-admin.ts          # create admin user
tsx seed-mock-data.ts      # insert mock team/becados/empresas/projects
tsx cleanup-mock-data.ts   # remove mock data in production
```

## Environment
Copy `.env.example` to `.env`. Required vars:
- `DATABASE_URL` — PostgreSQL connection string (Neon)
- `BETTER_AUTH_SECRET` — auth signing key
- `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` — `http://localhost:3000` in dev
- `RESEND_API_KEY` + `EMAIL_FROM` — for password reset emails

## Architecture

### Path alias
`@/*` maps to project root `./*` (not `./src/*`). E.g. `import { db } from "@/db"`.

### Database (`db/`)
- `db/schema.ts` — Drizzle schema (user, session, account, verification, proyectos, esquemas, entradas). Column naming uses camelCase for JS, postgres columns defined as text strings.
- `db/index.ts` — exports `db` (drizzle instance connected via `@neondatabase/serverless`).
- `drizzle.config.ts` — expects `DATABASE_URL`, schema at `./db/schema.ts`, output dir `./drizzle/` (migrations not yet generated).
- No drizzle migrations directory exists yet. Run `npx drizzle-kit generate` to create them, `npx drizzle-kit migrate` to apply.

### Auth (`lib/auth.ts`, `lib/auth-client.ts`)
- Server: `lib/auth.ts` exports `auth` (Better Auth instance with drizzle adapter + email/password + admin plugin).
- Client: `lib/auth-client.ts` exports `authClient` (uses `NEXT_PUBLIC_APP_URL` for base URL, includes `adminClient` plugin).
- Auth routes handled by Better Auth's catch-all at `app/api/auth/[...all]/route.ts`.
- Custom auth pages: `app/auth/login/`, `app/auth/forgot-password/`, `app/auth/reset-password/`.

### Admin views
- `app/views/admin/` — admin dashboard (uses Better Auth admin plugin).
- `app/views/fabrica/` — content factory / CMS views.

### API routes
- `app/api/proyectos/`, `app/api/esquemas/`, `app/api/entradas/`, `app/api/upload/` — REST endpoints for the CMS.
- `app/api/auth/` — Better Auth handler.

### Landing page
- `app/page.tsx` — server component, ISR revalidate every 3600s. Queries `entradas` table by `coleccionSlug` to render team, empresas, becados, proyectos.
- Heavy sections below the fold are lazy-loaded with `next/dynamic`.

### Components
- `components/ui/` — shadcn primitives.
- `components/global/` — reusable/marketing components.
- `components/admin/`, `components/fabrica/` — admin/factory UI.
- Section components: `hero.tsx`, `servicios.tsx`, `academia.tsx`, `transferencia.tsx`, `spacelab-program.tsx`, `proyectos.tsx`, `empresas.tsx`, `becados.tsx`, `equipo.tsx`, `sostenibilidad.tsx`, `footer.tsx`, `navbar.tsx`, `floating-elements.tsx`.

## Gotchas
- **Shared types** are in `types/cms.ts`. Before adding new domain entities, check if a type already exists there.
- **`any` is banned** by eslint (`@typescript-eslint/no-explicit-any: error`). Use `unknown` or proper types.
- **No test runner configured**. There is no `vitest`, `jest`, or `playwright` setup.
- **No CI workflows** in `.github/workflows/`. Deployment is via Vercel auto-deploy on merge to `main` (per README's v0 integration).
- The project is linked to v0.app for AI-generated UI. The v0 runtime files (`__v0_*.js/tsx`) are gitignored.
