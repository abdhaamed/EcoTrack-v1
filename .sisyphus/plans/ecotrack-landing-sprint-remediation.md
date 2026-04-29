# EcoTrack — ecotrack-landing-sprint Remediation (Plan Compliance)

## TL;DR
> **Summary**: Bring the current repo state into strict compliance with `.sisyphus/plans/ecotrack-landing-sprint.md` by resolving routing conflicts, normalizing config/file inventory, adding the missing `/contact` route + components, and ending with automated lint/build/dev-route + static guardrail checks and a clean git state.
> **Deliverables**: `/contact` page + components; canonical `styles/globals.css`; remove conflicting `app/page.tsx`; align PostCSS config filename; ensure all Sprint-1 inventory files are tracked; pass all plan gates.
> **Effort**: Short
> **Parallel**: YES — 2 waves + final verification
> **Critical Path**: Route conflict fix → `/contact` implementation → verification gates → git clean

## Context
### Original Request
- “rapihkan agar sesuai dengan plan ecotrack-landing-sprint”

### Interview Summary
- No additional preferences provided; proceed with strict plan compliance defaults.

### Defaults Applied (locked for this remediation)
- **Strict compliance** to `ecotrack-landing-sprint.md` “File Inventory (authoritative)” and guardrails.
- **Root route** must be served by `app/(public)/page.tsx`; therefore **remove** the template `app/page.tsx`.
- **Contact scope**: UI-only form (no backend/API), per Sprint-1 plan.
- **Canonical globals CSS**: `styles/globals.css` (Tailwind directives + CSS vars + base styling). `app/globals.css` stays deleted.
- **PostCSS config filename**: normalize to `postcss.config.js` as listed in Sprint-1 inventory (remove/replace `postcss.config.mjs`).
  - Note: keep PostCSS plugins to `tailwindcss` only (do **not** add `autoprefixer` dependency in this sprint unless explicitly requested).

### Metis Review (gaps addressed)
- Make explicit decisions on: root route location, contact scope, canonical global CSS, and template removal policy.
- Add deterministic acceptance criteria for: routing (no conflict), build/lint, HTTP 200 checks, and git/inventory compliance.

## Work Objectives
### Core Objective
Repo is strictly compliant with Sprint-1 landing plan: 4 public routes (`/`, `/about`, `/services`, `/contact`) implemented under `app/(public)/**`, token-based styling (no hex in components), no-line guardrails, and agent-verifiable gates passing.

### Deliverables
- Missing Contact page implemented:
  - `components/pages/contact/ContactHero.tsx`
  - `components/pages/contact/ContactForm.tsx` (client component, UI-only)
  - `components/pages/contact/ContactInfoCard.tsx`
  - `app/(public)/contact/page.tsx`
- Resolve routing conflict: remove `app/page.tsx` so `/` is served by `app/(public)/page.tsx`.
- Align config inventory:
  - Ensure `styles/globals.css` is tracked and correct.
  - Ensure `postcss.config.js` exists (and is used); remove/replace `postcss.config.mjs`.
  - Ensure Tailwind `content` aligns with plan (at least `./app/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}`; no dependency on `pages/`).
- Ensure all Sprint-1 inventory files are tracked in git; end with clean working tree.

### Definition of Done (agent-verifiable)
- [ ] `npm install` exits 0.
- [ ] `npm run lint` exits 0.
- [ ] `npm run build` exits 0.
- [ ] `npm run dev` starts; then each returns `200` (PowerShell): `/`, `/about`, `/services`, `/contact`.
- [ ] Each route HTML includes at least one `data-component="..."` marker from composed sections/components.
- [ ] No hardcoded hex colors in `components/**` or `app/(public)/**` (Tailwind config is the only allowed hex source).
- [ ] No forbidden separator utilities in public UI: `border-gray-*`, `border-slate-*`, `divide-*` (exceptions only for focus rings + explicit error/affordance borders inside interactive UI primitives).
- [ ] **No route conflict**: `app/page.tsx` does not exist.
- [ ] Git working tree clean: `git status --porcelain` prints nothing.
- [ ] Git tracked files include every path listed in Sprint-1 “File Inventory (authoritative)”.

### Must NOT Have (guardrails)
- No backend/API routes (including no `/api/contact`).
- No new routes outside Sprint-1 public scope.
- No default exports under `components/**`, `lib/**`, `types/**`.
- No new deps beyond what Sprint-1 plan allows.

## Verification Strategy
> ZERO HUMAN INTERVENTION — all verification is agent-executed.
- Gates: install → lint → build → dev server route checks → static grep guardrails → git/inventory checks.
- Evidence location: `.sisyphus/evidence/task-{N}-{slug}.*`.
- Evidence bootstrap (required before any evidence writes): ensure `.sisyphus/evidence/` exists.

## Execution Strategy
### Parallel Execution Waves
Wave 1 (Foundation compliance): routing/config/inventory normalization.

Wave 2 (Feature gap): implement missing Contact route + components.

Wave 3 (Final verification): run all gates + inventory checks; ensure git clean.

### Dependency Matrix (full)
- Task 1 blocks Task 2 (route conflict must be removed before validating `/` composition).
- Task 1 blocks Task 3 (inventory/config normalization required before final verification).
- Task 2 blocks Task 3 (contact route required for route checks).

## TODOs

- [ ] 1. Normalize routing + configs to Sprint-1 inventory

  **What to do**:
  - Remove the template root route file `app/page.tsx` so `/` is served by `app/(public)/page.tsx`.
  - Ensure global CSS is canonical and tracked:
    - Keep `styles/globals.css` as the only global stylesheet.
    - Ensure `app/layout.tsx` imports `../styles/globals.css` (already done) and that the file exists and is tracked.
    - Keep `app/globals.css` deleted.
  - Align PostCSS config filename to the plan:
    - Convert to `postcss.config.js` using Tailwind only (match current deps).
    - Remove `postcss.config.mjs` so there is a single PostCSS config source.
  - Align `tailwind.config.ts` with plan:
    - Ensure `content` includes `./app/**/*.{ts,tsx}` + `./components/**/*.{ts,tsx}`.
    - Remove `./pages/**/*` from `content` (plan is App Router only; `pages/` should not be referenced).
  - Stage/track Sprint-1 deliverable files that already exist but are untracked (app/(public), components, lib, styles, types).

  **Commands (PowerShell, non-interactive)**:
  - Remove route conflict:
    - `if (Test-Path 'app/page.tsx') { Remove-Item -Force 'app/page.tsx' }`
  - Normalize PostCSS config:
    - Create `postcss.config.js` with:
      - `module.exports = { plugins: { tailwindcss: {} } }`
    - `if (Test-Path 'postcss.config.mjs') { Remove-Item -Force 'postcss.config.mjs' }`
  - Stage Sprint-1 inventory files:
    - `git add 'app/(public)' components lib styles types app/layout.tsx tailwind.config.ts postcss.config.js`

  **Must NOT do**:
  - Do not introduce redirects/rewrites as a workaround for conflicting routes; remove `app/page.tsx` instead.
  - Do not add additional route groups or routes beyond Sprint-1.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: Next.js routing + config correctness with inventory normalization
  - Skills: `[]`

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: 2–3 | Blocked By: none

  **References**:
  - Plan: `.sisyphus/plans/ecotrack-landing-sprint.md`:
    - File Inventory (authoritative)
    - Task 2 (tokens/fonts/globals)
  - Current repo signals:
    - `app/layout.tsx` imports `../styles/globals.css`
    - `app/page.tsx` exists and defines `/` (must be removed)
    - `postcss.config.mjs` exists (must normalize to `.js`)

  **Acceptance Criteria**:
  - [ ] `Test-Path app/page.tsx` returns `False`.
  - [ ] `Test-Path styles/globals.css` returns `True`.
  - [ ] `Test-Path postcss.config.js` returns `True`.
  - [ ] `Test-Path postcss.config.mjs` returns `False`.
  - [ ] `Select-String -Path tailwind.config.ts -Pattern "\\./pages/" -Quiet` returns `False`.
  - [ ] `git status --porcelain` does NOT show untracked Sprint-1 inventory files after staging.

  **QA Scenarios**:
  ```
  Scenario: No root-route conflict
    Tool: Bash (PowerShell)
    Steps:
      1) Test-Path app/page.tsx
    Expected: Prints False
    Evidence: .sisyphus/evidence/task-1-no-root-route-conflict.txt

  Scenario: Tailwind content does not reference pages/
    Tool: Bash (PowerShell)
    Steps:
      1) Select-String -Path tailwind.config.ts -Pattern "\\./pages/" -Quiet
    Expected: Prints False
    Evidence: .sisyphus/evidence/task-1-tailwind-content.txt

  Scenario: PostCSS config normalized
    Tool: Bash (PowerShell)
    Steps:
      1) Test-Path postcss.config.js
      2) Test-Path postcss.config.mjs
    Expected:
      - Step 1 prints True
      - Step 2 prints False
    Evidence: .sisyphus/evidence/task-1-postcss-normalized.txt
  ```

  **Commit**: YES | Message: `chore(sprint1): normalize routing and config inventory` | Files: [app/page.tsx, postcss config, tailwind config, styles/globals.css tracking]


- [ ] 2. Implement missing Contact route + components (Sprint-1)

  **What to do**:
  - Create these files (named exports only under `components/**`):
    - `components/pages/contact/ContactHero.tsx` (static heading + short copy)
    - `components/pages/contact/ContactInfoCard.tsx` (static contact channels; no external integrations)
    - `components/pages/contact/ContactForm.tsx`:
      - Must start with `"use client"`.
      - Minimal local state for `name`, `email`, `message`.
      - Uses UI primitives `Input`, `Textarea`, and `Button`.
      - `onSubmit`: `preventDefault()`; show a local “sent” toast/message; **no** `fetch()`/axios.
      - Include `data-component="ContactForm"` marker.
  - Create `app/(public)/contact/page.tsx` that composes `ContactHero`, `ContactForm`, `ContactInfoCard` and includes `data-component` markers.
  - Ensure no forbidden border/divider utilities are introduced (no-line philosophy).
  - Ensure no hex colors appear in these new components/pages.

  **Must NOT do**:
  - Do not add `/api/contact`.
  - Do not introduce react-hook-form/zod/validation frameworks (not in Sprint-1 plan).

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: landing UI composition + token usage + no-line constraints
  - Skills: `[]`

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: 3 | Blocked By: 1

  **References**:
  - Plan: `.sisyphus/plans/ecotrack-landing-sprint.md`:
    - Deliverables: Contact files + UI-only form rule
    - Guardrails: no hex in `components/**` or `app/(public)/**`
    - Export policy: no default exports under `components/**`

  **Acceptance Criteria**:
  - [ ] Files exist:
    - `components/pages/contact/ContactHero.tsx`
    - `components/pages/contact/ContactInfoCard.tsx`
    - `components/pages/contact/ContactForm.tsx`
    - `app/(public)/contact/page.tsx`
  - [ ] `Select-String -Path components/pages/contact/ContactForm.tsx -Pattern '"use client"' -Quiet` returns `True`.
  - [ ] `Get-ChildItem -Recurse components/pages/contact, "app/(public)/contact" -Include *.ts,*.tsx | Select-String -Pattern "axios|fetch\\(" -List` prints nothing.

  **QA Scenarios**:
  ```
  Scenario: Contact files and client directive present
    Tool: Bash (PowerShell)
    Steps:
      1) Test-Path components/pages/contact/ContactHero.tsx
      2) Test-Path components/pages/contact/ContactForm.tsx
      3) Test-Path components/pages/contact/ContactInfoCard.tsx
      4) Test-Path "app/(public)/contact/page.tsx"
      5) Select-String -Path components/pages/contact/ContactForm.tsx -Pattern '"use client"' -Quiet
    Expected:
      - Steps 1-4 print True
      - Step 5 prints True
    Evidence: .sisyphus/evidence/task-2-contact-files.txt

  Scenario: No backend calls wired in contact components
    Tool: Bash (PowerShell)
    Steps:
      1) Get-ChildItem -Recurse components/pages/contact, "app/(public)/contact" -Include *.ts,*.tsx | Select-String -Pattern "axios|fetch\\(" -List
    Expected: No output (0 matches)
    Evidence: .sisyphus/evidence/task-2-contact-no-backend.txt
  ```

  **Commit**: YES | Message: `feat(contact): add public contact page (ui-only)` | Files: [components/pages/contact/*, app/(public)/contact/page.tsx]


- [ ] 3. Sprint-1 final verification + git inventory compliance

  **What to do**:
  - Ensure evidence directory exists (required for all evidence outputs):
    - `New-Item -ItemType Directory -Force .sisyphus/evidence | Out-Null`
  - Run all Sprint-1 plan gates:
    - `npm install`
    - `npm run lint`
    - `npm run build`
    - `npm run dev` then HTTP 200 checks for `/`, `/about`, `/services`, `/contact`
  - Run static guardrail checks:
    - No `#` in `components/**` and `app/(public)/**`
    - No `border-gray-`, `border-slate-`, `divide-` in `components/**` and `app/(public)/**` (allow only explicit interactive exceptions)
    - No `export default` under `components/**`
  - Ensure git inventory matches Sprint-1 authoritative list:
    - Track all Sprint-1 inventory files.
    - Ensure no unexpected stragglers: `app/page.tsx` absent.
    - End with clean working tree.

  **Sprint-1 inventory list to verify (must be tracked)**:
  - `tailwind.config.ts`
  - `postcss.config.js`
  - `styles/globals.css`
  - `app/layout.tsx`
  - `app/(public)/layout.tsx`
  - `app/(public)/page.tsx`
  - `app/(public)/about/page.tsx`
  - `app/(public)/services/page.tsx`
  - `app/(public)/contact/page.tsx`
  - `types/index.ts`
  - `lib/utils.ts`
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

  **Must NOT do**:
  - Do not “fix” verification failures by weakening guardrails (e.g., allowing hex in components).

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: end-to-end gates + deterministic compliance evidence
  - Skills: `[]`

  **Parallelization**: Can Parallel: NO | Wave 3 | Blocks: Final Verification Wave | Blocked By: 1–2

  **References**:
  - Plan: `.sisyphus/plans/ecotrack-landing-sprint.md`:
    - Definition of Done
    - Final verification commands

  **Acceptance Criteria**:
  - [ ] `npm run lint` exits 0.
  - [ ] `npm run build` exits 0.
  - [ ] HTTP checks return 200 for `/`, `/about`, `/services`, `/contact`.
  - [ ] Static scans show 0 matches for forbidden patterns.
  - [ ] `git status --porcelain` prints nothing.

  **QA Scenarios**:
  ```
  Scenario: Build/lint gates
    Tool: Bash
    Steps:
      0) New-Item -ItemType Directory -Force .sisyphus/evidence | Out-Null
      1) npm install
      2) npm run lint
      3) npm run build
    Expected: All exit code 0
    Evidence: .sisyphus/evidence/task-3-lint-build.txt

  Scenario: Dev server route checks
    Tool: Bash (PowerShell)
    Steps:
      0) New-Item -ItemType Directory -Force .sisyphus/evidence | Out-Null
      1) $repo = (Get-Location).Path
      2) $p = Start-Process -FilePath "npm" -ArgumentList @('run','dev','--','-p','3000') -WorkingDirectory $repo -PassThru
      3) try {
           $routes = @('/', '/about', '/services', '/contact')
           $deadline = (Get-Date).AddSeconds(45)
           foreach ($r in $routes) {
             $ok = $false
             while ((Get-Date) -lt $deadline -and -not $ok) {
               try {
                 $status = (Invoke-WebRequest ("http://localhost:3000" + $r) -UseBasicParsing).StatusCode
                 $status
                 if ($status -eq 200) { $ok = $true }
               } catch {
                 Start-Sleep -Milliseconds 500
               }
             }
             if (-not $ok) { throw "Route check failed or timed out for $r" }
           }
         } finally {
           Stop-Process -Id $p.Id -Force
         }
    Expected: Prints 200 for each route
    Evidence: .sisyphus/evidence/task-3-routes-200.txt

  Scenario: Static guardrail scans
    Tool: Bash (PowerShell)
    Steps:
      0) New-Item -ItemType Directory -Force .sisyphus/evidence | Out-Null
      1) Get-ChildItem -Recurse components, "app/(public)" -Include *.ts,*.tsx | Select-String -Pattern "#" -List
      2) Get-ChildItem -Recurse components, "app/(public)" -Include *.ts,*.tsx | Select-String -Pattern "border-gray-|border-slate-|divide-" -List
      3) Get-ChildItem -Recurse components -Include *.ts,*.tsx | Select-String -Pattern "export default" -List
    Expected: No output from all 3 steps (0 matches)
    Evidence: .sisyphus/evidence/task-3-static-scans.txt

  Scenario: Git clean
    Tool: Bash (PowerShell)
    Steps:
      0) New-Item -ItemType Directory -Force .sisyphus/evidence | Out-Null
      1) git status --porcelain
    Expected: No output
    Evidence: .sisyphus/evidence/task-3-git-clean.txt

  Scenario: Sprint-1 inventory files tracked
    Tool: Bash (PowerShell)
    Steps:
      0) New-Item -ItemType Directory -Force .sisyphus/evidence | Out-Null
      1) $paths = @(
           'tailwind.config.ts','postcss.config.js','styles/globals.css',
           'app/layout.tsx','app/(public)/layout.tsx','app/(public)/page.tsx',
           'app/(public)/about/page.tsx','app/(public)/services/page.tsx','app/(public)/contact/page.tsx',
           'types/index.ts','lib/utils.ts',
           'components/ui/Button.tsx','components/ui/Input.tsx','components/ui/Textarea.tsx','components/ui/Badge.tsx','components/ui/Card.tsx','components/ui/Modal.tsx','components/ui/Dropdown.tsx','components/ui/Avatar.tsx','components/ui/ProgressBar.tsx','components/ui/Spinner.tsx','components/ui/Toast.tsx','components/ui/Tabs.tsx',
           'components/layout/Navbar.tsx','components/layout/Footer.tsx',
           'components/landing/HeroSection.tsx','components/landing/HowItWorksSection.tsx','components/landing/StatsSection.tsx','components/landing/FeaturesSection.tsx','components/landing/CtaSection.tsx',
           'components/pages/about/AboutHero.tsx','components/pages/about/MissionVisionSection.tsx','components/pages/about/TeamSection.tsx','components/pages/about/ImpactSection.tsx',
           'components/pages/services/ServicesHero.tsx','components/pages/services/ServiceCard.tsx',
           'components/pages/contact/ContactHero.tsx','components/pages/contact/ContactForm.tsx','components/pages/contact/ContactInfoCard.tsx'
         )
      2) $missing = @(); foreach ($p in $paths) { git ls-files --error-unmatch $p *> $null; if (-not $?) { $missing += $p } }
      3) if ($missing.Count -gt 0) { throw ("Missing tracked files:\n" + ($missing -join "\n")) }
    Expected: Script completes without throwing
    Evidence: .sisyphus/evidence/task-3-inventory-tracked.txt

  Scenario: Each route includes data-component markers
    Tool: Bash (PowerShell)
    Steps:
      0) New-Item -ItemType Directory -Force .sisyphus/evidence | Out-Null
      1) $checks = @(
           @{ route = '/';        markers = @('HeroSection','HowItWorksSection','StatsSection','FeaturesSection','CtaSection') },
           @{ route = '/about';   markers = @('AboutHero','MissionVisionSection','TeamSection','ImpactSection') },
           @{ route = '/services';markers = @('ServicesHero','ServiceCard') },
           @{ route = '/contact'; markers = @('ContactHero','ContactForm','ContactInfoCard') }
         )
      2) foreach ($c in $checks) {
           $found = $false
           $html = (Invoke-WebRequest ("http://localhost:3000" + $c.route) -UseBasicParsing).Content
           if ($html -notmatch 'data-component="') { throw "Missing any data-component marker on $($c.route)" }
           foreach ($m in $c.markers) {
             if ($html -match ("data-component=\"" + [regex]::Escape($m) + "\"")) { $found = $true }
           }
           if (-not $found) { throw "Missing expected markers on $($c.route). Expected one of: $($c.markers -join ', ')" }
         }
    Expected: Script completes without throwing
    Evidence: .sisyphus/evidence/task-3-route-markers.txt
  ```

  **Commit**: YES | Message: `chore(sprint1): verification and inventory compliance` | Files: [any remaining inventory fixes]


## Final Verification Wave (MANDATORY — after ALL implementation tasks)
> Run 4 review agents in parallel (agent-executed). Present consolidated results to user and wait for explicit approval.

- [ ] F1. Plan Compliance Audit — `oracle`
- [ ] F2. Code Quality Review — `oracle`
- [ ] F3. Hands-on QA Execution (commands + route checks) — `general`
- [ ] F4. Scope Fidelity Check — `oracle`

### Final Verification Wave — Executable Procedure (agent-run, decision-complete)
> Tools (choose the one that exists in your runner):
> - **OpenCode runner**: `functions.task` (with `run_in_background=true`) + `functions.background_output`
> - **Legacy OMO runner**: `call_omo_agent` (with `run_in_background=true`) + `functions.background_output`

1) **Launch 4 background tasks in parallel** (record the returned task IDs):

   - F1 — oracle (plan compliance)
     - Call:
       - OpenCode: `functions.task(subagent_type='oracle', run_in_background=true, load_skills=[], prompt=<<<PROMPT>>>)`
       - Legacy: `call_omo_agent(subagent_type='oracle', run_in_background=true, prompt=<<<PROMPT>>>)`
     - PROMPT content:
       - "Audit repo compliance against these plans: `.sisyphus/plans/ecotrack-landing-sprint.md` AND `.sisyphus/plans/ecotrack-landing-sprint-remediation.md`."
       - Verify, at minimum:
         - `app/page.tsx` is absent
         - Contact route exists at `app/(public)/contact/page.tsx`
         - All inventory paths listed in remediation Task 3 are tracked in git
         - No `export default` under `components/**`
         - No hex colors in `components/**` and `app/(public)/**`
         - No `border-gray-`, `border-slate-`, `divide-` under `components/**` and `app/(public)/**` (except allowed interactive exceptions)
       - Output: PASS/FAIL + bullet list of any blockers.

   - F2 — oracle (code quality)
     - Call:
       - OpenCode: `functions.task(subagent_type='oracle', run_in_background=true, load_skills=[], prompt=<<<PROMPT>>>)`
       - Legacy: `call_omo_agent(subagent_type='oracle', run_in_background=true, prompt=<<<PROMPT>>>)`
     - PROMPT content:
       - "Review the Sprint-1 landing code for Next.js App Router correctness and maintainability. Focus on routing/layout composition, client/server boundaries, and adherence to export policy. Output PASS/FAIL + concrete file-level issues."

   - F3 — general (hands-on QA)
     - Call:
       - OpenCode: `functions.task(subagent_type='general', run_in_background=true, load_skills=[], prompt=<<<PROMPT>>>)`
       - Legacy: `call_omo_agent(subagent_type='general', run_in_background=true, prompt=<<<PROMPT>>>)`
     - PROMPT content:
       - "Execute the Task-3 QA scenarios from `.sisyphus/plans/ecotrack-landing-sprint-remediation.md` (lint/build/dev HTTP checks + static scans + inventory-tracked check). Report PASS/FAIL and include command outputs for any failures."

   - F4 — oracle (scope fidelity)
     - Call:
       - OpenCode: `functions.task(subagent_type='oracle', run_in_background=true, load_skills=[], prompt=<<<PROMPT>>>)`
       - Legacy: `call_omo_agent(subagent_type='oracle', run_in_background=true, prompt=<<<PROMPT>>>)`
     - PROMPT content:
       - "Confirm Sprint-1 scope fidelity: landing-only. Verify no routes/components exist for auth/admin/dashboard/user/map/education and no API routes. Output PASS/FAIL + list of offending paths if any."

2) **Collect each result** via `functions.background_output(task_id='<ID>')`.

3) **Write evidence files** (required; copy outputs verbatim):
   - `.sisyphus/evidence/final-F1-oracle-plan-compliance.txt`
   - `.sisyphus/evidence/final-F2-oracle-code-quality.txt`
   - `.sisyphus/evidence/final-F3-general-hands-on-qa.txt`
   - `.sisyphus/evidence/final-F4-oracle-scope-fidelity.txt`

4) **Pass/Fail rule**:
   - PASS only if all four are PASS.
   - Any FAIL → fix repo → re-run F1–F4.

## Commit Strategy
- Keep commits atomic:
  1) routing/config normalization
  2) contact page
  3) final verification/inventory cleanup (only if needed)

## Success Criteria
- Repo matches Sprint-1 authoritative inventory and guardrails.
- All 4 public routes return 200 and contain `data-component` markers.
- Lint/build pass and git working tree is clean.
