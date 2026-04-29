# Draft: EcoTrack — Agent Brief & Project Scaffold Revision

## Requirements (confirmed)
- Two E2E flows this sprint: Public/Landing + Auth (login/register), and Admin flow end-to-end.
- Next.js 14 App Router + Tailwind CSS + TypeScript.
- Design system “The Living Archive — Verdant Core” with exact color tokens and typography.
- “No-Line” philosophy: avoid layout borders/dividers; use background shifts. Borders allowed only for focus rings + error states (+ dashed upload affordance).
- Create stub files for the listed components/pages, with strict stub conventions (named exports for components; pages/layouts must satisfy Next.js module export requirements).
- Hamid delivers blockers first: tailwind config, globals, types, lib/utils, then ui + layout primitives.

## Technical Decisions
- Normalize final color hex values as specified in the prompt’s “Design System: … Implement these EXACT values” section.
- Routes live under `app/` (no `pages/` directory; no `src/` directory).

## Research Findings
- Repo/workspace currently empty except `.sisyphus/` (no Next.js project yet).
- No package.json/scripts/lint/test/CI exists yet.

## Open Questions
- Package manager choice (npm vs pnpm vs yarn).
- Scope of scaffolding: only “sprint ini” stubs, or ALL stubs (including next-sprint) to unblock compilation.
- Tooling baseline to include now: ESLint/Prettier + optional CI workflow.

## Scope Boundaries
- INCLUDE: project initialization + config + stub components/pages per agreed scope; no real API/auth logic.
- EXCLUDE: real backend, persistence, real auth flows, map/leaflet implementation, full UI polishing.
