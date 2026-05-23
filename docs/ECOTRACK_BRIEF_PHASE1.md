# 🌿 EcoTrack — Agent Brief & Project Scaffold
> **Design System: The Living Archive — Verdant Core**  
> Stack: Next.js 14 (App Router) · Tailwind CSS · TypeScript · Plus Jakarta Sans

---

## 🗓️ Sprint Minggu Ini — Landing Page Only

> ### 🎯 Target Sprint
> **Minggu ini hanya fokus ke Landing Page** — 4 halaman publik dibagi rata ke 4 anggota.
> Tidak ada admin, tidak ada dashboard user, tidak ada sistem backend, tidak ada auth.
> Cukup selesaikan tampilan statis halaman masing-masing dulu.

### 📋 Task Board Minggu Ini

| Member | Halaman | Yang Dikerjakan Sprint Ini 🟢 |
|--------|---------|-------------------------------|
| **Hamid** | `/` — Landing Page utama | Setup core (tailwind, globals, types, utils) · Semua `components/ui/` · `Navbar` · `Footer` · `(public)/layout.tsx` · `components/landing/` (Hero, HowItWorks, Stats, Features, Cta) · `app/(public)/page.tsx` |
| **Raja** | `/about` — Tentang Kami | `components/pages/about/` (AboutHero, MissionVision, TeamSection, ImpactSection) · `app/(public)/about/page.tsx` |
| **Alfin** | `/contact` — Kontak | `components/pages/contact/` (ContactHero, ContactForm, ContactInfoCard) · `app/(public)/contact/page.tsx` |
| **Rifqi** | `/services` — Layanan | `components/pages/services/` (ServicesHero, ServiceCard) · `app/(public)/services/page.tsx` |

> **Catatan:** Blog, Auth, Admin, Dashboard — semua dikerjakan **sprint berikutnya**.
>
> **⚠️ Blocker:** Hamid wajib push `tailwind.config.ts`, `globals.css`, `types/index.ts`, `lib/utils.ts`, semua `components/ui/`, `Navbar`, dan `Footer` **di hari pertama** sebelum Raja, Alfin, dan Rifqi bisa mulai coding komponen masing-masing.

---

## 🎨 Design System — The Living Archive

### Color Tokens

| Token Name | Hex | Keterangan |
|---|---|---|
| `primary` | `#154232` | Deep Forest — primary anchor, high-impact branding, display headers, primary CTAs |
| `secondary` | `#3c6a09` | Veridian Leaf — secondary brand, organic trends, data viz, secondary CTAs |
| `primary-faint` | `#bcf1ae` | Sapling Green — container fill for primary interactions, high contrast against dark forest text |
| `surface` | `#f5f3f5` | Parchment — main surface, card backgrounds |
| `surface-container` | `#eeeee9` | Bone — container backgrounds |
| `surface-typography` | `#f5f3b1` | Charcoal — primary text & iconography |
| `surface-muted` | `#d7279a` | Mist — divider fallback & muted labels |
| `feedback-success` | `#3c6a09` | Impact achieved / Verified waste |
| `feedback-error` | `#D32F2F` | Contamination detected / Invalid input |
| `feedback-link` | `#154232` | Education pathways / Interactive node |

> ⚠️ Koreksi token: nilai hex di gambar sebagian terpotong — gunakan nilai di atas sebagai acuan yang sudah direkonstruksi dari konteks visual.

### ✅ Nilai Hex yang Direkonstruksi (Final)

```
Deep Forest    →  #154232
Veridian Leaf  →  #3C6A09  
Sapling Green  →  #BCF1AE
Parchment      →  #F5F5F0  (surface utama)
Bone           →  #EEEEЕ9  (container background)
Charcoal       →  #1C1C1B  (teks utama)
Mist           →  #A7A799  (muted / divider)
```

### Typography

- **Font Utama:** `Plus Jakarta Sans` (semua weight: 400, 500, 600, 700, 800)
- **Font Artikel:** `Merriweather` atau `Georgia` (serif, khusus konten edukasi)
- **Font Mono:** `JetBrains Mono` (kode/teknis)

### "No-Line" Philosophy

Boundaries harus dibuat melalui **perbedaan warna background** (bukan border/garis). Gunakan `surface` dan `surface-container` untuk menciptakan soft-edged layout yang terasa integrated dan physical. Hindari penggunaan `border` eksplisit — gunakan elevation melalui background color shift.

### Spacing & Radius

- **Card border-radius:** `16px` (`rounded-2xl`) — lebih organik dari standar
- **Input border-radius:** `10px` (`rounded-[10px]`)
- **Button border-radius:** `999px` (`rounded-full`) — pill shape
- **Card shadow:** `none` — gunakan background shift (no-line philosophy)
- **Section padding:** `py-16 px-6` desktop, `py-10 px-4` mobile

---

## 🎯 User Scenario — Alur Lengkap

### Pertama Kali Masuk Aplikasi (New User)

```
1. LANDING PAGE  (/)
   └── User membuka browser → melihat halaman utama EcoTrack
       Hero: background Deep Forest (#154232), teks Parchment
       Headline besar Plus Jakarta Sans 800, subtitle regular
       CTA [Mulai Sekarang] — Sapling Green pill button
       CTA [Pelajari Lebih] — ghost/outlined Parchment

       Section Cara Kerja: background Bone (#EEEEE9)
         3 step cards: Parchment surface, Deep Forest icon
         Lapor → Validasi → Dapat Poin

       Section Statistik: background Parchment (#F5F5F0)
         4 counter cards dengan Veridian Leaf accent

       Section Fitur: background Bone
         4 feature cards — no border, background shift

       Footer: background Deep Forest, teks Parchment

1b. ABOUT PAGE  (/about)
   └── Navbar (sama dengan landing)
       Hero section: "Tentang EcoTrack" — bg-deep-forest, teks Parchment
       Section Misi & Visi: bg-bone, 2 card Parchment
       Section Tim: bg-parchment, grid kartu anggota tim
       Section Dampak: angka statistik bg-bone
       CTA bergabung: bg-deep-forest pill button
       Footer

1c. SERVICES PAGE  (/services)
   └── Hero: "Layanan Kami" — bg-deep-forest
       Grid layanan: bg-bone sections, card Parchment
         - Pelaporan Sampah (ikon + deskripsi)
         - Sistem Poin & Reward (ikon + deskripsi)
         - Edukasi Lingkungan (ikon + deskripsi)
         - Peta Titik Sampah (ikon + deskripsi)
         - Lokasi Pembuangan (ikon + deskripsi)
         - Dashboard Analitik Admin (ikon + deskripsi)
       CTA bawah: bg-deep-forest

1d. CONTACT PAGE  (/contact)
   └── Hero: "Hubungi Kami" — bg-deep-forest
       Two-column layout:
         Kiri: form kontak (Nama, Email, Subjek, Pesan textarea)
               [Kirim Pesan] bg-deep-forest pill button
         Kanan: info kontak (email, telepon, alamat kantor)
                Map embed placeholder (bg-bone rounded-2xl)
       bg-parchment outer, form card bg-bone

1e. BLOG PAGE  (/blog)
   └── Header: "Blog EcoTrack" — bg-deep-forest
       Featured post card besar: bg-bone rounded-2xl, gambar hero
       Grid artikel blog: same layout as ArticleGrid from education
       Filter: Semua / Tips & Trik / Berita / Event / Studi Kasus
       Pagination: pill buttons

1f. BLOG DETAIL  (/blog/:slug)
   └── Sama dengan ArticleDetail — font-serif body
       Author info card: bg-bone rounded-2xl
       Share buttons (sosial media)
       Related posts: RelatedArticles component

2. REGISTER  (/auth/register)
   └── Background Parchment, form card Bone
       Fields: Nama, Email, Password, Konfirmasi, ToS
       [Daftar] — Deep Forest pill button

3. EMAIL VERIFICATION
   └── "Akun berhasil diverifikasi!" redirect ke Login

4. LOGIN  (/auth/login)
   └── Two column: kiri form, kanan ilustrasi botanical motif
       [Masuk] — Deep Forest pill button

5. DASHBOARD  (/dashboard)
   └── Background Parchment
       3 SummaryCard: background Bone, accent Deep Forest/Veridian/Sapling
       RecentActivityList di surface card Bone
       QuickActionButtons: Sapling Green primary

6. LAPORKAN SAMPAH  (/reports/create)
   └── Form card background Bone
       PhotoUploader: drag zone Parchment border dashed Mist
       WasteTypeSelector: radio cards background Parchment → Sapling selected
       [Kirim Laporan] Deep Forest pill button

7. RIWAYAT LAPORAN  (/reports)
   └── List ReportCard — surface Bone
       Status: Sapling Green (approved), Mist (pending), Error Red (rejected)

8. LAPORAN DIVALIDASI (notifikasi)
   └── NotificationBanner: background Sapling Green (#BCF1AE), teks Charcoal

9. DASHBOARD POIN  (/points)
   └── PointsBalanceCard: background Deep Forest, angka besar Sapling Green
       TransactionList: surface Bone, plus = Veridian, minus = Error red

10. KATALOG REWARD  (/rewards)
    └── Grid RewardCard: surface Bone
        Badge "Bisa Ditukar": Sapling Green background
        Badge "Poin Kurang": Mist background

11. REDEEM REWARD  (/rewards/redeem/:id)
    └── Modal: background Parchment
        Confirm button: Deep Forest pill

12. RIWAYAT REDEEM  (/rewards/history)
    └── List surface Bone, status badges semantic

13. LAPORKAN TITIK SAMPAH  (/trash-spots/create)
    └── Peta full + form Bone card
        Severity: Ringan (Sapling), Sedang (Veridian), Berat (Error Red)

14. PETA TITIK SAMPAH  (/trash-spots)
    └── Leaflet map + marker custom Deep Forest icon

15. EDUKASI  (/education)
    └── Background Parchment
        ArticleCard: surface Bone, category badge Veridian Leaf

16. DETAIL ARTIKEL  (/education/:slug)
    └── Hero thumbnail, konten font Merriweather/serif

17. LOKASI PEMBUANGAN  (/disposal-locations)
    └── Peta + LocationSidebar background Parchment

18. PROFIL  (/profile)
    └── Avatar circle Deep Forest background, teks Parchment initials

19. NOTIFIKASI  (/notifications)
    └── Item unread: background Sapling Green faint
        Item read: background Bone
```

### Alur Admin
```
A1. ADMIN DASHBOARD  (/admin)        → stats + chart + validasi preview
A2. VALIDASI LAPORAN (/admin/reports) → tabel + approve/reject
A3. REWARD          (/admin/rewards)  → katalog + redeem management
A4. EDUKASI         (/admin/education)→ artikel table + WYSIWYG editor
A5. TITIK SAMPAH    (/admin/trash-spots)
A6. LOKASI          (/admin/disposal-locations)
A7. PENGGUNA        (/admin/users)
```

---

## 📁 Struktur Folder & Pembagian Tugas

> **Legend:**
> - 🟢 `SPRINT INI` — dikerjakan minggu ini
> - ⏳ `NEXT SPRINT` — sprint berikutnya, belum disentuh sama sekali
> - 🔧 `BLOCKER` — harus selesai hari pertama, tim lain tidak bisa mulai tanpa ini

```
ecotrack/
│
├── tailwind.config.ts              🔧 BLOCKER [HAMID]
├── next.config.ts                  🟢 SPRINT INI [HAMID]
│
├── styles/
│   └── globals.css                 🔧 BLOCKER [HAMID]
│
├── types/
│   └── index.ts                    🔧 BLOCKER [HAMID]
│
├── lib/
│   └── utils.ts                    🔧 BLOCKER [HAMID]  — cn(), formatDate()
│
├── app/
│   │
│   └── (public)/
│       ├── layout.tsx              🔧 BLOCKER [HAMID]  — shared Navbar + Footer
│       │
│       ├── page.tsx                🟢 SPRINT INI [HAMID]   — Route: /
│       │
│       ├── about/
│       │   └── page.tsx            🟢 SPRINT INI [RAJA]    — Route: /about
│       │
│       ├── services/
│       │   └── page.tsx            🟢 SPRINT INI [RIFQI]   — Route: /services
│       │
│       ├── contact/
│       │   └── page.tsx            🟢 SPRINT INI [ALFIN]   — Route: /contact
│       │
│       ├── blog/                   ⏳ NEXT SPRINT [HAMID]
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       │
│       ├── auth/                   ⏳ NEXT SPRINT
│       │   ├── login/page.tsx
│       │   └── register/page.tsx
│       │
│       └── education/              ⏳ NEXT SPRINT [RAJA]
│           ├── page.tsx
│           └── [slug]/page.tsx
│
│   (semua route lain: (user)/, (map)/, (admin)/ → ⏳ NEXT SPRINT)
│
└── components/
    │
    ├── ui/                         🔧 BLOCKER [HAMID]
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   ├── Textarea.tsx
    │   ├── Badge.tsx
    │   ├── Card.tsx
    │   ├── Modal.tsx
    │   ├── Dropdown.tsx
    │   ├── Avatar.tsx
    │   ├── ProgressBar.tsx
    │   ├── Spinner.tsx
    │   ├── Toast.tsx
    │   └── Tabs.tsx
    │
    ├── layout/
    │   ├── Navbar.tsx              🔧 BLOCKER [HAMID]
    │   ├── Footer.tsx              🔧 BLOCKER [HAMID]
    │   ├── Sidebar.tsx             ⏳ NEXT SPRINT
    │   ├── UserLayout.tsx          ⏳ NEXT SPRINT
    │   └── AdminLayout.tsx         ⏳ NEXT SPRINT
    │
    ├── landing/                    🟢 SPRINT INI [HAMID]
    │   ├── HeroSection.tsx
    │   ├── HowItWorksSection.tsx
    │   ├── StatsSection.tsx
    │   ├── FeaturesSection.tsx
    │   └── CtaSection.tsx
    │
    ├── pages/
    │   ├── about/                  🟢 SPRINT INI [RAJA]
    │   │   ├── AboutHero.tsx
    │   │   ├── MissionVisionSection.tsx
    │   │   ├── TeamSection.tsx
    │   │   └── ImpactSection.tsx
    │   │
    │   ├── services/               🟢 SPRINT INI [RIFQI]
    │   │   ├── ServicesHero.tsx
    │   │   └── ServiceCard.tsx
    │   │
    │   ├── contact/                🟢 SPRINT INI [ALFIN]
    │   │   ├── ContactHero.tsx
    │   │   ├── ContactForm.tsx
    │   │   └── ContactInfoCard.tsx
    │   │
    │   └── blog/                   ⏳ NEXT SPRINT [HAMID]
    │       ├── BlogHero.tsx
    │       ├── BlogFeaturedPost.tsx
    │       ├── BlogCard.tsx
    │       ├── BlogGrid.tsx
    │       ├── BlogFilterTabs.tsx
    │       ├── BlogDetail.tsx
    │       └── BlogAuthorCard.tsx
    │
    ├── auth/                       ⏳ NEXT SPRINT
    ├── dashboard/                  ⏳ NEXT SPRINT [ALFIN]
    ├── reports/                    ⏳ NEXT SPRINT [ALFIN]
    ├── points/                     ⏳ NEXT SPRINT [ALFIN]
    ├── notifications/              ⏳ NEXT SPRINT [ALFIN]
    ├── map/                        ⏳ NEXT SPRINT [RAJA]
    ├── education/                  ⏳ NEXT SPRINT [RAJA]
    └── admin/                      ⏳ NEXT SPRINT [RIFQI]
```

### 👥 Ringkasan Pembagian Tugas — Sprint Ini

| Member | Halaman | Yang Dikerjakan 🟢 | Sprint Berikutnya ⏳ |
|--------|---------|-------------------|----------------------|
| **Hamid** | `/` Landing Page | `tailwind.config.ts` · `globals.css` · `types/index.ts` · `lib/utils.ts` · semua `components/ui/` · `Navbar` · `Footer` · `(public)/layout.tsx` · `components/landing/` (Hero, HowItWorks, Stats, Features, Cta) · `app/(public)/page.tsx` | Blog, Auth, UserLayout |
| **Raja** | `/about` Tentang Kami | `components/pages/about/` (AboutHero, MissionVision, TeamSection, ImpactSection) · `app/(public)/about/page.tsx` | Map, Education |
| **Alfin** | `/contact` Kontak | `components/pages/contact/` (ContactHero, ContactForm, ContactInfoCard) · `app/(public)/contact/page.tsx` | Dashboard, Reports, Points |
| **Rifqi** | `/services` Layanan | `components/pages/services/` (ServicesHero, ServiceCard) · `app/(public)/services/page.tsx` | Admin panel seluruhnya |

---

## 🤖 Prompt untuk AI Agent (Next.js Scaffold Generator)

```
You are an expert Next.js 14 developer using the App Router and TypeScript.
Your task is to scaffold all component and page stub files for a web platform
called **EcoTrack** — a waste management and education platform with gamification.

The design language is called **"The Living Archive"** — a pigment-first palette
inspired by botanical journals and recycled substrates. The visual philosophy
is environmental stewardship, using background color shifts instead of borders
(the "No-Line" philosophy).

---

## Design System: The Living Archive — Verdant Core

### Color Tokens
Implement these EXACT values in tailwind.config.ts colors extension:

  colors: {
    'deep-forest':   '#154232',  // primary — high-impact branding, headers, CTAs
    'veridian-leaf': '#3C6A09',  // secondary — organic trends, data viz, secondary CTAs
    'sapling-green': '#BCF1AE',  // primary-faint — container fill, interaction states
    'parchment':     '#F5F5F0',  // surface — main surface, card backgrounds
    'bone':          '#EEEEE9',  // surface-container — container backgrounds
    'charcoal':      '#1C1C1B',  // surface-typography — primary text & iconography
    'mist':          '#A7A799',  // surface-muted — dividers, muted labels
    'feedback-success': '#3C6A09',
    'feedback-error':   '#CC3300',
    'feedback-link':    '#154232',
  }

Also keep these semantic aliases in the config:
  primary:    '#154232'  (maps to deep-forest)
  secondary:  '#3C6A09'  (maps to veridian-leaf)
  background: '#F5F5F0'  (maps to parchment)

### Typography
Font: **Plus Jakarta Sans** ONLY for all UI elements (weights: 400, 500, 600, 700, 800).
Font: **Merriweather** for article/education body content only (serif fallback: Georgia).
Font: **JetBrains Mono** for any technical/code display.

In globals.css, import from Google Fonts:
  Plus Jakarta Sans: wght@400;500;600;700;800
  Merriweather: wght@400;700

In tailwind.config.ts fontFamily:
  sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif']
  serif: ['Merriweather', 'Georgia', 'serif']
  mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace']

### "No-Line" Philosophy — CRITICAL
Boundaries MUST be created through background color differences, NOT borders.
- NEVER use border-gray-*, border-slate-*, divide-* for layout separation
- Use bg-parchment vs bg-bone vs bg-sapling-green/20 to create sections
- Cards: bg-bone on bg-parchment background, OR bg-parchment on bg-bone background
- Elevation = background shift, NOT box-shadow (shadow-* only sparingly)
- The only allowed borders: focus rings (ring-deep-forest), error states (border-feedback-error)

### Spacing & Radius
- Card border-radius: 16px → rounded-2xl
- Input border-radius: 10px → rounded-[10px]
- Button border-radius: 999px → rounded-full (pill shape)
- Section padding desktop: py-16 px-6
- Section padding mobile: py-10 px-4
- Card padding: p-5 or p-6
- NO box-shadow on cards — use background color shift only

### CSS Custom Properties
Add to globals.css :root {}:
  --color-primary:    #154232;
  --color-secondary:  #3C6A09;
  --color-faint:      #BCF1AE;
  --color-surface:    #F5F5F0;
  --color-container:  #EEEEE9;
  --color-text:       #1C1C1B;
  --color-muted:      #A7A799;
  --color-error:      #CC3300;

---

## Your Task

Create **stub files** for every component and page listed below. Each stub must:
1. Have the correct named export matching the filename (PascalCase)
2. Use TypeScript with a properly typed props interface in the same file
3. Return a placeholder <div> with:
   - data-component attribute set to the component name
   - A visible <p> or <span> showing the component name (for dev identification)
   - Tailwind classes using design tokens above (bg-bone, bg-parchment, text-charcoal,
     rounded-2xl, font-sans, etc.) — NO hardcoded hex colors
4. Include a JSDoc comment block describing what the component renders
5. Include // ASSIGNED TO: [Name] at the top
6. Include // TODO: Implement UI in the return statement
7. For pages: wrap in <main>, include // Route: /path comment

Do NOT implement real logic, real API calls, or real UI.
Declare prop interfaces only — no implementation.

---

## Files to Generate

### tailwind.config.ts
// ASSIGNED TO: Hamid
Full config with:
- All color tokens from Living Archive above
- fontFamily: sans (Plus Jakarta Sans), serif (Merriweather), mono (JetBrains Mono)
- borderRadius: { card: '16px', input: '10px', btn: '999px' }
- NO boxShadow extension (no-line philosophy — avoid shadow-based elevation)
- content paths: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}']

### styles/globals.css
// ASSIGNED TO: Hamid
- @import Google Fonts: Plus Jakarta Sans (400,500,600,700,800) + Merriweather (400,700)
- @tailwind base, components, utilities
- :root { CSS custom properties for all 8 color tokens }
- body { font-family: 'Plus Jakarta Sans', ...; background-color: var(--color-surface);
         color: var(--color-text); }
- .font-article { font-family: 'Merriweather', Georgia, serif; }

---

### types/index.ts
// ASSIGNED TO: Hamid
Export these TypeScript interfaces (exact field names):

interface User {
  id: string; name: string; email: string;
  role: 'user' | 'admin' | 'petugas';
  photoUrl?: string; total_points: number; createdAt: string;
}
interface WasteReport {
  id: string; userId: string; wasteType: string;
  estimatedWeight: number; photoUrl: string;
  locationAddress: string; latitude: number; longitude: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  pointsAwarded?: number; reviewedBy?: string;
  reviewNote?: string; createdAt: string;
}
interface PointTransaction {
  id: string; userId: string; reportId?: string;
  transactionType: 'CREDIT' | 'DEBIT';
  points: number; description: string; createdAt: string;
}
interface Reward {
  id: string; name: string; description: string;
  imageUrl: string; points_required: number;
  stock: number; is_active: boolean; createdAt: string;
}
interface RewardRedemption {
  id: string; userId: string; rewardId: string;
  pointsSpent: number;
  status: 'PROCESSING' | 'SHIPPED' | 'COMPLETED';
  deliveryAddress: string; trackingNote?: string; createdAt: string;
}
interface TrashSpotReport {
  id: string; userId: string; photoUrl: string;
  description: string; severityLevel: 'RINGAN' | 'SEDANG' | 'BERAT';
  latitude: number; longitude: number; locationAddress: string;
  status: 'DILAPORKAN' | 'DITANGANI' | 'SELESAI';
  handledBy?: string; handlerNote?: string; createdAt: string;
}
interface EducationArticle {
  id: string; authorId: string; title: string; slug: string;
  content: string; category: 'ORGANIK' | 'ANORGANIK' | 'B3' | 'DAUR_ULANG';
  thumbnailUrl: string; isPublished: boolean;
  publishedAt?: string; createdAt: string;
}
interface DisposalLocation {
  id: string; name: string; type: 'TPS' | 'BANK_SAMPAH';
  address: string; latitude: number; longitude: number;
  operationalHours: string; acceptedWasteTypes: string;
  contact: string; is_active: boolean; createdAt: string;
}
interface Notification {
  id: string; userId: string;
  type: 'REPORT_VALIDATED' | 'POINTS_RECEIVED' | 'REDEEM_STATUS';
  message: string; isRead: boolean; createdAt: string;
}

---

### lib/utils.ts
// ASSIGNED TO: Hamid
Export cn() function using clsx + tailwind-merge.
Export formatDate(dateStr: string): string using date-fns format.
Export formatPoints(points: number): string (e.g. "1.500 poin").

---

## UI PRIMITIVE COMPONENTS

### components/ui/Button.tsx
// ASSIGNED TO: Hamid
/**
 * Primary interactive element. Pill-shaped (rounded-full).
 * Variants use Living Archive color tokens — no border for primary/secondary.
 */
interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'faint' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
// Variant styles (for reference in TODO):
// primary:   bg-deep-forest text-parchment hover:bg-veridian-leaf
// secondary: bg-veridian-leaf text-parchment hover:bg-deep-forest
// faint:     bg-sapling-green text-charcoal hover:bg-sapling-green/80
// outlined:  border border-deep-forest text-deep-forest (exception to no-line rule — interactive element)
// ghost:     text-deep-forest hover:bg-sapling-green/20

### components/ui/Input.tsx
// ASSIGNED TO: Hamid
/**
 * Text input field. rounded-[10px]. No border by default (no-line philosophy).
 * Background bg-bone on bg-parchment surface. Focus: ring-2 ring-deep-forest.
 * Error state: border border-feedback-error (exception).
 */
interface InputProps {
  name: string; label?: string; placeholder?: string;
  type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; disabled?: boolean;
}

### components/ui/Textarea.tsx
// ASSIGNED TO: Hamid
// Same styling philosophy as Input but multiline.
interface TextareaProps {
  name: string; label?: string; placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number; error?: string;
}

### components/ui/Badge.tsx
// ASSIGNED TO: Hamid
/**
 * Semantic label chip. Uses Living Archive semantic feedback colors.
 * No border — background color conveys meaning (no-line).
 */
interface BadgeProps {
  label: string;
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}
// success: bg-sapling-green text-deep-forest
// warning: bg-yellow-100 text-yellow-800
// error:   bg-red-100 text-feedback-error
// info:    bg-bone text-veridian-leaf
// neutral: bg-bone text-mist

### components/ui/Card.tsx
// ASSIGNED TO: Hamid
/**
 * Container card. NO shadow (no-line philosophy).
 * Use bg-bone on parchment background OR bg-parchment on bone background.
 * rounded-2xl (16px). Elevation via background shift only.
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  surface?: 'bone' | 'parchment';
}

### components/ui/Modal.tsx
// ASSIGNED TO: Hamid
interface ModalProps {
  isOpen: boolean; onClose: () => void;
  title?: string; children: React.ReactNode;
}
// Backdrop: bg-charcoal/40. Panel: bg-parchment rounded-2xl p-6

### components/ui/Dropdown.tsx
// ASSIGNED TO: Hamid
interface DropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

### components/ui/Avatar.tsx
// ASSIGNED TO: Hamid
// If no src: show initials on bg-deep-forest text-parchment circle
interface AvatarProps {
  src?: string; name: string;
  size?: 'sm' | 'md' | 'lg';
}

### components/ui/ProgressBar.tsx
// ASSIGNED TO: Hamid
// Track: bg-bone. Fill: bg-deep-forest / bg-veridian-leaf / bg-sapling-green
interface ProgressBarProps {
  value: number; // 0-100
  color?: 'primary' | 'secondary' | 'faint';
  label?: string;
}

### components/ui/Spinner.tsx
// ASSIGNED TO: Hamid
interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; }
// Use border-deep-forest border-t-transparent animate-spin

### components/ui/Toast.tsx
// ASSIGNED TO: Hamid
// Background matches semantic: success=sapling-green, error=red-100, info=bone
interface ToastProps {
  message: string; type: 'success' | 'error' | 'info';
  onClose: () => void;
}

### components/ui/Tabs.tsx
// ASSIGNED TO: Hamid
// Active tab: bg-deep-forest text-parchment rounded-full
// Inactive: text-charcoal hover:bg-bone rounded-full
interface TabsProps {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onChange: (val: string) => void;
}

---

## LAYOUT COMPONENTS

### components/layout/Navbar.tsx
// ASSIGNED TO: Hamid
// bg-deep-forest text-parchment. Logo: Plus Jakarta Sans 700.
// Nav links: text-parchment/80 hover:text-parchment
// Auth buttons: [Masuk] ghost-parchment, [Daftar] bg-sapling-green text-charcoal
interface NavbarProps {
  isAuthenticated: boolean;
  user?: User;
}

### components/layout/Footer.tsx
// ASSIGNED TO: Hamid
// bg-deep-forest text-parchment/70. No border top — background shift.
// Links: About, Kontak, Kebijakan Privasi + social icons

### components/layout/Sidebar.tsx
// ASSIGNED TO: Hamid
// bg-bone (on parchment main content). Active item: bg-deep-forest text-parchment rounded-xl
// Inactive: text-charcoal hover:bg-sapling-green/20
interface SidebarProps {
  role: 'user' | 'admin';
  currentPath: string;
}

### components/layout/UserLayout.tsx
// ASSIGNED TO: Hamid
// Main bg-parchment. Sidebar bg-bone. Content area padding px-6 py-8.
interface UserLayoutProps { children: React.ReactNode; }

### components/layout/AdminLayout.tsx
// ASSIGNED TO: Hamid
// Admin sidebar bg-charcoal, text parchment. Content bg-bone.
interface AdminLayoutProps { children: React.ReactNode; }

---

## LANDING PAGE SECTIONS

### components/landing/HeroSection.tsx
// ASSIGNED TO: Hamid
// Full-screen section. Background: bg-deep-forest.
// Headline: text-parchment font-sans font-extrabold text-5xl md:text-7xl
// Subtitle: text-parchment/70 font-sans font-normal
// CTA primary: bg-sapling-green text-charcoal rounded-full
// CTA secondary: border border-parchment text-parchment rounded-full (ghost)
// Botanical motif accent in corner (placeholder div with muted green)

### components/landing/HowItWorksSection.tsx
// ASSIGNED TO: Hamid
// bg-bone. 3 step cards: bg-parchment rounded-2xl (no shadow, no border)
// Step number circle: bg-deep-forest text-parchment
// Icons: text-veridian-leaf

### components/landing/StatsSection.tsx
// ASSIGNED TO: Hamid
// bg-parchment. 4 stat cards: bg-bone rounded-2xl
// Numbers: text-deep-forest font-extrabold text-4xl
// Labels: text-mist font-medium

### components/landing/FeaturesSection.tsx
// ASSIGNED TO: Hamid
// bg-bone. 4 feature cards: bg-parchment rounded-2xl (background shift, no border)
// Icon container: bg-sapling-green rounded-xl p-3
// Title: text-charcoal font-bold, Description: text-mist

### components/landing/CtaSection.tsx
// ASSIGNED TO: Hamid
// bg-deep-forest. Center content. text-parchment.
// Button: bg-sapling-green text-charcoal rounded-full px-8 py-4

---

## AUTH COMPONENTS

### components/auth/LoginForm.tsx
// ASSIGNED TO: Hamid
// Form card: bg-bone rounded-2xl p-8 (no border, no shadow)
interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading: boolean;
}

### components/auth/RegisterForm.tsx
// ASSIGNED TO: Hamid
interface RegisterFormProps {
  onSubmit: (data: {
    name: string; email: string;
    password: string; confirmPassword: string;
  }) => void;
  isLoading: boolean;
}

### components/auth/ResetPasswordForm.tsx
// ASSIGNED TO: Hamid
interface ResetPasswordFormProps {
  onSubmit: (data: { email: string }) => void;
  isLoading: boolean;
}

---

## PUBLIC PAGE COMPONENTS (SPRINT INI)

### components/pages/about/AboutHero.tsx
// ASSIGNED TO: Raja
// bg-deep-forest full-width. Headline: text-parchment font-extrabold.
// Subtitle: text-parchment/70. Breadcrumb: Home / About.
// No props — static content.

### components/pages/about/MissionVisionSection.tsx
// ASSIGNED TO: Raja
// bg-bone. Two side-by-side cards: bg-parchment rounded-2xl p-6.
// Left card: Misi — icon + paragraf. Right card: Visi — icon + paragraf.
// No divider between cards — gap spacing only (no-line).

### components/pages/about/TeamSection.tsx
// ASSIGNED TO: Raja
// bg-parchment. Section title "Tim Kami". Grid 2x2 atau 4 kolom.
// Each member card: bg-bone rounded-2xl p-5, Avatar large, nama, role badge.
interface TeamSectionProps {
  members?: Array<{ name: string; role: string; photoUrl?: string }>;
}

### components/pages/about/ImpactSection.tsx
// ASSIGNED TO: Raja
// bg-bone. 4 angka besar statistik dampak: bg-parchment rounded-2xl card.
// Angka: text-deep-forest font-extrabold text-5xl. Label: text-mist.
// No props — static data.

### components/pages/services/ServicesHero.tsx
// ASSIGNED TO: Rifqi
// bg-deep-forest. Headline "Layanan Kami". Subtitle ringkas.
// Breadcrumb: Home / Services.

### components/pages/services/ServiceCard.tsx
// ASSIGNED TO: Rifqi
// bg-bone rounded-2xl p-6. No border.
// Icon container: bg-sapling-green rounded-xl p-3.
// Title: text-charcoal font-bold. Description: text-mist.
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

### components/pages/contact/ContactHero.tsx
// ASSIGNED TO: Alfin
// bg-deep-forest. Headline "Hubungi Kami". Subtitle.

### components/pages/contact/ContactForm.tsx
// ASSIGNED TO: Alfin
// "use client". bg-bone rounded-2xl p-8.
// Fields: Nama (Input), Email (Input), Subjek (Input), Pesan (Textarea 5 rows).
// Submit: Button variant="primary" fullWidth label="Kirim Pesan".
interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; subject: string; message: string }) => void;
  isLoading: boolean;
}

### components/pages/contact/ContactInfoCard.tsx
// ASSIGNED TO: Alfin
// bg-bone rounded-2xl p-6. 3 baris info: Email, Telepon, Alamat.
// Each row: icon (lucide) + text. Icon: text-veridian-leaf.
// Map placeholder: bg-parchment rounded-2xl h-48 flex items-center justify-center.
// No props — static content.

### components/pages/blog/BlogHero.tsx
// ASSIGNED TO: Hamid
// bg-deep-forest. Headline "Blog EcoTrack". Subtitle.
// Search bar di bawah headline: bg-parchment rounded-full px-5 py-3.

### components/pages/blog/BlogFeaturedPost.tsx
// ASSIGNED TO: Hamid
// Large card: bg-bone rounded-2xl overflow-hidden.
// Thumbnail left (60%), content right (40%) — atau stacked di mobile.
// Category badge: bg-sapling-green/30 text-deep-forest.
// Title: font-bold text-2xl. Excerpt: text-mist.
interface BlogFeaturedPostProps {
  post: {
    title: string; slug: string; thumbnailUrl: string;
    category: string; excerpt: string; publishedAt: string;
  };
}

### components/pages/blog/BlogCard.tsx
// ASSIGNED TO: Hamid
// bg-bone rounded-2xl. Image top rounded-t-2xl. Content p-5.
// Category badge + judul + excerpt (2 baris) + tanggal.
// Sama dengan ArticleCard tapi untuk konteks blog.
interface BlogCardProps {
  post: {
    title: string; slug: string; thumbnailUrl: string;
    category: string; excerpt: string; publishedAt: string;
  };
  onClick: () => void;
}

### components/pages/blog/BlogGrid.tsx
// ASSIGNED TO: Hamid
// bg-parchment. grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.
interface BlogGridProps {
  posts: Array<{ title: string; slug: string; thumbnailUrl: string; category: string; excerpt: string; publishedAt: string }>;
}

### components/pages/blog/BlogFilterTabs.tsx
// ASSIGNED TO: Hamid
// Pill tabs. Active: bg-deep-forest text-parchment. Inactive: bg-bone text-charcoal.
// Categories: Semua, Tips & Trik, Berita, Event, Studi Kasus.
interface BlogFilterTabsProps {
  active: string;
  onChange: (val: string) => void;
}

### components/pages/blog/BlogDetail.tsx
// ASSIGNED TO: Hamid
// Hero image rounded-2xl. Title font-sans font-bold.
// Body: font-serif text-charcoal (Merriweather). leading-relaxed.
// Share buttons bawah: sosial media pills (bg-bone rounded-full).
interface BlogDetailProps {
  post: {
    title: string; content: string; thumbnailUrl: string;
    category: string; publishedAt: string; authorName: string;
    authorPhotoUrl?: string;
  };
}

### components/pages/blog/BlogAuthorCard.tsx
// ASSIGNED TO: Hamid
// bg-bone rounded-2xl p-5. Avatar kiri + nama + bio kanan.
// "Ditulis oleh" label: text-mist text-sm.
interface BlogAuthorCardProps {
  name: string; bio?: string; photoUrl?: string;
}

---

## DASHBOARD COMPONENTS

### components/dashboard/SummaryCard.tsx
// ASSIGNED TO: Alfin
// bg-bone rounded-2xl p-5. Icon in bg-sapling-green/30 circle.
// Value: text-deep-forest font-extrabold text-3xl
// Title: text-mist font-medium text-sm
interface SummaryCardProps {
  title: string; value: string | number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'faint';
  trend?: string;
}

### components/dashboard/RecentActivityList.tsx
// ASSIGNED TO: Alfin
// List items: bg-bone rounded-xl p-4 each. No dividers (no-line — spacing only).
interface RecentActivityListProps { activities: WasteReport[]; }

### components/dashboard/QuickActionButtons.tsx
// ASSIGNED TO: Alfin
// 3 pill buttons: [+ Laporkan Sampah] bg-deep-forest,
//   [Tukar Poin] bg-veridian-leaf, [Lihat Edukasi] bg-sapling-green text-charcoal

### components/dashboard/NotificationBanner.tsx
// ASSIGNED TO: Alfin
// bg-sapling-green rounded-2xl p-4. text-charcoal. Dismiss X button.
interface NotificationBannerProps {
  message: string; type: 'success' | 'info';
  onDismiss: () => void;
}

---

## REPORT COMPONENTS

### components/reports/ReportForm.tsx
// ASSIGNED TO: Alfin
// Outer bg-parchment. Form sections wrapped in bg-bone rounded-2xl blocks.
interface ReportFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

### components/reports/PhotoUploader.tsx
// ASSIGNED TO: Alfin
// Drop zone: bg-bone rounded-2xl border-2 border-dashed border-mist
// (exception to no-line: dashed border for upload affordance)
// Hover: border-veridian-leaf bg-sapling-green/10
interface PhotoUploaderProps {
  onUpload: (file: File) => void;
  preview?: string;
  maxSizeMB?: number;
}

### components/reports/WasteTypeSelector.tsx
// ASSIGNED TO: Alfin
// Radio cards: bg-bone rounded-2xl p-4. Selected: bg-sapling-green/30 ring-2 ring-deep-forest
interface WasteTypeSelectorProps {
  value: string;
  onChange: (val: string) => void;
}

### components/reports/LocationPicker.tsx
// ASSIGNED TO: Alfin
interface LocationPickerProps {
  value: string;
  onChange: (val: string) => void;
  onGetGPS: () => void;
  isGPSLoading: boolean;
}

### components/reports/ReportCard.tsx
// ASSIGNED TO: Alfin
// bg-bone rounded-2xl p-4. No border. Thumbnail on left, info right.
interface ReportCardProps { report: WasteReport; onClick: () => void; }

### components/reports/ReportStatusBadge.tsx
// ASSIGNED TO: Alfin
// Wraps Badge component. Maps status to variant + Indonesian label.
// PENDING → 'info' "Menunggu Review"
// APPROVED → 'success' "Divalidasi"
// REJECTED → 'error' "Ditolak"
interface ReportStatusBadgeProps {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

### components/reports/ReportDetailModal.tsx
// ASSIGNED TO: Alfin
interface ReportDetailModalProps {
  report?: WasteReport; isOpen: boolean; onClose: () => void;
}

---

## POINTS & REWARDS COMPONENTS

### components/points/PointsBalanceCard.tsx
// ASSIGNED TO: Alfin
// bg-deep-forest rounded-2xl p-8. Points: text-sapling-green font-extrabold text-5xl
// Label: text-parchment/70
interface PointsBalanceCardProps { total_points: number; }

### components/points/PointsTransactionList.tsx
// ASSIGNED TO: Alfin
// Items: bg-bone rounded-xl p-4. No dividers. CREDIT: text-veridian-leaf. DEBIT: text-feedback-error
interface PointsTransactionListProps { transactions: PointTransaction[]; }

### components/points/PointsProgressBar.tsx
// ASSIGNED TO: Alfin
// Label above, ProgressBar below. bg-bone card wrap.
interface PointsProgressBarProps {
  currentPoints: number; nextRewardPoints: number; nextRewardName: string;
}

### components/points/RewardCard.tsx
// ASSIGNED TO: Alfin
// bg-bone rounded-2xl. Image top (rounded-t-2xl). Content p-4.
// "Bisa Ditukar": bg-sapling-green text-deep-forest badge
// "Poin Kurang": bg-bone text-mist badge
interface RewardCardProps {
  reward: Reward; userPoints: number; onClick: () => void;
}

### components/points/RewardCatalogGrid.tsx
// ASSIGNED TO: Alfin
// bg-parchment. Filter Tabs top. Grid below: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
interface RewardCatalogGridProps {
  rewards: Reward[]; userPoints: number;
  activeFilter: string; onFilterChange: (f: string) => void;
}

### components/points/RedeemConfirmModal.tsx
// ASSIGNED TO: Alfin
// Modal panel bg-parchment. Summary bg-bone rounded-xl inside.
interface RedeemConfirmModalProps {
  reward?: Reward; isOpen: boolean; onClose: () => void;
  onConfirm: (deliveryAddress: string) => void; isLoading: boolean;
}

### components/points/RedemptionHistoryList.tsx
// ASSIGNED TO: Alfin
interface RedemptionHistoryListProps { redemptions: RewardRedemption[]; }

---

## NOTIFICATION COMPONENTS

### components/notifications/NotificationItem.tsx
// ASSIGNED TO: Alfin
// Unread: bg-sapling-green/20. Read: bg-bone. rounded-xl p-4. No border.
interface NotificationItemProps {
  notification: Notification; onClick: () => void;
}

### components/notifications/NotificationList.tsx
// ASSIGNED TO: Alfin
interface NotificationListProps {
  notifications: Notification[]; onMarkAllRead: () => void;
}

### components/notifications/NotificationBell.tsx
// ASSIGNED TO: Alfin
// Bell icon (lucide-react). Badge: bg-feedback-error text-white rounded-full.
interface NotificationBellProps { count: number; onClick: () => void; }

---

## MAP COMPONENTS

### components/map/InteractiveMap.tsx
// ASSIGNED TO: Raja
// "use client" + dynamic import ssr:false
// Leaflet map. Tile layer: OpenStreetMap.
// No shadow container — just rounded-2xl overflow-hidden
interface InteractiveMapProps {
  center: [number, number]; zoom?: number;
  markers?: Array<{ position: [number, number]; type: string; popupContent?: React.ReactNode }>;
  onMapClick?: (coords: [number, number]) => void;
  height?: string;
}

### components/map/MapMarker.tsx
// ASSIGNED TO: Raja
// Custom Leaflet icon based on type:
//   trash-spot: bg-feedback-error icon
//   disposal: bg-deep-forest icon
//   selected: bg-sapling-green icon
interface MapMarkerProps {
  position: [number, number];
  type: 'trash-spot' | 'disposal' | 'selected';
  popupContent?: React.ReactNode;
}

### components/map/TrashSpotPopup.tsx
// ASSIGNED TO: Raja
// Popup card: bg-parchment rounded-xl p-3 (no border)
interface TrashSpotPopupProps { spot: TrashSpotReport; }

### components/map/DisposalLocationPopup.tsx
// ASSIGNED TO: Raja
interface DisposalLocationPopupProps { location: DisposalLocation; }

### components/map/TrashSpotForm.tsx
// ASSIGNED TO: Raja
// bg-bone rounded-2xl p-6. Sections divided by spacing, not lines.
interface TrashSpotFormProps {
  selectedCoords?: [number, number];
  onSubmit: (data: unknown) => void;
  isLoading: boolean;
}

### components/map/TrashSpotCard.tsx
// ASSIGNED TO: Raja
// bg-bone rounded-xl p-4. Severity badge + status badge.
interface TrashSpotCardProps { spot: TrashSpotReport; onClick: () => void; }

### components/map/LocationSidebar.tsx
// ASSIGNED TO: Raja
// bg-parchment. Scrollable list of bg-bone rounded-xl cards.
interface LocationSidebarProps {
  locations: DisposalLocation[];
  onSelect: (loc: DisposalLocation) => void;
}

### components/map/MapFilterBar.tsx
// ASSIGNED TO: Raja
// Pill filter buttons: active=bg-deep-forest text-parchment, inactive=bg-bone text-charcoal
interface MapFilterBarProps {
  options: { label: string; value: string }[];
  active: string;
  onChange: (val: string) => void;
}

---

## EDUCATION COMPONENTS

### components/education/ArticleCard.tsx
// ASSIGNED TO: Raja
// bg-bone rounded-2xl. Image top rounded-t-2xl. Content p-5.
// Category badge: bg-sapling-green/30 text-deep-forest rounded-full
interface ArticleCardProps { article: EducationArticle; onClick: () => void; }

### components/education/ArticleGrid.tsx
// ASSIGNED TO: Raja
// bg-parchment. grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
interface ArticleGridProps { articles: EducationArticle[]; }

### components/education/ArticleSearchBar.tsx
// ASSIGNED TO: Raja
// bg-bone rounded-full px-5 py-3. Icon left. No border (no-line).
// Focus: ring-2 ring-deep-forest
interface ArticleSearchBarProps {
  value: string; onChange: (v: string) => void; placeholder?: string;
}

### components/education/CategoryFilterTabs.tsx
// ASSIGNED TO: Raja
// Pill tabs. Active: bg-deep-forest text-parchment. Inactive: bg-bone text-charcoal.
interface CategoryFilterTabsProps {
  categories: string[]; active: string; onChange: (v: string) => void;
}

### components/education/ArticleDetail.tsx
// ASSIGNED TO: Raja
// Hero image full width rounded-2xl. Title font-sans font-bold.
// Body content: font-serif (Merriweather) for article reading experience.
// Prev/Next navigation: bg-bone rounded-xl p-4
interface ArticleDetailProps { article: EducationArticle; }

### components/education/RelatedArticles.tsx
// ASSIGNED TO: Raja
// Horizontal flex or 3-col grid of ArticleCard
interface RelatedArticlesProps {
  articles: EducationArticle[]; currentSlug: string;
}

---

## ADMIN COMPONENTS

### components/admin/AdminStatsCard.tsx
// ASSIGNED TO: Rifqi
// bg-bone rounded-2xl p-5. Same structure as SummaryCard but for admin context.
interface AdminStatsCardProps {
  title: string; value: number | string;
  icon: React.ReactNode; color?: 'primary' | 'secondary' | 'faint';
  change?: string;
}

### components/admin/AdminActivityChart.tsx
// ASSIGNED TO: Rifqi
// Recharts LineChart or BarChart stub. bg-bone rounded-2xl p-4.
// Colors: deep-forest for reports line, veridian-leaf for points line.
interface AdminActivityChartProps {
  data: Array<{ date: string; reports: number; points: number }>;
}

### components/admin/ReportValidationTable.tsx
// ASSIGNED TO: Rifqi
// Table: no borders. Row bg alternates parchment/bone (no-line row separation).
// Header: bg-bone font-semibold text-charcoal
interface ReportValidationTableProps {
  reports: WasteReport[];
  onApprove: (id: string, points: number) => void;
  onReject: (id: string, reason: string) => void;
  activeFilter: string;
  onFilterChange: (f: string) => void;
}

### components/admin/ReportDetailPanel.tsx
// ASSIGNED TO: Rifqi
// Slide-in panel from right. bg-parchment. Inner card bg-bone.
interface ReportDetailPanelProps {
  report?: WasteReport; isOpen: boolean; onClose: () => void;
}

### components/admin/ValidationActionButtons.tsx
// ASSIGNED TO: Rifqi
interface ValidationActionButtonsProps {
  reportId: string;
  onApprove: () => void;
  onReject: () => void;
}
// [Setujui] bg-deep-forest text-parchment rounded-full
// [Tolak] bg-feedback-error/10 text-feedback-error rounded-full

### components/admin/RewardManagementTable.tsx
// ASSIGNED TO: Rifqi
interface RewardManagementTableProps {
  rewards: Reward[];
  onEdit: (r: Reward) => void;
  onToggle: (id: string) => void;
}

### components/admin/RewardFormModal.tsx
// ASSIGNED TO: Rifqi
interface RewardFormModalProps {
  reward?: Reward; isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Reward>) => void;
}

### components/admin/RedemptionManagementTable.tsx
// ASSIGNED TO: Rifqi
interface RedemptionManagementTableProps {
  redemptions: RewardRedemption[];
  onUpdateStatus: (id: string, status: string) => void;
}

### components/admin/ArticleManagementTable.tsx
// ASSIGNED TO: Rifqi
interface ArticleManagementTableProps {
  articles: EducationArticle[];
  onEdit: (a: EducationArticle) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

### components/admin/ArticleEditor.tsx
// ASSIGNED TO: Rifqi
// TipTap WYSIWYG stub. bg-bone rounded-2xl p-5.
// Toolbar: pill buttons bg-parchment. Editor area: bg-parchment rounded-xl p-4.
interface ArticleEditorProps {
  article?: EducationArticle;
  onSave: (data: Partial<EducationArticle>) => void;
  isLoading: boolean;
}

### components/admin/TrashSpotManagementTable.tsx
// ASSIGNED TO: Rifqi
interface TrashSpotManagementTableProps {
  spots: TrashSpotReport[];
  onUpdateStatus: (id: string, status: string) => void;
  onAssign: (id: string, petugasId: string) => void;
}

### components/admin/DisposalLocationTable.tsx
// ASSIGNED TO: Rifqi
interface DisposalLocationTableProps {
  locations: DisposalLocation[];
  onEdit: (l: DisposalLocation) => void;
  onToggle: (id: string) => void;
}

### components/admin/DisposalLocationFormModal.tsx
// ASSIGNED TO: Rifqi
interface DisposalLocationFormModalProps {
  location?: DisposalLocation; isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<DisposalLocation>) => void;
}

### components/admin/UserManagementTable.tsx
// ASSIGNED TO: Rifqi
interface UserManagementTableProps {
  users: User[];
  onChangeRole: (id: string, role: string) => void;
  onSuspend: (id: string) => void;
}

---

## PAGE STUBS

For each page, import components and compose layout. Minimal real markup.

### app/(public)/page.tsx            // ASSIGNED TO: Hamid   // Route: /  🟢 SPRINT INI
// Compose: HeroSection, HowItWorksSection, StatsSection, FeaturesSection, CtaSection

### app/(public)/about/page.tsx      // ASSIGNED TO: Raja    // Route: /about  🟢 SPRINT INI
// Compose: AboutHero, MissionVisionSection, TeamSection, ImpactSection, CtaSection

### app/(public)/services/page.tsx   // ASSIGNED TO: Rifqi   // Route: /services  🟢 SPRINT INI
// Compose: ServicesHero, grid of 6x ServiceCard, CtaSection

### app/(public)/contact/page.tsx    // ASSIGNED TO: Alfin   // Route: /contact  🟢 SPRINT INI
// Compose: ContactHero, two-column layout (ContactForm kiri + ContactInfoCard kanan)

### app/(public)/blog/page.tsx       // ASSIGNED TO: Hamid   // Route: /blog  🟢 SPRINT INI
// Compose: BlogHero (with search), BlogFilterTabs, BlogFeaturedPost, BlogGrid

### app/(public)/blog/[slug]/page.tsx // ASSIGNED TO: Hamid  // Route: /blog/:slug  🟢 SPRINT INI
// Compose: BlogDetail, BlogAuthorCard, RelatedArticles (reuse dari education)

### app/(public)/auth/login/page.tsx // ASSIGNED TO: Hamid   // Route: /auth/login  🟢 SPRINT INI
// Compose: LoginForm centered in a two-column layout (form left, illustration right)

### app/(public)/auth/register/page.tsx // ASSIGNED TO: Hamid // Route: /auth/register  🟢 SPRINT INI
// Compose: RegisterForm centered layout

### app/(public)/education/page.tsx  // ASSIGNED TO: Raja    // Route: /education  ⏳ NEXT SPRINT
### app/(public)/education/[slug]/page.tsx // ASSIGNED TO: Raja // Route: /education/:slug  ⏳ NEXT SPRINT

### app/(user)/dashboard/page.tsx       // ASSIGNED TO: Alfin  // Route: /dashboard  ⏳ NEXT SPRINT
### app/(user)/reports/page.tsx         // ASSIGNED TO: Alfin  // Route: /reports  ⏳ NEXT SPRINT
### app/(user)/reports/create/page.tsx  // ASSIGNED TO: Alfin  // Route: /reports/create  ⏳ NEXT SPRINT
### app/(user)/points/page.tsx          // ASSIGNED TO: Alfin  // Route: /points  ⏳ NEXT SPRINT
### app/(user)/rewards/page.tsx         // ASSIGNED TO: Alfin  // Route: /rewards  ⏳ NEXT SPRINT
### app/(user)/rewards/history/page.tsx // ASSIGNED TO: Alfin  // Route: /rewards/history  ⏳ NEXT SPRINT
### app/(user)/rewards/redeem/[id]/page.tsx // ASSIGNED TO: Alfin // Route: /rewards/redeem/:id  ⏳ NEXT SPRINT
### app/(user)/profile/page.tsx         // ASSIGNED TO: Alfin  // Route: /profile  ⏳ NEXT SPRINT
### app/(user)/notifications/page.tsx   // ASSIGNED TO: Alfin  // Route: /notifications  ⏳ NEXT SPRINT

### app/(map)/trash-spots/page.tsx         // ASSIGNED TO: Raja  // Route: /trash-spots  ⏳ NEXT SPRINT
### app/(map)/trash-spots/create/page.tsx  // ASSIGNED TO: Raja  // Route: /trash-spots/create  ⏳ NEXT SPRINT
### app/(map)/disposal-locations/page.tsx  // ASSIGNED TO: Raja  // Route: /disposal-locations  ⏳ NEXT SPRINT

### app/(admin)/admin/page.tsx                   // ASSIGNED TO: Rifqi // Route: /admin  🟢 SPRINT INI
// Compose: AdminStatsCard x4, AdminActivityChart, ReportValidationTable (preview 5 rows)

### app/(admin)/admin/reports/page.tsx           // ASSIGNED TO: Rifqi // Route: /admin/reports  🟢 SPRINT INI
// Compose: ReportValidationTable full + ReportDetailPanel

### app/(admin)/admin/rewards/page.tsx           // ASSIGNED TO: Rifqi // Route: /admin/rewards  🟢 SPRINT INI
// Compose: RewardManagementTable + RedemptionManagementTable + RewardFormModal

### app/(admin)/admin/education/page.tsx         // ASSIGNED TO: Rifqi // Route: /admin/education  🟢 SPRINT INI
// Compose: ArticleManagementTable + ArticleEditor

### app/(admin)/admin/trash-spots/page.tsx       // ASSIGNED TO: Rifqi // Route: /admin/trash-spots  🟢 SPRINT INI
// Compose: TrashSpotManagementTable

### app/(admin)/admin/disposal-locations/page.tsx // ASSIGNED TO: Rifqi // Route: /admin/disposal-locations  🟢 SPRINT INI
// Compose: DisposalLocationTable + DisposalLocationFormModal

### app/(admin)/admin/users/page.tsx             // ASSIGNED TO: Rifqi // Route: /admin/users  🟢 SPRINT INI
// Compose: UserManagementTable

---

## package.json

{
  "dependencies": {
    "next": "14",
    "react": "^18",
    "react-dom": "^18",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "recharts": "^2.12.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.0",
    "axios": "^1.6.0",
    "@tiptap/react": "^2.3.0",
    "@tiptap/starter-kit": "^2.3.0",
    "lucide-react": "^0.378.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "date-fns": "^3.6.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/react": "^18",
    "@types/node": "^20",
    "@types/leaflet": "^1.9.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8",
    "autoprefixer": "^10"
  }
}

## Critical Rules — READ CAREFULLY:
1. App Router ONLY — no pages/ directory
2. Leaflet: MUST use "use client" AND next/dynamic with { ssr: false }
3. Interactive components: "use client" directive at top
4. Server components: no directive (default)
5. Colors: ONLY Tailwind config tokens (deep-forest, veridian-leaf, sapling-green,
   parchment, bone, charcoal, mist) — ZERO hardcoded hex strings in components
6. NO border-gray-*, border-slate-*, divide-* for layout (no-line philosophy)
7. Named exports only
8. Props interface declared in same file as component
9. cn() from lib/utils for all conditional classes
10. Font class font-sans everywhere → resolves to Plus Jakarta Sans
11. font-serif only in ArticleDetail content body → resolves to Merriweather
12. Every file: // ASSIGNED TO: [Name] line 1, // TODO: Implement UI in return

Output EVERY file as a separate code block. Title = full relative path. Do not skip any file.
```

---

## 📋 Catatan untuk Tim

### Git Branch Convention
```
# Sprint ini — Hamid (Landing Page + Setup)
feature/hamid/setup-core         ← tailwind.config, globals.css, types/index.ts, lib/utils.ts
feature/hamid/ui-components      ← semua components/ui/
feature/hamid/navbar-footer      ← Navbar, Footer, app/(public)/layout.tsx
feature/hamid/landing-page       ← components/landing/ + app/(public)/page.tsx

# Sprint ini — Raja (About Page)
feature/raja/about-page          ← components/pages/about/ + app/(public)/about/page.tsx

# Sprint ini — Alfin (Contact Page)
feature/alfin/contact-page       ← components/pages/contact/ + app/(public)/contact/page.tsx

# Sprint ini — Rifqi (Services Page)
feature/rifqi/services-page      ← components/pages/services/ + app/(public)/services/page.tsx

# Sprint berikutnya — jangan buat branch ini dulu
feature/hamid/blog-pages
feature/hamid/auth-pages
feature/alfin/dashboard
feature/alfin/reports
feature/raja/education
feature/raja/map-feature
feature/rifqi/admin-panel
```

### Urutan Pengerjaan yang Disarankan

```
Hari 1 — BLOCKER (Raja, Alfin, Rifqi wajib tunggu ini selesai)
  Hamid  → feature/hamid/setup-core
           Push: tailwind.config.ts, globals.css, types/index.ts, lib/utils.ts
           ──────────────────────────────────────────────────────────────────
           Hamid  → feature/hamid/ui-components
           Push: Button, Input, Textarea, Badge, Card, Modal, Avatar, dll.
           ⚠️ Setelah ini merge ke dev → Raja, Alfin, Rifqi bisa pull & mulai

Hari 1-2
  Hamid  → feature/hamid/navbar-footer
           Navbar.tsx, Footer.tsx, app/(public)/layout.tsx
  Raja   → riset + susun konten /about (teks misi, visi, profil tim, angka dampak)
  Alfin  → riset + susun konten /contact (info kontak, struktur form)
  Rifqi  → riset + susun konten /services (daftar 6 layanan, ikon, deskripsi)

Hari 2-3
  Hamid  → feature/hamid/landing-page
           HeroSection, HowItWorks, Stats, Features, CtaSection
           app/(public)/page.tsx
  Raja   → feature/raja/about-page
           AboutHero → MissionVision → TeamSection → ImpactSection
  Alfin  → feature/alfin/contact-page
           ContactHero → ContactInfoCard → ContactForm
  Rifqi  → feature/rifqi/services-page
           ServicesHero → 6x ServiceCard → CtaSection

Hari 3-4
  Semua  → polish halaman masing-masing
           Cek: no-line philosophy, token warna (bukan hex), font-sans, responsive

Hari 5
  Semua  → PR ke dev → 1 reviewer per PR → merge → demo sprint
           Buka 4 halaman di browser: /, /about, /contact, /services
```

### Commit Convention (Conventional Commits)
```
chore(setup): configure tailwind with Living Archive design tokens  [Hamid]
feat(ui): add Button component with pill shape and variants         [Hamid]
feat(layout): add Navbar and Footer with Deep Forest background     [Hamid]
feat(landing): implement HeroSection with Sapling Green CTA         [Hamid]
feat(landing): add StatsSection and FeaturesSection                 [Hamid]
feat(about): add AboutHero with Deep Forest background              [Raja]
feat(about): add MissionVisionSection with bone/parchment layout    [Raja]
feat(contact): add ContactForm with Input and Textarea components   [Alfin]
feat(contact): add ContactInfoCard with location info               [Alfin]
feat(services): add ServicesHero and ServiceCard grid               [Rifqi]
style(global): enforce no-line philosophy across all components     [Semua]
```

### ⚠️ Hal Penting untuk Semua Anggota
- **Wajib** tunggu Hamid push dan merge `ui-components` sebelum mulai coding komponen halaman
- **Jangan** pakai hex hardcode — selalu pakai token Tailwind (`text-deep-forest`, `bg-bone`, dll.)
- **Jangan** pakai `border-gray-*`, `border-slate-*`, `divide-*` untuk pemisah layout
- Gunakan `bg-parchment` vs `bg-bone` sebagai cara memisahkan section (no-line philosophy)
- Semua form field pakai `Input.tsx` / `Textarea.tsx` dari `components/ui/`
- Komponen interaktif (ContactForm, dll.) wajib `"use client"` di baris pertama
