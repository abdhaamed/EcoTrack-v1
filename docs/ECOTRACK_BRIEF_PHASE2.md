# 🌿 EcoTrack — Agent Brief Phase 2
> **Auth + Waste Report Form + Dashboard (Supabase)**
> Stack: Next.js 14 App Router · TypeScript · Tailwind CSS · Supabase

---

## 📌 Konteks Phase

Phase 1 sudah selesai: Landing Page (`/`, `/about`, `/services`, `/contact`) sudah live sebagai halaman statis.

**Phase 2 ini membangun:**
1. **Supabase setup** — koneksi client, env, types
2. **Auth** — Login, Register (Supabase Auth)
3. **Dashboard** — halaman pertama setelah login
4. **Waste Report Form** — form pelaporan sampah dengan Server Action ke Supabase
5. **UI tambahan** — `Spinner`, `Toast` (belum ada dari Phase 1)

> Semua pekerjaan Phase 2 berupa **stub file** (kontrak kosong).
> Tidak ada implementasi nyata. Tim mengisi masing-masing sesuai nama mereka.

---

## 🗓️ Sprint Phase 2 — Pembagian Tugas

### 📋 Task Board

| # | File | Member | Kategori |
|---|------|--------|----------|
| 1 | `.env.local.example` | **Rifqi** | Setup |
| 2 | `lib/supabase.ts` | **Rifqi** | Setup |
| 3 | `lib/auth.ts` | **Rifqi** | Auth helper |
| 4 | `components/auth/LoginForm.tsx` | **Rifqi** | Auth UI |
| 5 | `components/auth/RegisterForm.tsx` | **Rifqi** | Auth UI |
| 6 | `app/auth/login/page.tsx` | **Rifqi** | Auth Page |
| 7 | `app/auth/register/page.tsx` | **Rifqi** | Auth Page |
| 8 | `types/waste.ts` | **Alfin** | Types |
| 9 | `app/actions/waste.ts` | **Alfin** | Server Action |
| 10 | `components/pages/report/WasteReportForm.tsx` | **Alfin** | Report UI |
| 11 | `app/reports/create/page.tsx` | **Alfin** | Report Page |
| 12 | `components/ui/Spinner.tsx` | **Raja** | UI Primitive |
| 13 | `components/ui/Toast.tsx` | **Raja** | UI Primitive |
| 14 | `components/pages/dashboard/DashboardHeader.tsx` | **Hamid** | Dashboard UI |
| 15 | `components/pages/dashboard/RecentReportsList.tsx` | **Hamid** | Dashboard UI |
| 16 | `app/dashboard/page.tsx` | **Hamid** | Dashboard Page |

### 👥 Ringkasan Per Anggota

| Member | Scope | File | Deskripsi Singkat |
|--------|-------|------|--------------------|
| **Rifqi** | Auth & Supabase | #1–7 | Setup env + Supabase client + auth helper + LoginForm + RegisterForm + auth pages |
| **Alfin** | Report Form | #8–11 | Types waste + Server Action + WasteReportForm + halaman /reports/create |
| **Raja** | UI Feedback | #12–13 | Spinner + Toast — UI primitif yang dipakai semua member lain |
| **Hamid** | Dashboard | #14–16 | DashboardHeader + RecentReportsList + halaman /dashboard |

> **⚠️ Dependency chain:**
> ```
> Rifqi selesai #1-2 (.env + supabase.ts)
>   → Alfin bisa mulai #9 (app/actions/waste.ts — butuh supabase)
>   → Rifqi lanjut #3 (lib/auth.ts) → #6, #7 (auth pages)
>
> Raja selesai #12 (Spinner.tsx)
>   → Rifqi bisa mulai #4, #5 (LoginForm, RegisterForm — butuh Spinner)
>   → Alfin bisa mulai #10 (WasteReportForm — butuh Spinner)
>
> Raja selesai #13 (Toast.tsx)
>   → Alfin bisa melengkapi #10 (WasteReportForm — butuh Toast)
>
> Alfin selesai #8, #9 (types/waste.ts + actions/waste.ts)
>   → Alfin bisa mulai #10 (WasteReportForm — butuh WasteReportPayload + submitWasteReport)
>
> Rifqi selesai #6 (auth pages) + Raja selesai #12-13 (Spinner + Toast)
>   → Hamid bisa mulai #14-16 (Dashboard — semua dependency sudah siap)
> ```

---

## 📁 Struktur Folder Phase 2

> **Legend:**
> - ✅ `PHASE 1 DONE` — sudah ada, jangan diubah
> - 🟢 `PHASE 2 SPRINT` — dikerjakan phase ini
> - ⏳ `NEXT PHASE` — belum disentuh

```
ecotrack/
│
├── .env.local.example              🟢 PHASE 2 [RIFQI]   ← BARU
│
├── lib/
│   ├── utils.ts                    ✅ PHASE 1 DONE
│   ├── supabase.ts                 🟢 PHASE 2 [RIFQI]   ← BARU
│   └── auth.ts                     🟢 PHASE 2 [RIFQI]   ← BARU
│
├── types/
│   ├── index.ts                    ✅ PHASE 1 DONE
│   └── waste.ts                    🟢 PHASE 2 [ALFIN]   ← BARU
│
├── app/
│   │
│   ├── actions/                                          ← BARU folder
│   │   └── waste.ts                🟢 PHASE 2 [ALFIN]
│   │
│   ├── auth/                                             ← BARU folder
│   │   ├── login/
│   │   │   └── page.tsx            🟢 PHASE 2 [RIFQI]
│   │   └── register/
│   │       └── page.tsx            🟢 PHASE 2 [RIFQI]
│   │
│   ├── dashboard/                                        ← BARU folder
│   │   └── page.tsx                🟢 PHASE 2 [HAMID]
│   │
│   ├── reports/                                          ← BARU folder
│   │   └── create/
│   │       └── page.tsx            🟢 PHASE 2 [ALFIN]
│   │
│   └── (public)/                   ✅ PHASE 1 DONE — jangan diubah
│       ├── layout.tsx
│       ├── page.tsx
│       ├── about/page.tsx
│       ├── services/page.tsx
│       └── contact/page.tsx
│
├── components/
│   │
│   ├── ui/
│   │   ├── Button.tsx              ✅ PHASE 1 DONE
│   │   ├── Input.tsx               ✅ PHASE 1 DONE
│   │   ├── Textarea.tsx            ✅ PHASE 1 DONE
│   │   ├── Badge.tsx               ✅ PHASE 1 DONE
│   │   ├── Card.tsx                ✅ PHASE 1 DONE
│   │   ├── Modal.tsx               ✅ PHASE 1 DONE
│   │   ├── Dropdown.tsx            ✅ PHASE 1 DONE
│   │   ├── Avatar.tsx              ✅ PHASE 1 DONE
│   │   ├── ProgressBar.tsx         ✅ PHASE 1 DONE
│   │   ├── Tabs.tsx                ✅ PHASE 1 DONE
│   │   ├── Spinner.tsx             🟢 PHASE 2 [RAJA]    ← BARU
│   │   └── Toast.tsx               🟢 PHASE 2 [RAJA]    ← BARU
│   │
│   ├── auth/                                             ← BARU folder
│   │   ├── LoginForm.tsx           🟢 PHASE 2 [RIFQI]
│   │   └── RegisterForm.tsx        🟢 PHASE 2 [RIFQI]
│   │
│   ├── pages/
│   │   ├── about/                  ✅ PHASE 1 DONE
│   │   ├── services/               ✅ PHASE 1 DONE
│   │   ├── contact/                ✅ PHASE 1 DONE
│   │   ├── dashboard/                                    ← BARU folder
│   │   │   ├── DashboardHeader.tsx 🟢 PHASE 2 [HAMID]
│   │   │   └── RecentReportsList.tsx 🟢 PHASE 2 [HAMID]
│   │   └── report/                                       ← BARU folder
│   │       └── WasteReportForm.tsx 🟢 PHASE 2 [ALFIN]
│   │
│   └── landing/                    ✅ PHASE 1 DONE
│
└── styles/
    ├── globals.css                 ✅ PHASE 1 DONE
    └── landing.css                 ✅ PHASE 1 DONE
```

---

## 🤖 Prompt untuk AI Agent — Phase 2

```
You are a Next.js 14 project scaffolder. Your ONLY job is to create empty stub
files with contracts (comments only). Do NOT write any real logic, real JSX UI,
real API calls, or any implementation code whatsoever.

## Rules — strictly enforced
- Every file must contain ONLY: imports declarations (as comments), a prop
  interface (typed but empty), and a function shell that returns null
- All logic, UI, and implementation must be written as comment contracts
  describing WHAT the code must do — not HOW
- No className implementations, no Tailwind classes, no useState logic,
  no actual JSX elements beyond the outermost return null
- Every file must have: // ASSIGNED TO: [Name] and // CONTRACT: [description]

---

## Project context
Project name: EcoTrack — waste management platform
Stack: Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase

Existing files (DO NOT recreate or modify):
  app/page.tsx
  app/layout.tsx
  components/landing/*
  components/layout/*
  components/pages/about/*
  components/pages/services/*
  components/pages/contact/*
  components/ui/Button.tsx
  components/ui/Input.tsx
  components/ui/Textarea.tsx
  components/ui/Badge.tsx
  components/ui/Card.tsx
  components/ui/Modal.tsx
  components/ui/Dropdown.tsx
  components/ui/Avatar.tsx
  components/ui/ProgressBar.tsx
  components/ui/Tabs.tsx
  lib/utils.ts
  types/index.ts
  styles/globals.css
  styles/landing.css

---

## Files to scaffold — create these 16 files only

---

### 1. .env.local.example
// ASSIGNED TO: Rifqi
// CONTRACT: Template environment variables for the team
// List these keys with empty values:
//   NEXT_PUBLIC_SUPABASE_URL=
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=
// This file is safe to commit to git.
// Do not put real values.

---

### 2. lib/supabase.ts
// ASSIGNED TO: Rifqi
// CONTRACT: Initialize and export the Supabase client
// - Import createClient from @supabase/supabase-js
// - Read NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
//   from process.env
// - Export a single named `supabase` client instance
// - No auth config needed yet
// Return: export const supabase = null as any  ← placeholder only

---

### 3. lib/auth.ts
// ASSIGNED TO: Rifqi
// CONTRACT: Auth helper functions using Supabase Auth
// - getSession(): async, returns current session or null
// - getCurrentUser(): async, returns current user object or null
// - signOut(): async, calls supabase.auth.signOut()
// Export all three as named exports.
// Return: stub functions that return null

---

### 4. components/ui/Spinner.tsx
// ASSIGNED TO: Raja
// CONTRACT: Loading spinner component
// Props:
//   size: 'sm' | 'md' | 'lg'
//   color?: string
// - Render an animated circular spinner
// - Size maps to: sm=16px, md=24px, lg=32px
// - Use Tailwind animate-spin
// - No 'use client' needed (pure display)
// Return: null (stub)

---

### 5. components/ui/Toast.tsx
// ASSIGNED TO: Raja
// CONTRACT: Notification toast component
// 'use client' directive required
// Props:
//   message: string
//   type: 'success' | 'error' | 'info'
//   onClose: () => void
// - Render a fixed-position notification (top-right or bottom)
// - type 'success' → Deep Forest / green background token
// - type 'error'   → feedback-error red background token
// - type 'info'    → Bone background token
// - Display message text
// - X close button calls onClose
// - Auto-dismiss after 3 seconds via useEffect
// Return: null (stub)

---

### 6. components/auth/LoginForm.tsx
// ASSIGNED TO: Rifqi
// CONTRACT: Login form component
// 'use client' directive required
// Props:
//   onSubmit: (data: { email: string; password: string }) => void
//   isLoading: boolean
//   error?: string
// - Field: Email (Input type="email")
// - Field: Password (Input type="password") with show/hide toggle
// - Submit button: disabled + shows Spinner when isLoading is true
// - Display error prop below submit button if present
// - Link "Lupa password?" → /auth/forgot-password
// - Link "Belum punya akun? Daftar" → /auth/register
// - Uses: Input, Button, Spinner from components/ui/
// Return: null (stub)

---

### 7. components/auth/RegisterForm.tsx
// ASSIGNED TO: Rifqi
// CONTRACT: Register form component
// 'use client' directive required
// Props:
//   onSubmit: (data: {
//     name: string; email: string;
//     password: string; confirmPassword: string
//   }) => void
//   isLoading: boolean
//   error?: string
// - Field: Nama Lengkap (Input type="text")
// - Field: Email (Input type="email")
// - Field: Password (Input type="password")
// - Field: Konfirmasi Password (Input type="password")
// - Field: ToS checkbox — user must tick before submit enables
// - Client-side validate: password === confirmPassword, show inline error if not
// - Submit button: disabled + shows Spinner when isLoading is true
// - Display error prop below submit button if present
// - Link "Sudah punya akun? Login" → /auth/login
// - Uses: Input, Button, Spinner from components/ui/
// Return: null (stub)

---

### 8. app/auth/login/page.tsx
// ASSIGNED TO: Rifqi
// Route: /auth/login
// CONTRACT: Login page — orchestrates LoginForm with Supabase auth
// 'use client' directive required
// Internal state: isLoading (boolean), error (string | null)
// - Import LoginForm from components/auth/LoginForm
// - Import supabase from lib/supabase
// - Import useRouter from next/navigation
// - onSubmit handler:
//   1. Set isLoading = true, clear error
//   2. Call supabase.auth.signInWithPassword({ email, password })
//   3. If error from Supabase: set error state with message, set isLoading = false
//   4. If success: router.push('/dashboard')
// - Render: two-column layout on desktop (form left, illustration placeholder right)
//   On mobile: single column, form only
// - Render LoginForm passing onSubmit, isLoading, error
// Return: <main> wrapping null (stub)

---

### 9. app/auth/register/page.tsx
// ASSIGNED TO: Rifqi
// Route: /auth/register
// CONTRACT: Register page — orchestrates RegisterForm with Supabase auth
// 'use client' directive required
// Internal state: isLoading (boolean), error (string | null), success (boolean)
// - Import RegisterForm from components/auth/RegisterForm
// - Import supabase from lib/supabase
// - onSubmit handler:
//   1. Set isLoading = true, clear error
//   2. Call supabase.auth.signUp({
//        email, password,
//        options: { data: { name } }
//      })
//   3. If error from Supabase: set error state, set isLoading = false
//   4. If success: set success = true
//      Show message: "Cek email kamu untuk verifikasi akun."
// - If success is true: hide form, show success message + link to /auth/login
// - Render RegisterForm passing onSubmit, isLoading, error
// Return: <main> wrapping null (stub)

---

### 10. types/waste.ts
// ASSIGNED TO: Alfin
// CONTRACT: TypeScript types specific to the waste report feature
// Export these types:
//
// WasteType = 'organik' | 'anorganik' | 'b3' | 'daur_ulang'
//
// ReportStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
//
// WasteReportPayload {
//   waste_type: WasteType
//   estimated_weight: number
//   location_address: string
//   notes?: string
//   photo_url?: string
// }
//
// WasteReportResult {
//   success: boolean
//   data?: { id: number }
//   error?: string
// }
//
// No runtime logic — types/interfaces only.

---

### 11. app/actions/waste.ts
// ASSIGNED TO: Alfin
// CONTRACT: Next.js Server Action — submit waste report to Supabase
// Directive: 'use server' at top of file
// - Import supabase from lib/supabase
// - Import WasteReportPayload, WasteReportResult from types/waste
// - Export async function:
//   submitWasteReport(payload: WasteReportPayload): Promise<WasteReportResult>
// - CONTRACT inside submitWasteReport:
//   1. Validate: waste_type must be non-empty string
//   2. Validate: estimated_weight must be a number > 0
//   3. Validate: location_address must be non-empty string
//   4. If any validation fails: return { success: false, error: 'Validasi gagal: ...' }
//   5. Call supabase.from('waste_reports').insert({ ...payload }).select('id').single()
//   6. If Supabase returns error: return { success: false, error: supabaseError.message }
//   7. If success: return { success: true, data: { id: data.id } }
// Return: stub body → return { success: false, error: 'not implemented' }

---

### 12. components/pages/dashboard/DashboardHeader.tsx
// ASSIGNED TO: Hamid
// CONTRACT: Dashboard greeting and user summary section
// Props:
//   userName: string
//   total_points: number
//   totalApproved: number
// - Display greeting text: "Selamat datang, {userName}!"
// - Display 2 summary stat cards side by side:
//     Card 1: label "Total Poin Aktif", value = total_points
//     Card 2: label "Laporan Disetujui", value = totalApproved
// - CTA button: label "+ Laporkan Sampah", links to /reports/create
// - Uses: Card, Button from components/ui/
// Return: null (stub)

---

### 13. components/pages/dashboard/RecentReportsList.tsx
// ASSIGNED TO: Hamid
// CONTRACT: Display user's 3 most recent waste reports
// Props:
//   reports: WasteReport[]   ← import WasteReport from types/index.ts
// - If reports.length === 0:
//     Show empty state: icon + text "Belum ada laporan. Yuk mulai laporkan sampah!"
// - For each report in reports (max 3):
//     Show: waste_type (formatted), created_at (formatted as DD MMM YYYY),
//           status badge using existing Badge component:
//             'PENDING'  → variant 'warning', label "Menunggu Review"
//             'APPROVED' → variant 'success', label "Disetujui"
//             'REJECTED' → variant 'danger',  label "Ditolak"
// - Each item wrapped in Card component
// - Uses: Card, Badge from components/ui/
// Return: null (stub)

---

### 14. app/dashboard/page.tsx
// ASSIGNED TO: Hamid
// Route: /dashboard
// CONTRACT: Main user dashboard page after login
// This is a Server Component (no 'use client').
// - Import createServerComponentClient from @supabase/auth-helpers-nextjs
//   or use cookies() from next/headers to build supabase server client
// - Import DashboardHeader from components/pages/dashboard/DashboardHeader
// - Import RecentReportsList from components/pages/dashboard/RecentReportsList
// - Steps:
//   1. Get current session via supabase server client
//   2. If no session: redirect('/auth/login') using next/navigation
//   3. Fetch user row from 'users' table where id = session.user.id
//      → get name, total_points
//   4. Fetch 3 most recent rows from 'waste_reports'
//      where user_id = session.user.id, order by created_at desc, limit 3
//   5. Count total approved: count waste_reports where status = 'APPROVED'
//      and user_id = session.user.id
//   6. Pass all data to DashboardHeader and RecentReportsList
// Return: <main> wrapping null (stub)

---

### 15. components/pages/report/WasteReportForm.tsx
// ASSIGNED TO: Alfin
// CONTRACT: Waste report submission form with Server Action
// 'use client' directive required
// Internal state:
//   wasteType: WasteType | ''
//   estimatedWeight: string
//   locationAddress: string
//   notes: string
//   isPending: boolean  ← from useTransition
//   toast: { message: string; type: 'success'|'error' } | null
// - Import submitWasteReport from app/actions/waste
// - Import WasteReportPayload, WasteType from types/waste
// - Import Spinner, Toast from components/ui/
// - Import Input, Textarea, Button from components/ui/
// - useTransition for isPending
// - Form fields (all disabled when isPending):
//     a. Jenis Sampah — 4 styled radio selection cards:
//          Organik | Anorganik | B3 | Daur Ulang
//          Selected card: highlighted with Sapling Green token
//     b. Estimasi Berat — number Input, suffix "kg", min=0
//     c. Lokasi — text Input for manual address entry,
//          placeholder "Contoh: Jl. Sudirman No. 1, Jakarta"
//     d. Catatan Tambahan — Textarea, optional, rows=3
// - Submit button:
//     Label "Kirim Laporan" when not pending
//     Shows <Spinner size="sm" /> when isPending
//     Disabled when isPending
// - onSubmit handler inside startTransition:
//     1. Build payload: { waste_type, estimated_weight: parseFloat, location_address, notes }
//     2. Call submitWasteReport(payload)
//     3. If result.success:
//          Set toast { message: "Laporan berhasil dikirim!", type: "success" }
//          Reset all fields to empty
//          Scroll window to top
//     4. If result.error:
//          Set toast { message: result.error, type: "error" }
// - Render Toast component when toast state is not null
//   Pass onClose: () => setToast(null)
// Return: null (stub)

---

### 16. app/reports/create/page.tsx
// ASSIGNED TO: Alfin
// Route: /reports/create
// CONTRACT: Page that hosts the waste report form
// This is a Server Component (no 'use client').
// - Import createServerComponentClient or use cookies() for supabase server
// - Import WasteReportForm from components/pages/report/WasteReportForm
// - Steps:
//   1. Get session using supabase server client
//   2. If no session: redirect('/auth/login')
//   3. Render page with:
//        Page title: "Laporkan Sampah"
//        Subtitle: "Dokumentasikan aktivitas pengumpulan sampahmu"
//        WasteReportForm inside a max-w-2xl centered container
// Return: <main> wrapping null (stub)

---

## Output format for every file

Every single file must follow this exact format — no exceptions:

\`\`\`typescript
// ASSIGNED TO: [Name]
// CONTRACT: [one-line description of the file's purpose]

'use client' // only if specified in the contract above

// ─── IMPORTS (write as comments — do not write real import statements) ───────
// import { createClient } from '@supabase/supabase-js'
// import { supabase } from 'lib/supabase'
// etc.

// ─── TYPES / INTERFACES ──────────────────────────────────────────────────────
interface Props {
  // prop: type
}

// ─── COMPONENT / FUNCTION ────────────────────────────────────────────────────
export function FileName(props: Props) {
  // CONTRACT — implementation steps:
  // 1. [step description]
  // 2. [step description]
  // 3. [step description]

  return null
}
\`\`\`

Rules reminder:
- Return null for all components and functions
- No real JSX, no real Tailwind classes, no real logic
- Contracts describe WHAT must happen, not HOW
- Every file includes // ASSIGNED TO and // CONTRACT
- Generate all 16 files — do not skip any
```

---

## 📋 Catatan untuk Tim — Phase 2

### Git Branch Convention Phase 2
```
# Rifqi — Auth & Supabase
feature/rifqi/phase2-supabase-setup    ← .env.local.example + lib/supabase.ts + lib/auth.ts
feature/rifqi/phase2-auth-forms        ← LoginForm.tsx + RegisterForm.tsx
feature/rifqi/phase2-auth-pages        ← app/auth/login/page.tsx + app/auth/register/page.tsx

# Raja — UI Feedback
feature/raja/phase2-ui-spinner         ← components/ui/Spinner.tsx
feature/raja/phase2-ui-toast           ← components/ui/Toast.tsx

# Alfin — Report Form
feature/alfin/phase2-waste-types       ← types/waste.ts
feature/alfin/phase2-server-action     ← app/actions/waste.ts
feature/alfin/phase2-report-form       ← components/pages/report/WasteReportForm.tsx
feature/alfin/phase2-report-page       ← app/reports/create/page.tsx

# Hamid — Dashboard
feature/hamid/phase2-dashboard-ui      ← DashboardHeader.tsx + RecentReportsList.tsx
feature/hamid/phase2-dashboard-page    ← app/dashboard/page.tsx
```

### Urutan Pengerjaan yang Disarankan

```
Hari 1 — Paralel (Rifqi & Raja mulai bersamaan)
  Rifqi  → .env.local.example, lib/supabase.ts
           ⚠️ Push ke dev → semua bisa pull env template

  Raja   → Spinner.tsx
           ⚠️ Push ke dev → Rifqi bisa pakai di LoginForm/RegisterForm
                         → Alfin bisa pakai di WasteReportForm

Hari 2
  Rifqi  → lib/auth.ts, LoginForm.tsx, RegisterForm.tsx
           (butuh Spinner dari Raja — pastikan sudah di-merge ke dev dulu)
  Alfin  → types/waste.ts, app/actions/waste.ts
  Raja   → Toast.tsx
           Push ke dev → Alfin bisa pakai di WasteReportForm

Hari 3
  Rifqi  → app/auth/login/page.tsx, app/auth/register/page.tsx
  Alfin  → WasteReportForm.tsx
           (butuh Toast + Spinner dari Raja, butuh submitWasteReport dari hari 2)
  Hamid  → DashboardHeader.tsx, RecentReportsList.tsx
           (bisa mulai paralel karena tidak bergantung ke auth)

Hari 4
  Alfin  → app/reports/create/page.tsx
  Hamid  → app/dashboard/page.tsx
           (butuh Rifqi selesai auth pages untuk redirect logic)
  Semua  → review stub masing-masing, pastikan kontrak lengkap & jelas

Hari 5
  Semua  → PR ke dev → review bersama → merge
           Verifikasi: semua 16 file ada, semua return null, semua ada ASSIGNED TO
```

### Commit Convention Phase 2
```
chore(phase2): add .env.local.example with Supabase keys          [Rifqi]
feat(supabase): add lib/supabase.ts client stub                   [Rifqi]
feat(auth): add lib/auth.ts helper stubs                          [Rifqi]
feat(auth): add LoginForm stub                                     [Rifqi]
feat(auth): add RegisterForm stub                                  [Rifqi]
feat(auth): add /auth/login page stub                              [Rifqi]
feat(auth): add /auth/register page stub                           [Rifqi]
feat(ui): add Spinner component stub                               [Raja]
feat(ui): add Toast component stub                                 [Raja]
feat(types): add types/waste.ts                                    [Alfin]
feat(actions): add submitWasteReport server action stub            [Alfin]
feat(report): add WasteReportForm stub                             [Alfin]
feat(report): add /reports/create page stub                        [Alfin]
feat(dashboard): add DashboardHeader stub                          [Hamid]
feat(dashboard): add RecentReportsList stub                        [Hamid]
feat(dashboard): add /dashboard page stub                          [Hamid]
```

### ⚠️ Hal Penting Phase 2
- **Jangan sentuh** file Phase 1 yang sudah ada (`components/landing/*`, `components/pages/about/*`, dll.)
- Semua file Phase 2 **return null** — tidak ada implementasi, hanya kontrak komentar
- `.env.local.example` aman di-commit ke git, tapi `.env.local` (nilai asli) **jangan di-commit**
- `app/actions/waste.ts` wajib punya `'use server'` di baris pertama
- `app/dashboard/page.tsx` dan `app/reports/create/page.tsx` adalah **Server Component** — tidak perlu `'use client'`
- `components/auth/LoginForm.tsx`, `RegisterForm.tsx`, `WasteReportForm.tsx`, `Toast.tsx` **wajib** `'use client'`

---

## 🔗 Dependency Map Visual

```
.env.local.example [Rifqi]
    └── lib/supabase.ts [Rifqi]
            ├── lib/auth.ts [Rifqi]
            │       ├── app/auth/login/page.tsx [Rifqi]
            │       └── app/auth/register/page.tsx [Rifqi]
            │
            └── app/actions/waste.ts [Alfin]
                    └── components/pages/report/WasteReportForm.tsx [Alfin]
                            └── app/reports/create/page.tsx [Alfin]

types/waste.ts [Alfin]
    ├── app/actions/waste.ts [Alfin]
    └── components/pages/report/WasteReportForm.tsx [Alfin]

components/ui/Spinner.tsx [Raja]
    ├── components/auth/LoginForm.tsx [Rifqi]
    ├── components/auth/RegisterForm.tsx [Rifqi]
    └── components/pages/report/WasteReportForm.tsx [Alfin]

components/ui/Toast.tsx [Raja]
    └── components/pages/report/WasteReportForm.tsx [Alfin]

components/pages/dashboard/DashboardHeader.tsx [Hamid]
components/pages/dashboard/RecentReportsList.tsx [Hamid]
    └── app/dashboard/page.tsx [Hamid]
```
