# EcoTrack — Sprint 1 (Landing-only) Execution Plan

## TL;DR
> **Summary**: Initialize a fresh Next.js 14 App Router project (npm) and deliver a static landing-only public experience: shared public layout (Navbar/Footer) + 4 public pages (`/`, `/about`, `/contact`, `/services`) using the Living Archive tokens + no-line philosophy.
> **Deliverables**: Next/Tailwind/TS baseline, Living Archive Tailwind tokens + CSS vars + fonts, core `types/` + `lib/utils`, UI primitives (`components/ui/*`), shared layout, landing sections, 3 page-component folders, and 4 routes.
> **Effort**: Medium
> **Parallel**: YES — 3 waves + final verification
> **Critical Path**: Init project → tokens/fonts/globals → UI primitives → public layout → pages

## Context
### Original Request
- Sprint minggu ini fokus **Landing Page only**: `/`, `/about`, `/contact`, `/services`.
- Tidak ada admin/dashboard/backend/auth/blog/education/map di sprint ini.
- Design system: “The Living Archive — Verdant Core” (token Tailwind + Plus Jakarta Sans; no-line philosophy).

### Interview Summary (decisions locked)
- Repo saat ini kosong (belum ada Next.js).
- Scope: **landing-only** (exclude semua area next sprint).
- Package manager: **npm**.
- Font loading: **next/font**.
- Tooling baseline: **Next ESLint only**.
- `/contact` form: **UI saja** (tanpa backend).

### Metis Review (gaps addressed)
- Kunci export policy: default export hanya untuk `app/**/(page|layout).tsx` (Next.js requirement); named exports untuk semua komponen.
- Tambahkan quality gates agent-executable: install/lint/build + HTTP route checks.
- Batasi primitives ke yang dibutuhkan, cegah scope creep.

## Work Objectives
### Core Objective
Project Next.js 14 App Router yang bisa `npm run dev` + `npm run build` sukses, dengan 4 halaman publik statis sesuai desain token.

### Deliverables (Sprint 1)
- Project init (Next.js 14 + TS + Tailwind + ESLint).
- `tailwind.config.ts` dengan token warna Living Archive + semantic aliases.
- `styles/globals.css` (Tailwind directives + CSS custom properties + base body styling).
- Font setup via `next/font/google` (Plus Jakarta Sans + Merriweather) di `app/layout.tsx`.
- `types/index.ts`, `lib/utils.ts`.
- UI primitives: `components/ui/*` (Button/Input/Textarea/Badge/Card/Modal/Dropdown/Avatar/ProgressBar/Spinner/Toast/Tabs).
- Shared public layout: `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `app/(public)/layout.tsx`.
- Landing sections: `components/landing/*` + `app/(public)/page.tsx`.
- Page components + routes:
  - About: `components/pages/about/*` + `app/(public)/about/page.tsx`
  - Services: `components/pages/services/*` + `app/(public)/services/page.tsx`
  - Contact: `components/pages/contact/*` + `app/(public)/contact/page.tsx`

### Definition of Done (agent-verifiable)
- [ ] `npm install` exits 0.
- [ ] `npm run lint` exits 0.
- [ ] `npm run build` exits 0.
- [ ] `npm run dev` starts, then the following return `200` (PowerShell):
  - [ ] `GET /`
  - [ ] `GET /about`
  - [ ] `GET /services`
  - [ ] `GET /contact`
- [ ] HTML for each route contains at least one `data-component="..."` marker from composed sections/components (verifies composition wired).
- [ ] No hardcoded hex colors in `components/**` or `app/(public)/**` (Tailwind config is the only allowed hex source).
- [ ] No forbidden layout separators used: `border-gray-*`, `border-slate-*`, `divide-*` (exceptions allowed only for focus ring + explicit error/affordance borders in interactive UI components).

### Appendix A — Authoritative Interfaces (Task 3)
> Executor MUST copy-paste these exactly into `types/index.ts` (field names + unions).

```ts
export interface User {
  id: string; name: string; email: string;
  role: 'user' | 'admin' | 'petugas';
  photoUrl?: string; total_points: number; createdAt: string;
}

export interface WasteReport {
  id: string; userId: string; wasteType: string;
  estimatedWeight: number; photoUrl: string;
  locationAddress: string; latitude: number; longitude: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  pointsAwarded?: number; reviewedBy?: string;
  reviewNote?: string; createdAt: string;
}

export interface PointTransaction {
  id: string; userId: string; reportId?: string;
  transactionType: 'CREDIT' | 'DEBIT';
  points: number; description: string; createdAt: string;
}

export interface Reward {
  id: string; name: string; description: string;
  imageUrl: string; points_required: number;
  stock: number; is_active: boolean; createdAt: string;
}

export interface RewardRedemption {
  id: string; userId: string; rewardId: string;
  pointsSpent: number;
  status: 'PROCESSING' | 'SHIPPED' | 'COMPLETED';
  deliveryAddress: string; trackingNote?: string; createdAt: string;
}

export interface TrashSpotReport {
  id: string; userId: string; photoUrl: string;
  description: string; severityLevel: 'RINGAN' | 'SEDANG' | 'BERAT';
  latitude: number; longitude: number; locationAddress: string;
  status: 'DILAPORKAN' | 'DITANGANI' | 'SELESAI';
  handledBy?: string; handlerNote?: string; createdAt: string;
}

export interface EducationArticle {
  id: string; authorId: string; title: string; slug: string;
  content: string; category: 'ORGANIK' | 'ANORGANIK' | 'B3' | 'DAUR_ULANG';
  thumbnailUrl: string; isPublished: boolean;
  publishedAt?: string; createdAt: string;
}

export interface DisposalLocation {
  id: string; name: string; type: 'TPS' | 'BANK_SAMPAH';
  address: string; latitude: number; longitude: number;
  operationalHours: string; acceptedWasteTypes: string;
  contact: string; is_active: boolean; createdAt: string;
}

export interface Notification {
  id: string; userId: string;
  type: 'REPORT_VALIDATED' | 'POINTS_RECEIVED' | 'REDEEM_STATUS';
  message: string; isRead: boolean; createdAt: string;
}
```

### Must Have
- App Router only (`app/`, no `pages/`).
- Tailwind tokens: only use `bg-deep-forest`, `bg-bone`, etc (no hex in JSX).
- No-line philosophy: separation via background shifts, not borders/dividers.
- `cn()` for conditional class joining.

### Must NOT Have (guardrails)
- No blog/auth/admin/dashboard/user/map/education routes or components.
- No backend/API routes.
- No UI kit dependencies beyond listed packages.
- No default exports in `components/**` (default export allowed only in Next.js routing entrypoints under `app/**`).

## Verification Strategy
> ZERO HUMAN INTERVENTION — all verification is agent-executed.
- Test decision: none (not requested).
- Gates: lint + build + dev server smoke + HTTP checks + static grep checks.
- Evidence location: `.sisyphus/evidence/task-{N}-{slug}.*`.

### Tooling Note (important)
- All command steps labeled **Tool: Bash** are intended to be run via the workspace automation shell, which is **PowerShell** on Windows in this environment.
- Therefore QA steps use PowerShell commands (e.g., `Invoke-WebRequest`, `Select-String`, `Get-ChildItem`).

## Execution Strategy
### Parallel Execution Waves
Wave 1 (Foundation): init Next + configs + tokens/fonts/globals.

Wave 2 (Blockers — Hamid): types/utils + all `components/ui/*`.

Wave 3 (Parallel pages):
- Hamid: Navbar/Footer + public layout + landing sections + `/`.
- Raja: `/about` components + page.
- Rifqi: `/services` components + page.
- Alfin: `/contact` components + page.

### Dependency Matrix (high level)
- Wave 1 blocks Waves 2–3 (must have Tailwind tokens + fonts + folder structure).
- Wave 2 blocks page work that depends on UI primitives.

### Export Policy (authoritative)
- `components/**`, `lib/**`, `types/**`: **named exports only**.
- `app/**/page.tsx`, `app/**/layout.tsx`: **default export required** by Next.js.

## File Inventory (Sprint 1 only — authoritative)
### Root
- `package.json`
- `next.config.mjs` (use Next.js default)
- `tsconfig.json`
- `next-env.d.ts`
- `postcss.config.js`
- `tailwind.config.ts`

### Styles
- `styles/globals.css`

### App Router
- `app/layout.tsx` (root; imports `styles/globals.css`; applies `next/font`)
- `app/(public)/layout.tsx`
- `app/(public)/page.tsx`
- `app/(public)/about/page.tsx`
- `app/(public)/services/page.tsx`
- `app/(public)/contact/page.tsx`

### Types/Lib
- `types/index.ts`
- `lib/utils.ts`

### Components
- `components/ui/Button.tsx`
- `components/ui/Input.tsx`
- `components/ui/Textarea.tsx`
- `components/ui/Badge.tsx`
- `components/ui/Card.tsx`
- `components/ui/Modal.tsx`
- `components/ui/Dropdown.tsx`
- `components/ui/Avatar.tsx`
- `components/ui/ProgressBar.tsx`
- `components/ui/Spinner.tsx`
- `components/ui/Toast.tsx`
- `components/ui/Tabs.tsx`

- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`

- `components/landing/HeroSection.tsx`
- `components/landing/HowItWorksSection.tsx`
- `components/landing/StatsSection.tsx`
- `components/landing/FeaturesSection.tsx`
- `components/landing/CtaSection.tsx`

- `components/pages/about/AboutHero.tsx`
- `components/pages/about/MissionVisionSection.tsx`
- `components/pages/about/TeamSection.tsx`
- `components/pages/about/ImpactSection.tsx`

- `components/pages/services/ServicesHero.tsx`
- `components/pages/services/ServiceCard.tsx`

- `components/pages/contact/ContactHero.tsx`
- `components/pages/contact/ContactForm.tsx`
- `components/pages/contact/ContactInfoCard.tsx`

## TODOs

> NOTE: Repo kosong → Task 1 harus menggunakan `create-next-app` ke folder `.` (current directory), bukan membuat subfolder baru.

- [x] 1. Initialize Next.js 14 project (npm)

  **What to do**:
  - Because repo root is not empty (contains `.sisyphus/`), run `create-next-app` into a temp directory and then move files into repo root.
  - Command (PowerShell):
    - `npx create-next-app@14 ".tmp-next" --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --no-install`
  - Move generated files from `.tmp-next/` into repo root (keep `.sisyphus/` intact), then delete `.tmp-next/`:
    - `Get-ChildItem ".tmp-next" -Force | ForEach-Object { Move-Item $_.FullName . -Force }`
    - `Remove-Item ".tmp-next" -Recurse -Force`
  - Install deps in repo root:
    - `npm install`
  - Add only sprint-needed extra deps:
    - `npm install clsx tailwind-merge date-fns lucide-react`
  - Add one dev-only runner for executable QA snippets:
    - `npm install -D tsx`
  - Ensure baseline commands run:
    - `npm run lint`
    - `npm run build`

  **Must NOT do**:
  - Do not create extra routes beyond Next defaults.
  - Do not add next-sprint deps (leaflet/react-leaflet/recharts/axios/zod/tiptap/react-hook-form) in this sprint.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: greenfield scaffolding + config correctness
  - Skills: `[]`

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: 2–8 | Blocked By: none

  **References**:
  - External: https://nextjs.org/docs/app
  - External: https://nextjs.org/docs/app/building-your-application/configuring/eslint

  **Acceptance Criteria**:
  - [ ] `npm install` exits 0
  - [ ] `npm run lint` exits 0
  - [ ] `npm run build` exits 0

  **QA Scenarios**:
  ```
  Scenario: Dev server boots
    Tool: Bash
    Steps:
      1) npm install
      2) npm run dev
    Expected: No runtime error; server listens on :3000
    Evidence: .sisyphus/evidence/task-1-dev-server.txt

  Scenario: Lint/build baseline works
    Tool: Bash
    Steps:
      1) npm run lint
      2) npm run build
    Expected: Both exit code 0
    Evidence: .sisyphus/evidence/task-1-lint-build.txt
  ```

  **Commit**: YES | Message: `chore(setup): initialize Next.js 14 app router project` | Files: [project scaffold]

- [x] 2. Implement Living Archive tokens + fonts + globals

  **What to do**:
  - Replace Tailwind theme with tokens:
    - Colors:
      - `deep-forest #154232`, `veridian-leaf #3C6A09`, `sapling-green #BCF1AE`,
      - `parchment #F5F5F0`, `bone #EEEEE9`, `charcoal #1C1C1B`, `mist #A7A799`,
      - `feedback-success #3C6A09`, `feedback-error #CC3300`, `feedback-link #154232`
    - Add semantic aliases: `primary`, `secondary`, `background`
    - Add `borderRadius`: `card=16px`, `input=10px`, `btn=999px`
    - Ensure Tailwind `content` includes `./app/**/*.{ts,tsx}` + `./components/**/*.{ts,tsx}`
  - Create `styles/globals.css` and ensure `app/layout.tsx` imports it (replace any default `app/globals.css` import generated by create-next-app).
  - Setup fonts via `next/font/google` in `app/layout.tsx`:
    - Plus Jakarta Sans weights 400–800 → applied globally (body)
    - Merriweather weights 400,700 → exposed as `.font-article` utility or `font-serif` usage for later
  - In `globals.css`, add `:root` CSS vars for tokens + body background/text.

  **Must NOT do**:
  - Do not use `@import` Google Fonts in CSS (font loading is via next/font).
  - Do not introduce shadows for card elevation.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: token design system + Tailwind config
  - Skills: `[]`

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: 3–8 | Blocked By: 1

  **Acceptance Criteria**:
  - [ ] `npm run build` exits 0
  - [ ] `Invoke-WebRequest http://localhost:3000/ -UseBasicParsing | Select-Object -ExpandProperty StatusCode` returns `200` when dev server is running

  **QA Scenarios**:
  ```
  Scenario: Tokens are present in Tailwind config
    Tool: Bash
    Steps:
      1) Verify token hex strings exist in tailwind config:
         - Select-String -Path tailwind.config.ts -Pattern "#154232|#3C6A09|#BCF1AE|#F5F5F0|#EEEEE9|#1C1C1B|#A7A799|#CC3300"
      2) Verify no hex appears in public UI source:
         - Get-ChildItem -Recurse components, "app/(public)" -Include *.ts,*.tsx | Select-String -Pattern "#" -List
    Expected:
      - Step (1) finds matches
      - Step (2) prints nothing (no matches)
    Evidence: .sisyphus/evidence/task-2-tokens.txt

  Scenario: Root layout loads fonts via next/font
    Tool: Bash
    Steps:
      1) Select-String -Path app/layout.tsx -Pattern "next/font/google" -Quiet
      2) Select-String -Path "styles/globals.css" -Pattern "@import" -Quiet
    Expected:
      - Step (1) returns True
      - Step (2) returns False
    Evidence: .sisyphus/evidence/task-2-fonts.txt
  ```

  **Commit**: YES | Message: `chore(setup): add Living Archive tokens and font baseline` | Files: [tailwind.config.ts, styles/globals.css, app/layout.tsx]

- [x] 3. Add core types + utils (blocker)

  **What to do**:
  - Create `types/index.ts` with the exact interfaces from brief.
  - Create `lib/utils.ts`:
    - `cn()` using `clsx` + `tailwind-merge`
    - `formatDate(dateStr)` using `date-fns/format`
    - `formatPoints(points)` output like `"1.500 poin"` (ID locale grouping)

  **Must NOT do**:
  - No extra helper abstractions beyond what’s required.

  **Recommended Agent Profile**:
  - Category: `quick` — Reason: straightforward TS utilities + types
  - Skills: `[]`

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: 4–8 | Blocked By: 2

  **Acceptance Criteria**:
  - [ ] `npm run build` exits 0
  - [ ] `tsc --noEmit` (or `npm run build`) shows no TS errors from these files

  **QA Scenarios**:
  ```
  Scenario: formatPoints formatting
    Tool: Bash
    Steps:
      1) Run: npx tsx -e "import { formatPoints } from './lib/utils'; console.log(formatPoints(1500));"
    Expected: Prints exactly "1.500 poin"
    Evidence: .sisyphus/evidence/task-3-formatPoints.txt

  Scenario: cn() merges classes
    Tool: Bash
    Steps:
      1) Run: npx tsx -e "import { cn } from './lib/utils'; console.log(cn('p-2', true && 'p-4'));"
    Expected: Prints exactly "p-4"
    Evidence: .sisyphus/evidence/task-3-cn.txt
  ```

  **Commit**: YES | Message: `chore(core): add shared types and utils helpers` | Files: [types/index.ts, lib/utils.ts]

- [x] 4. Build UI primitives (`components/ui/*`) (blocker)

  **What to do**:
  - Create all listed UI primitives with:
    - Line 1: `// ASSIGNED TO: Hamid`
    - Props interface in same file
    - Placeholder markup with `data-component="ComponentName"`
    - Tailwind classes using tokens (no hex)
    - No layout borders except allowed exceptions (focus ring / error / upload dashed)
  - Ensure exports are **named**.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: consistent styling primitives
  - Skills: `[]`

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: 5–8 | Blocked By: 3

  **Acceptance Criteria**:
  - [ ] `npm run build` exits 0
  - [ ] Grep check: no `export default` under `components/ui/**`

  **QA Scenarios**:
  ```
  Scenario: Forbidden border classes are absent
    Tool: Bash
    Steps:
      1) Select-String -Path components/ui/*.tsx -Pattern "border-gray-|border-slate-|divide-" -AllMatches
    Expected: No output (0 matches)
    Evidence: .sisyphus/evidence/task-4-no-line-check.txt

  Scenario: All components include data-component
    Tool: Bash
    Steps:
      1) $files = Get-ChildItem components/ui -Filter *.tsx
      2) $missing = @(); foreach ($f in $files) { if (-not (Select-String -Path $f.FullName -Pattern 'data-component=' -Quiet)) { $missing += $f.Name } }
      3) if ($missing.Count -gt 0) { throw "Missing data-component in: $($missing -join ', ')" }
    Expected: Script completes without throwing
    Evidence: .sisyphus/evidence/task-4-data-component.txt
  ```

  **Commit**: YES | Message: `feat(ui): add Living Archive UI primitives` | Files: [components/ui/*]

- [x] 5. Shared public layout: Navbar + Footer + `(public)/layout.tsx`

  **What to do**:
  - Implement `components/layout/Navbar.tsx` + `Footer.tsx` as static for now.
  - Navbar links (hardcode, public only): Home `/`, About `/about`, Services `/services`, Contact `/contact`.
  - Decision (locked): **Hide auth buttons** this sprint (no auth routes, no dead links).
  - `app/(public)/layout.tsx` composes Navbar + `children` + Footer.

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `[]`

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: 6–8 | Blocked By: 4

  **Acceptance Criteria**:
  - [ ] All 4 routes render Navbar and Footer (verified via HTML contains `data-component="Navbar"` and `data-component="Footer"`)

  **QA Scenarios**:
  ```
  Scenario: Navbar/Footer present on /about
    Tool: Bash
    Steps:
      1) (Assuming dev server already running) Run:
         - $html = (Invoke-WebRequest http://localhost:3000/about -UseBasicParsing).Content
         - if ($html -notmatch 'data-component="Navbar"') { throw 'Navbar missing' }
         - if ($html -notmatch 'data-component="Footer"') { throw 'Footer missing' }
    Expected: Script completes without throwing
    Evidence: .sisyphus/evidence/task-5-layout-presence.txt

  Scenario: No dead auth routes referenced
    Tool: Bash
    Steps:
      1) Get-ChildItem -Recurse components/layout -Include *.ts,*.tsx | Select-String -Pattern "'/auth/|\"/auth/" -AllMatches
    Expected: No output (0 matches)
    Evidence: .sisyphus/evidence/task-5-no-auth-links.txt
  ```

  **Commit**: YES | Message: `feat(layout): add public Navbar/Footer layout` | Files: [components/layout/*, app/(public)/layout.tsx]

- [ ] 6. Landing page sections + route `/`

  **What to do**:
  - Create `components/landing/*` per brief styling notes.
  - Compose them in `app/(public)/page.tsx` (route `/`).
  - Keep static placeholders but with meaningful headings.

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `[]`

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: 9 | Blocked By: 5

  **Acceptance Criteria**:
  - [ ] GET `/` returns 200 and includes markers for all sections: Hero/HowItWorks/Stats/Features/Cta

  **QA Scenarios**:
  ```
  Scenario: Landing composition wired
    Tool: Bash
    Steps:
      1) $html = (Invoke-WebRequest http://localhost:3000/ -UseBasicParsing).Content
      2) foreach ($name in @('HeroSection','HowItWorksSection','StatsSection','FeaturesSection','CtaSection')) { if ($html -notmatch "data-component=\"$name\"") { throw "Missing $name" } }
    Expected: Script completes without throwing
    Evidence: .sisyphus/evidence/task-6-landing-compose.txt

  Scenario: No hardcoded hex in landing components
    Tool: Bash
    Steps:
      1) Get-ChildItem -Recurse components/landing -Include *.ts,*.tsx | Select-String -Pattern "#" -List
    Expected: No output (0 matches)
    Evidence: .sisyphus/evidence/task-6-no-hex.txt
  ```

  **Commit**: YES | Message: `feat(landing): add landing sections and home page` | Files: [components/landing/*, app/(public)/page.tsx]

- [ ] 7. About page components + route `/about` (Raja)

  **What to do**:
  - Implement `components/pages/about/*` (static content, optional `members` prop on TeamSection).
  - `app/(public)/about/page.tsx` composes: AboutHero, MissionVisionSection, TeamSection, ImpactSection, and reuse `CtaSection`.

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `[]`

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: 9 | Blocked By: 5

  **Acceptance Criteria**:
  - [ ] GET `/about` returns 200 and includes `data-component="AboutHero"` etc

  **QA Scenarios**:
  ```
  Scenario: About route renders expected sections
    Tool: Bash
    Steps:
      1) $html = (Invoke-WebRequest http://localhost:3000/about -UseBasicParsing).Content
      2) foreach ($name in @('AboutHero','MissionVisionSection','TeamSection','ImpactSection','CtaSection')) { if ($html -notmatch "data-component=\"$name\"") { throw "Missing $name" } }
    Expected: Script completes without throwing
    Evidence: .sisyphus/evidence/task-7-about-compose.txt

  Scenario: No forbidden divider classes
    Tool: Bash
    Steps:
      1) Get-ChildItem -Recurse components/pages/about -Include *.ts,*.tsx | Select-String -Pattern "divide-|border-gray-|border-slate-" -List
    Expected: No output (0 matches)
    Evidence: .sisyphus/evidence/task-7-about-no-line.txt
  ```

  **Commit**: YES | Message: `feat(about): add public about page components` | Files: [components/pages/about/*, app/(public)/about/page.tsx]

- [ ] 8. Services page components + route `/services` (Rifqi)

  **What to do**:
  - Implement `components/pages/services/ServicesHero.tsx` + `ServiceCard.tsx`.
  - `app/(public)/services/page.tsx` composes hero + grid of 6 services + reuse `CtaSection`.

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `[]`

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: 9 | Blocked By: 5

  **Acceptance Criteria**:
  - [ ] GET `/services` returns 200 and renders 6 ServiceCard markers

  **QA Scenarios**:
  ```
  Scenario: Services grid has 6 cards
    Tool: Bash
    Steps:
      1) $html = (Invoke-WebRequest http://localhost:3000/services -UseBasicParsing).Content
      2) $count = ([regex]::Matches($html, 'data-component="ServiceCard"')).Count
      3) if ($count -ne 6) { throw "Expected 6 ServiceCard, got $count" }
    Expected: Script completes without throwing
    Evidence: .sisyphus/evidence/task-8-services-grid.txt

  Scenario: Icons use token colors
    Tool: Bash
    Steps:
      1) Select-String -Path components/pages/services/ServiceCard.tsx -Pattern "bg-sapling-green|text-veridian-leaf|text-charcoal|bg-bone|rounded-2xl" -AllMatches
    Expected: Uses bg-sapling-green/text-veridian-leaf/text-charcoal (no hex)
    Evidence: .sisyphus/evidence/task-8-services-tokens.txt
  ```

  **Commit**: YES | Message: `feat(services): add public services page` | Files: [components/pages/services/*, app/(public)/services/page.tsx]

- [ ] 9. Contact page components + route `/contact` (Alfin)

  **What to do**:
  - Implement `ContactHero`, `ContactInfoCard` static.
  - Implement `ContactForm` as client component (`"use client"`) with minimal local state (UI only):
    - Use `Input`/`Textarea` primitives.
    - On submit: `preventDefault()`; do not call any API.
  - `app/(public)/contact/page.tsx` composes two-column layout: form left, info card right.

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `[]`

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocked By: 4

  **Acceptance Criteria**:
  - [ ] GET `/contact` returns 200 and includes ContactHero + ContactForm + ContactInfoCard markers
  - [ ] No network calls are made on submit (no axios usage in contact components)

  **QA Scenarios**:
  ```
  Scenario: Contact page renders and form is client-side
    Tool: Bash
    Steps:
      1) $html = (Invoke-WebRequest http://localhost:3000/contact -UseBasicParsing).Content
      2) foreach ($name in @('ContactHero','ContactForm','ContactInfoCard')) { if ($html -notmatch "data-component=\"$name\"") { throw "Missing $name" } }
      3) if (-not (Select-String -Path components/pages/contact/ContactForm.tsx -Pattern '"use client"' -Quiet)) { throw 'ContactForm must include "use client"' }
    Expected: Script completes without throwing
    Evidence: .sisyphus/evidence/task-9-contact-render.txt

  Scenario: No backend call wired
    Tool: Bash
    Steps:
      1) Get-ChildItem -Recurse components/pages/contact -Include *.ts,*.tsx | Select-String -Pattern "axios|fetch\(" -List
    Expected: No output (0 matches)
    Evidence: .sisyphus/evidence/task-9-contact-no-backend.txt
  ```

  **Commit**: YES | Message: `feat(contact): add public contact page UI-only form` | Files: [components/pages/contact/*, app/(public)/contact/page.tsx]

## Final Verification Wave (MANDATORY — after ALL implementation tasks)
- [ ] F1. Plan Compliance Audit — oracle
- [ ] F2. Code Quality Review — unspecified-high
- [ ] F3. Real Manual QA (agent-executed) — unspecified-high
- [ ] F4. Scope Fidelity Check — deep

### Final Verification Checklist (agent-executable)
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Dev server route checks (200) via PowerShell `Invoke-WebRequest`: `/`, `/about`, `/services`, `/contact`
- [ ] Static grep checks:
  - [ ] No `#` in `components/**` and `app/(public)/**`
  - [ ] No `border-gray-`, `border-slate-`, `divide-` in public components/pages (except allowed interactive exceptions)

### Final Verification Commands (copy/paste)
```powershell
# assuming: npm run dev already running on http://localhost:3000

$routes = @('/', '/about', '/services', '/contact')
foreach ($r in $routes) {
  $res = Invoke-WebRequest ("http://localhost:3000" + $r) -UseBasicParsing
  if ($res.StatusCode -ne 200) { throw "Expected 200 for $r, got $($res.StatusCode)" }
}

# no hardcoded hex in public source
Get-ChildItem -Recurse components, "app/(public)" -Include *.ts,*.tsx | Select-String -Pattern "#" -List

# no forbidden separator classes
Get-ChildItem -Recurse components, "app/(public)" -Include *.ts,*.tsx | Select-String -Pattern "border-gray-|border-slate-|divide-" -List
```

## Commit Strategy
- Use conventional commits per task.
- Keep commits atomic per task (setup, tokens/fonts, core utils, ui, layout, each page).

## Success Criteria
- The project boots and builds successfully.
- Public layout is consistent across 4 pages.
- Styling uses Living Archive tokens and no-line philosophy guardrails.
