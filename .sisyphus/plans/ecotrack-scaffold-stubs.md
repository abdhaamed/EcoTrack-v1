# EcoTrack — Project Scaffolding (Stub Files + Task Assignment)

## TL;DR
> **Summary**: Scaffold a set of *contract-only stubs* for the new EcoTrack auth/dashboard/report flows, without overwriting existing code.
> **Deliverables**: 14 new stub files (plus 0-overwrite guarantee), and a recorded conflict note for existing `Spinner`/`Toast`.
> **Effort**: Short
> **Parallel**: YES — 3 waves
> **Critical Path**: Conflict audit → create directories → create stubs → verify build/lint

## Context

### Original Request
- Next.js 14 + TypeScript + Tailwind + Supabase.
- Create *16* scaffold files as “empty stubs with comment contracts only”, assigned to: Hamid, Alfin, Raja, Rifqi.
- Hard constraint: stubs contain only comment-listed imports, TS types/interfaces, and exported function shells returning `null`. No JSX UI, no hooks, no real logic.

### Interview Summary (repo-grounded)
- The repository already contains real implementations for:
  - `components/ui/Spinner.tsx`
  - `components/ui/Toast.tsx`
- The other 14 target paths were not found (safe to scaffold).
- Existing UI component APIs that future implementations should align with:
  - `components/ui/Button.tsx`: variants `primary`(default), `secondary`, `faint`, `outlined`, `ghost`
  - `components/ui/Input.tsx`, `components/ui/Textarea.tsx`: optional `error?: boolean`
  - `components/ui/Badge.tsx`: variants `success`, `warning`, `error`, `info`, `neutral`(default)
  - `components/ui/Card.tsx`: variants `bone`(default), `parchment`
- `types/index.ts` already defines `WasteReport` (camelCase fields) and status union `PENDING|APPROVED|REJECTED`.

### Metis Review (gaps addressed)
- **Conflict risk**: do not overwrite `Spinner`/`Toast`; treat them as “already satisfied” and record API deltas as notes.
- **Data-shape risk**: avoid baking in snake_case vs camelCase inconsistency. Use repo’s existing `WasteReport` as canonical domain type; keep any snake_case types limited to new `types/waste.ts` payload/result only.
- **Scope creep**: do not add deps (e.g., `@supabase/supabase-js`), do not refactor existing files.

### Decisions Needed (blocks execution)
- [DECISION NEEDED: Spinner/Toast handling]
  - Option A (Recommended): Keep existing `components/ui/Spinner.tsx` + `components/ui/Toast.tsx` unchanged, do NOT scaffold them, and update team expectations: Raja’s “Toast props = message/type/onClose + auto-dismiss” becomes **future refactor work**, not scaffolding.
  - Option B: Overwrite/replace existing Spinner/Toast with stubs to match the original contract (this breaks the “no edits to existing files” guardrail and will delete working UI components).
  - Decision: **Option A** (do not overwrite; record conflict note in `.sisyphus/drafts/`).

## Work Objectives

### Core Objective
Create contract-only stub files for team parallelization, while guaranteeing **zero modifications** to existing files.

### Deliverables
- Create these *new* files (14):
  1) `.env.local.example`
  2) `lib/supabase.ts`
  3) `lib/auth.ts`
  4) `types/waste.ts`
  5) `app/actions/waste.ts`
  6) `components/auth/LoginForm.tsx`
  7) `components/auth/RegisterForm.tsx`
  8) `app/auth/login/page.tsx`
  9) `app/auth/register/page.tsx`
  10) `components/pages/dashboard/DashboardHeader.tsx`
  11) `components/pages/dashboard/RecentReportsList.tsx`
  12) `app/dashboard/page.tsx`
  13) `components/pages/report/WasteReportForm.tsx`
  14) `app/reports/create/page.tsx`

- Confirm these existing files remain unchanged (2 conflicts):
  - `components/ui/Spinner.tsx` (already exists)
  - `components/ui/Toast.tsx` (already exists)

### Definition of Done (agent-verifiable)
- `git status --porcelain` shows **no modified tracked files** (no lines starting with ` M`/`M `), and only new files corresponding to the 14 stubs.
- `git diff -- components/ui/Spinner.tsx components/ui/Toast.tsx` is empty.
- `npm run lint` passes.
- `npm run build` passes.

### Must Have
- Every created file includes:
  - `// ASSIGNED TO: <Name>`
  - `// CONTRACT: <one-line>`
  - If TS/TSX: comment-only import list + TS types/interfaces + exported function(s) returning `null`.
  - No JSX elements (beyond `return null`).

### Must NOT Have
- No edits to any existing non-.sisyphus file.
- No real `import` statements in TS/TSX stubs (imports must be listed as comments only).
- No actual Supabase client creation, no hooks usage, no Tailwind className implementation.
- Do not add dependencies or modify `package.json`.

## Verification Strategy
> ZERO HUMAN INTERVENTION — all verification is agent-executed.
- Tests decision: **none** (repo has no test runner configured in `package.json`).
- Build/lint evidence:
  - `.sisyphus/evidence/scaffold-git-status.txt`
  - `.sisyphus/evidence/scaffold-git-diff-ui.txt`
  - `.sisyphus/evidence/scaffold-lint.txt`
  - `.sisyphus/evidence/scaffold-build.txt`

## Execution Strategy

### Parallel Execution Waves

Wave 1 (repo safety + folders)
- Directory/Conflict audit; create missing directories (non-destructive).

Wave 2 (create stubs — independent groups)
- Auth/config stubs (Hamid)
- Types + server action stubs (Alfin)
- Dashboard component/page stubs (Alfin)
- Report form/page stubs (Rifqi+Raja contract-only)

Wave 3 (verification)
- Lint + build + git diff checks.

### Dependency Matrix
- Wave 2 depends on Wave 1 (directories exist, conflicts known).
- Wave 3 depends on Wave 2 (files created).

### Agent Dispatch Summary
- Wave 1: 1 task (unspecified-low)
- Wave 2: 6 tasks (quick)
- Wave 3: 1 task (unspecified-low)

## TODOs

- [x] 1. Audit conflicts & create required directories

  **What to do**:
  - Confirm these two files already exist and must not be modified:
    - `components/ui/Spinner.tsx`
    - `components/ui/Toast.tsx`
  - Confirm the other 14 target paths do not exist.
  - Create missing directories (if absent):
    - `lib/`, `types/`
    - `app/actions/`, `app/auth/login/`, `app/auth/register/`, `app/dashboard/`, `app/reports/create/`
    - `components/auth/`, `components/pages/dashboard/`, `components/pages/report/`

  **Must NOT do**:
  - Do not edit any existing file contents.

  **Recommended Agent Profile**:
  - Category: `unspecified-low` — Reason: simple filesystem + git safety checks.
  - Skills: []

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: [2-6] | Blocked By: []

  **References**:
  - Existing conflicts: `components/ui/Spinner.tsx`, `components/ui/Toast.tsx`

  **Acceptance Criteria**:
  - [ ] `git status --porcelain` shows no modified files (`M`), only untracked dirs/files expected after creation.

  **QA Scenarios**:
  ```
  Scenario: Conflict files untouched
    Tool: Bash
    Steps:
      1) git diff -- components/ui/Spinner.tsx components/ui/Toast.tsx
    Expected: empty output
    Evidence: .sisyphus/evidence/task-1-ui-conflicts-diff.txt

  Scenario: All required directories exist
    Tool: Bash
    Steps:
      1) ls lib types app\actions app\auth\login app\auth\register app\dashboard app\reports\create components\auth components\pages\dashboard components\pages\report
    Expected: all paths listed without error
    Evidence: .sisyphus/evidence/task-1-dirs.txt
  ```

  **Commit**: NO

- [x] 2. Record Spinner/Toast conflict note (contracts vs reality)

  **What to do**:
  - Create `.sisyphus/drafts/ui-conflicts-spinner-toast.md` documenting:
    - Existing reality:
      - `Spinner` already implemented; supports `size?: 'sm'|'md'|'lg'`.
      - `Toast` already implemented; supports `variant?: 'default'|'error'` and renders `children` (no `message/type/onClose` props and no auto-dismiss).
    - Original requested contract (from the team assignment) that differs.
    - The chosen decision (Option A or B) and the implications for Raja’s task allocation.

  **Must NOT do**:
  - Do not edit `components/ui/Spinner.tsx` or `components/ui/Toast.tsx`.

  **Recommended Agent Profile**:
  - Category: `writing` — Reason: short, precise project note.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: [] | Blocked By: [1]

  **Acceptance Criteria**:
  - [ ] Draft note exists at `.sisyphus/drafts/ui-conflicts-spinner-toast.md`.

  **QA Scenarios**:
  ```
  Scenario: Note captures chosen decision
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs');const p='.sisyphus/drafts/ui-conflicts-spinner-toast.md';const s=fs.readFileSync(p,'utf8');process.exit((/Option A|Option B/.test(s)&&/Spinner/.test(s)&&/Toast/.test(s))?0:1)"
    Expected: exit code 0
    Evidence: .sisyphus/evidence/task-2-ui-conflict-note-check.txt

  Scenario: Conflict files untouched
    Tool: Bash
    Steps:
      1) git diff -- components/ui/Spinner.tsx components/ui/Toast.tsx
    Expected: empty output
    Evidence: .sisyphus/evidence/task-2-ui-conflicts-diff.txt
  ```

  **Commit**: NO

- [x] 3. Scaffold `.env.local.example`

  **What to do**:
  - Create `.env.local.example` with ONLY these keys and empty values:
    - `NEXT_PUBLIC_SUPABASE_URL=`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY=`
  - Include header comments:
    - `# ASSIGNED TO: Hamid`
    - `# CONTRACT: Template environment variables for Supabase (safe to commit)`

  **Must NOT do**:
  - Do not add real values.

  **Recommended Agent Profile**:
  - Category: `quick` — Reason: single new file.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: [] | Blocked By: [1]

  **References**:
  - Env keys: request spec (user message)

  **Acceptance Criteria**:
  - [ ] File exists and contains only the two keys with empty values.

  **QA Scenarios**:
  ```
  Scenario: No secrets committed
    Tool: Bash
    Steps:
      1) node -e "const s=require('fs').readFileSync('.env.local.example','utf8');const ok=s.includes('NEXT_PUBLIC_SUPABASE_URL=')&&s.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=')&&!/=.\S+/.test(s);process.exit(ok?0:1)"
    Expected: exit code 0
    Evidence: .sisyphus/evidence/task-3-env-example-check.txt

  Scenario: App still builds without env
    Tool: Bash
    Steps:
      1) npm run build
    Expected: build succeeds (stubs must not require env at build-time)
    Evidence: .sisyphus/evidence/task-2-build.txt
  ```

  **Commit**: YES | Message: `chore(env): add supabase env template` | Files: [`.env.local.example`]

- [x] 4. Scaffold Supabase init stub `lib/supabase.ts`

  **What to do**:
  - Create `lib/supabase.ts` as a stub-only file:
    - Top headers: `// ASSIGNED TO: Hamid` + `// CONTRACT: Initialize and export Supabase client instance (stub only)`
    - Comment-only imports list includes `createClient` from `@supabase/supabase-js`.
    - Export a named `supabase` placeholder that is explicitly non-functional (e.g., typed as `any`) and returns/holds `null`.
    - Include comment contract describing env var usage (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) but do not read them in code.

  **Must NOT do**:
  - No real imports.
  - No real `createClient(...)` call.

  **Recommended Agent Profile**:
  - Category: `quick`
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: [4] | Blocked By: [1]

  **References**:
  - Path alias is configured: `tsconfig.json` (`@/*` → `./*`).

  **Acceptance Criteria**:
  - [ ] `lib/supabase.ts` compiles (no missing import errors because imports are comments only).

  **QA Scenarios**:
  ```
  Scenario: File contains no real imports
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs');const s=fs.readFileSync('lib/supabase.ts','utf8');process.exit(/(^|\n)import\s/.test(s)?1:0)"
    Expected: exit code 0
    Evidence: .sisyphus/evidence/task-3-no-imports.txt

  Scenario: Next build succeeds
    Tool: Bash
    Steps:
      1) npm run build
    Expected: success
    Evidence: .sisyphus/evidence/task-3-build.txt
  ```

  **Commit**: YES | Message: `chore(supabase): add client stub contract` | Files: [`lib/supabase.ts`]

- [x] 5. Scaffold auth helpers stub `lib/auth.ts`

  **What to do**:
  - Create `lib/auth.ts` with:
    - `// ASSIGNED TO: Hamid`
    - `// CONTRACT: Async auth helpers wrapping Supabase auth (stub only)`
    - Comment-only import list referencing `supabase` from `lib/supabase`.
    - Export named async functions:
      - `getSession(): Promise<unknown | null>`
      - `getCurrentUser(): Promise<unknown | null>`
      - `signOut(): Promise<null>`
    - Bodies return `null` (or `Promise.resolve(null)`) only; behavior described in comments.

  **Must NOT do**:
  - No real supabase calls.

  **Recommended Agent Profile**:
  - Category: `quick`
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: [] | Blocked By: [3]

  **References**:
  - Auth contract: request spec.

  **Acceptance Criteria**:
  - [ ] File exports the 3 named async functions and contains no real imports.

  **QA Scenarios**:
  ```
  Scenario: Exports exist
    Tool: Bash
    Steps:
      1) node -e "const ts=require('fs').readFileSync('lib/auth.ts','utf8');process.exit((/export\s+async\s+function\s+getSession/.test(ts)&&/getCurrentUser/.test(ts)&&/signOut/.test(ts))?0:1)"
    Expected: exit code 0
    Evidence: .sisyphus/evidence/task-4-exports.txt

  Scenario: Lint passes
    Tool: Bash
    Steps:
      1) npm run lint
    Expected: success
    Evidence: .sisyphus/evidence/task-4-lint.txt
  ```

  **Commit**: YES | Message: `chore(auth): add auth helper stubs` | Files: [`lib/auth.ts`]

- [x] 6. Scaffold waste types + server action stubs (`types/waste.ts`, `app/actions/waste.ts`)

  **What to do**:
  - Create `types/waste.ts`:
    - Export `WasteType`, `ReportStatus`, `WasteReportPayload`, `WasteReportResult` exactly as specified in request.
    - Include note in comments: canonical UI report model remains `types/index.ts:WasteReport` (camelCase).
  - Create `app/actions/waste.ts`:
    - Put `'use server'` at top.
    - Comment-only import list referencing `supabase` and the types above.
    - Export `submitWasteReport(payload): Promise<WasteReportResult>` stub returning `{ success:false, error:'not implemented' }`.
    - Comment contract describes validation and Supabase insert (no real code).

  **Must NOT do**:
  - No real imports or Supabase calls.
  - Do not modify `types/index.ts`.

  **Recommended Agent Profile**:
  - Category: `quick`
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: [7] | Blocked By: [1,4]

  **References**:
  - Existing canonical model: `types/index.ts:WasteReport`

  **Acceptance Criteria**:
  - [ ] Both files exist; `submitWasteReport` is exported and returns the placeholder result.

  **QA Scenarios**:
  ```
  Scenario: Server action has directive
    Tool: Bash
    Steps:
      1) node -e "const s=require('fs').readFileSync('app/actions/waste.ts','utf8');process.exit(s.includes('\'use server\'')?0:1)"
    Expected: exit code 0
    Evidence: .sisyphus/evidence/task-5-use-server.txt

  Scenario: Build succeeds
    Tool: Bash
    Steps:
      1) npm run build
    Expected: success
    Evidence: .sisyphus/evidence/task-5-build.txt
  ```

  **Commit**: YES | Message: `chore(waste): add payload/result types and server action stub` | Files: [`types/waste.ts`, `app/actions/waste.ts`]

- [x] 7. Scaffold UI/page stubs for Auth, Dashboard, Reports (9 files)

  **What to do**:
  - Create these TSX stubs (all with comment-only imports, props interfaces, function shells returning `null`):
    - `components/auth/LoginForm.tsx` (**use client**)
    - `components/auth/RegisterForm.tsx` (**use client**)
    - `app/auth/login/page.tsx`
    - `app/auth/register/page.tsx`
    - `components/pages/dashboard/DashboardHeader.tsx`
    - `components/pages/dashboard/RecentReportsList.tsx`
    - `app/dashboard/page.tsx`
    - `components/pages/report/WasteReportForm.tsx` (**use client**)
    - `app/reports/create/page.tsx`
  - Ensure contracts reference **existing** UI APIs (by name/variant) only:
    - Button variants: primary/secondary/faint/outlined/ghost
    - Badge variants: success/warning/error/info/neutral
    - Input/Textarea optional `error?: boolean`
    - Card variants: bone/parchment
  - WasteReportForm contract should mention existing `Spinner` + existing `Toast` component (note: Toast currently uses `variant` and children; do not assume `message/onClose` props).
  - Put `// ASSIGNED TO:` per the team allocation in the request; for `WasteReportForm.tsx` include both names.

  **Must NOT do**:
  - No JSX markup. Only `return null`.
  - No hooks/state/router usage.
  - Do not touch `components/ui/Spinner.tsx` or `components/ui/Toast.tsx`.

  **Recommended Agent Profile**:
  - Category: `quick`
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: [] | Blocked By: [1,6]

  **References**:
  - Existing UI APIs: `components/ui/Button.tsx`, `Input.tsx`, `Textarea.tsx`, `Badge.tsx`, `Card.tsx`
  - Existing Toast/Spinner implementations: `components/ui/Toast.tsx`, `components/ui/Spinner.tsx`
  - Canonical report type: `types/index.ts:WasteReport`

  **Acceptance Criteria**:
  - [ ] All files exist, export functions, contain no real `import` statements, and any needed `'use client'` directive is present.

  **QA Scenarios**:
  ```
  Scenario: No real imports across new TS/TSX stubs
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs');const paths=[
        'lib/supabase.ts','lib/auth.ts','types/waste.ts','app/actions/waste.ts',
        'components/auth/LoginForm.tsx','components/auth/RegisterForm.tsx','app/auth/login/page.tsx','app/auth/register/page.tsx',
        'components/pages/dashboard/DashboardHeader.tsx','components/pages/dashboard/RecentReportsList.tsx','app/dashboard/page.tsx',
        'components/pages/report/WasteReportForm.tsx','app/reports/create/page.tsx'
      ];const bad=[];for(const p of paths){const s=fs.readFileSync(p,'utf8');if(/(^|\n)import\s/.test(s)) bad.push(p);}if(bad.length){console.error('Found real imports in:',bad);process.exit(1)}process.exit(0)"
    Expected: exit code 0
    Evidence: .sisyphus/evidence/task-6-no-imports.txt

  Scenario: Lint + build
    Tool: Bash
    Steps:
      1) npm run lint
      2) npm run build
    Expected: both succeed
    Evidence: .sisyphus/evidence/task-6-lint-build.txt
  ```

  **Commit**: YES | Message: `chore(scaffold): add auth/dashboard/report stubs` | Files: [all stubs created in this task]

- [x] 8. Final verification (no-overwrite + build integrity)

  **What to do**:
  - Capture evidence for:
    - `git status --porcelain`
    - `git diff -- components/ui/Spinner.tsx components/ui/Toast.tsx`
    - `npm run lint`
    - `npm run build`
  - Ensure only the 14 expected new files are added.

  **Must NOT do**:
  - No formatting or refactors.

  **Recommended Agent Profile**:
  - Category: `unspecified-low`
  - Skills: []

  **Parallelization**: Can Parallel: NO | Wave 3 | Blocks: [] | Blocked By: [3-7]

  **Acceptance Criteria**:
  - [ ] Evidence files written under `.sisyphus/evidence/` as listed in Verification Strategy.

  **QA Scenarios**:
  ```
  Scenario: Only intended files added
    Tool: Bash
    Steps:
      1) git status --porcelain
    Expected: only the 14 stubs appear as untracked (or staged if commits were made), no modifications to existing files.
    Evidence: .sisyphus/evidence/task-7-git-status.txt

  Scenario: Next build pipeline
    Tool: Bash
    Steps:
      1) npm run lint
      2) npm run build
    Expected: success
    Evidence: .sisyphus/evidence/task-7-lint-build.txt
  ```

  **Commit**: NO

## Final Verification Wave (MANDATORY — after ALL implementation tasks)
> This is for after the *implementation phase* (not scaffolding). For scaffolding-only, skip running these.
- [x] F1. Plan Compliance Audit — oracle
- [x] F2. Code Quality Review — unspecified-high
- [x] F3. Real Manual QA — unspecified-high (+ playwright if UI)
- [x] F4. Scope Fidelity Check — deep

## Commit Strategy
- Prefer 3 commits:
  1) `chore(env): add supabase env template`
  2) `chore(auth|supabase|waste): add stubs`
  3) `chore(scaffold): add page/component stubs`
- Do **not** commit changes to `Spinner`/`Toast` (must remain untouched).

## Success Criteria
- Repo builds and lints.
- Only new stub files created; no edits to existing runtime code.
- Stubs are clearly assigned and contract-documented for parallel work.
