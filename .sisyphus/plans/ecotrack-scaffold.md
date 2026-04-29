# EcoTrack — Next.js 14 Scaffold + Stub Generation Plan

## TL;DR
> **Summary**: Create an EcoTrack repo from an empty workspace: Next.js 14 App Router + Tailwind + TypeScript + Living Archive design tokens, then generate **stub-only** pages/components matching the provided folder tree and conventions.
> **Deliverables**: Next/Tailwind/TS configs, globals.css + tokens, `types/` interfaces, `lib/` + `hooks/` stubs, all `components/` stubs, all `app/` route stubs.
> **Effort**: Large
> **Parallel**: YES — 4 waves + final verification
> **Critical Path**: Foundations (Wave 1) → Stub generation by domain (Waves 2–4) → Build/typecheck verification

> **[DECISION NEEDED] Next.js export rule conflict**: The brief says “Named exports only”, but Next.js App Router **requires `export default`** for `page.tsx` and `layout.tsx` modules to be routable/buildable. This plan assumes: **components use named exports only; app pages/layouts use a named export + a default export alias** (minimal violation confined to Next-required files). If you want strict named-only everywhere, build/route verification will fail.

## Context
### Original Request
- Use the provided EcoTrack brief to scaffold the full project structure and create stub files for every listed component and page.
- Enforce “The Living Archive — Verdant Core” tokens + typography + **No-Line** philosophy.
- Enforce strict file conventions (named exports, props interfaces, placeholder markup, `data-component`, assignment comments, etc.).

### Interview Summary
- Workspace is empty → no overwrite concerns.
- Scaffold should **match the full folder tree** (including `lib/api.ts`, `lib/auth.ts`, `lib/validators.ts`, `hooks/*`, `next.config.ts`, etc.).
- Tooling baseline: **npm + Node 20 LTS**.

### Metis Review (gaps addressed)
- Freeze toolchain decisions (npm + Node 20) and explicitly list every file to create.
- Do **not** add extra tooling (eslint/prettier/tests/CI) unless requested; verification via install/typecheck/build/serve/curl only.
- Define Leaflet SSR-safe pattern and where Leaflet CSS is imported.

## Work Objectives
### Core Objective
Produce a runnable Next.js 14 App Router project whose entire UI is stubbed but compiles, typechecks, and builds; all routes return HTTP 200 (or explicitly documented redirects).

### Deliverables
- `package.json` (deps from brief) + minimal scripts (`dev`, `build`, `start`, `typecheck`)
- TypeScript plumbing: `tsconfig.json`, `next-env.d.ts`
- Tailwind plumbing: `tailwind.config.ts`, `postcss.config.js`, `styles/globals.css`
- Next config: `next.config.ts`
- Stubs: all `app/`, `components/`, `lib/`, `hooks/`, `types/` files per folder tree

### Definition of Done (agent-verifiable)
- [ ] Node version is Node 20.x (`node -v` starts with `v20.`) OR `package.json.engines.node` is `>=20` and environment satisfies it.
- [ ] `npm install` exits 0.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run build` exits 0.
- [ ] `npm run start` (background) + `curl -I http://localhost:3000/` returns 200.
- [ ] `curl -I` for all declared routes returns 200 (see “Route Verification List”).
- [ ] If git commits are desired: `git status` works and commits exist per task notes (see Task 0).

### Must Have
- Strict adherence to:
  - App Router only
  - Living Archive Tailwind tokens
  - No-Line philosophy constraints
  - File-level conventions (assignment header, export rules, `data-component`, etc.)
  - Leaflet SSR-safe dynamic import and client boundaries

### Must NOT Have (guardrails)
- No real logic: no API calls, no auth flows, no DB, no data fetching beyond placeholders.
- No styling via hardcoded hex strings in **components/pages** (Tailwind config may use hex as token source).
- No forbidden layout borders (`border-gray-*`, `border-slate-*`, `divide-*`) except explicitly allowed exceptions.
- No `export default` in **components/**, **lib/**, **hooks/**, **types/**.
- `app/**/page.tsx` and `app/**/layout.tsx` are allowed to use `export default` (Next.js requirement).
- Do not introduce eslint/prettier/tests/CI unless the user explicitly requests.

## Verification Strategy
> ZERO HUMAN INTERVENTION — all verification is agent-executed.
- Test decision: **none** (not requested; no existing tooling).
- Primary gates: install → typecheck → build → serve → curl routes.
- Evidence directory: `.sisyphus/evidence/`.

## Export Policy (authoritative)
- `components/**`, `lib/**`, `hooks/**`, `types/**`: **named exports only** (no `export default`).
- `app/**/page.tsx` and `app/**/layout.tsx`: must include `export default` (Next.js requirement). Policy: **also** expose a named export (e.g., `export function DashboardPage() {}` then `export default DashboardPage`).

## Execution Strategy
### Parallel Execution Waves
Wave 1 (Foundations): toolchain + configs + tokens + core types/utils + base layouts.

Wave 2 (Hamid domain): `components/ui`, `components/layout`, `components/landing`, `components/auth`, public/auth pages.

Wave 3 (Alfin domain): user layouts + dashboard/reports/points/rewards/notifications components + user pages.

Wave 4 (Raja + Rifqi domains): map + education components/pages + admin components/pages.

### Dependency Matrix (high level)
- Wave 1 blocks Waves 2–4 (types, utils, Tailwind tokens, root layout).
- Waves 2–4 can run in parallel once Wave 1 completes.

### Agent Dispatch Summary
- Wave 1: unspecified-high (foundation scaffolding)
- Wave 2: visual-engineering (UI stubs + Tailwind token usage)
- Wave 3: visual-engineering
- Wave 4: visual-engineering

## Route Verification List
> Used in Final Verification Wave curl checks.
- /
- /auth/login
- /auth/register
- /education
- /education/:slug (verify with a concrete slug like `/education/demo`)
- /dashboard
- /reports
- /reports/create
- /points
- /rewards
- /rewards/history
- /rewards/redeem/:id (verify with a concrete id like `/rewards/redeem/demo`)
- /profile
- /notifications
- /trash-spots
- /trash-spots/create
- /disposal-locations
- /admin
- /admin/reports
- /admin/rewards
- /admin/education
- /admin/trash-spots
- /admin/disposal-locations
- /admin/users

## File Inventory (authoritative)
> Executor MUST create exactly these (plus minimal required Next.js plumbing listed here).

### Root
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `next-env.d.ts`
- `postcss.config.js`
- `tailwind.config.ts`

### App Router
- `app/layout.tsx` (root layout; imports `styles/globals.css`)
- `app/(public)/layout.tsx`
- `app/(public)/page.tsx`
- `app/(public)/auth/login/page.tsx`
- `app/(public)/auth/register/page.tsx`
- `app/(public)/education/page.tsx`
- `app/(public)/education/[slug]/page.tsx`
- `app/(user)/layout.tsx`
- `app/(user)/dashboard/page.tsx`
- `app/(user)/reports/page.tsx`
- `app/(user)/reports/create/page.tsx`
- `app/(user)/points/page.tsx`
- `app/(user)/rewards/page.tsx`
- `app/(user)/rewards/history/page.tsx`
- `app/(user)/rewards/redeem/[id]/page.tsx`
- `app/(user)/profile/page.tsx`
- `app/(user)/notifications/page.tsx`
- `app/(map)/layout.tsx` (imports Leaflet CSS)
- `app/(map)/trash-spots/page.tsx`
- `app/(map)/trash-spots/create/page.tsx`
- `app/(map)/disposal-locations/page.tsx`
- `app/(admin)/layout.tsx`
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/reports/page.tsx`
- `app/(admin)/admin/rewards/page.tsx`
- `app/(admin)/admin/education/page.tsx`
- `app/(admin)/admin/trash-spots/page.tsx`
- `app/(admin)/admin/disposal-locations/page.tsx`
- `app/(admin)/admin/users/page.tsx`

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
- `components/layout/Sidebar.tsx`
- `components/layout/UserLayout.tsx`
- `components/layout/AdminLayout.tsx`

- `components/landing/HeroSection.tsx`
- `components/landing/HowItWorksSection.tsx`
- `components/landing/StatsSection.tsx`
- `components/landing/FeaturesSection.tsx`
- `components/landing/CtaSection.tsx`

- `components/auth/LoginForm.tsx`
- `components/auth/RegisterForm.tsx`
- `components/auth/ResetPasswordForm.tsx`

- `components/dashboard/SummaryCard.tsx`
- `components/dashboard/RecentActivityList.tsx`
- `components/dashboard/QuickActionButtons.tsx`
- `components/dashboard/NotificationBanner.tsx`

- `components/reports/ReportForm.tsx`
- `components/reports/PhotoUploader.tsx`
- `components/reports/WasteTypeSelector.tsx`
- `components/reports/LocationPicker.tsx`
- `components/reports/ReportCard.tsx`
- `components/reports/ReportStatusBadge.tsx`
- `components/reports/ReportDetailModal.tsx`

- `components/points/PointsBalanceCard.tsx`
- `components/points/PointsTransactionList.tsx`
- `components/points/PointsProgressBar.tsx`
- `components/points/RewardCard.tsx`
- `components/points/RewardCatalogGrid.tsx`
- `components/points/RedeemConfirmModal.tsx`
- `components/points/RedemptionHistoryList.tsx`

- `components/notifications/NotificationItem.tsx`
- `components/notifications/NotificationList.tsx`
- `components/notifications/NotificationBell.tsx`

- `components/map/InteractiveMap.tsx`
- `components/map/MapMarker.tsx`
- `components/map/TrashSpotPopup.tsx`
- `components/map/DisposalLocationPopup.tsx`
- `components/map/TrashSpotForm.tsx`
- `components/map/TrashSpotCard.tsx`
- `components/map/LocationSidebar.tsx`
- `components/map/MapFilterBar.tsx`

- `components/education/ArticleCard.tsx`
- `components/education/ArticleGrid.tsx`
- `components/education/ArticleSearchBar.tsx`
- `components/education/CategoryFilterTabs.tsx`
- `components/education/ArticleDetail.tsx`
- `components/education/RelatedArticles.tsx`

- `components/admin/AdminStatsCard.tsx`
- `components/admin/AdminActivityChart.tsx`
- `components/admin/ReportValidationTable.tsx`
- `components/admin/ReportDetailPanel.tsx`
- `components/admin/ValidationActionButtons.tsx`
- `components/admin/RewardManagementTable.tsx`
- `components/admin/RewardFormModal.tsx`
- `components/admin/RedemptionManagementTable.tsx`
- `components/admin/ArticleManagementTable.tsx`
- `components/admin/ArticleEditor.tsx`
- `components/admin/TrashSpotManagementTable.tsx`
- `components/admin/DisposalLocationTable.tsx`
- `components/admin/DisposalLocationFormModal.tsx`
- `components/admin/UserManagementTable.tsx`

### Lib / Hooks / Types / Styles
- `lib/api.ts`
- `lib/auth.ts`
- `lib/validators.ts`
- `lib/utils.ts`
- `hooks/useAuth.ts`
- `hooks/useGeolocation.ts`
- `hooks/useNotifications.ts`
- `types/index.ts`
- `styles/globals.css`

## Embedded Brief (Authoritative Specs)
> This section makes the plan executable even if the original chat brief is not available to the executor.

### NPM Dependencies (exact)
```json
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
```

### Living Archive Tailwind Color Tokens (exact hex)
```ts
// tailwind.config.ts → theme.extend.colors
{
  'deep-forest':   '#154232',
  'veridian-leaf': '#3C6A09',
  'sapling-green': '#BCF1AE',
  'parchment':     '#F5F5F0',
  'bone':          '#EEEEE9',
  'charcoal':      '#1C1C1B',
  'mist':          '#A7A799',
  'feedback-success': '#3C6A09',
  'feedback-error':   '#CC3300',
  'feedback-link':    '#154232',

  // semantic aliases
  primary:    '#154232',
  secondary:  '#3C6A09',
  background: '#F5F5F0'
}
```

### CSS Custom Properties (globals.css :root)
```css
:root {
  --color-primary:   #154232;
  --color-secondary: #3C6A09;
  --color-faint:     #BCF1AE;
  --color-surface:   #F5F5F0;
  --color-container: #EEEEE9;
  --color-text:      #1C1C1B;
  --color-muted:     #A7A799;
  --color-error:     #CC3300;
}
```

### Domain Types (types/index.ts exact)
```ts
export interface User {
  id: string; name: string; email: string;
  role: 'user' | 'admin' | 'petugas';
  photoUrl?: string; totalPoints: number; createdAt: string;
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
  imageUrl: string; pointsRequired: number;
  stock: number; isActive: boolean; createdAt: string;
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
  contact: string; isActive: boolean; createdAt: string;
}

export interface Notification {
  id: string; userId: string;
  type: 'REPORT_VALIDATED' | 'POINTS_RECEIVED' | 'REDEEM_STATUS';
  message: string; isRead: boolean; createdAt: string;
}
```

### Component Prop Interfaces (exact)
> Executor MUST copy these interfaces verbatim into the corresponding files.

#### components/ui
```ts
// Button.tsx
export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'faint' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Input.tsx
export interface InputProps {
  name: string; label?: string; placeholder?: string;
  type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; disabled?: boolean;
}

// Textarea.tsx
export interface TextareaProps {
  name: string; label?: string; placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number; error?: string;
}

// Badge.tsx
export interface BadgeProps {
  label: string;
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

// Card.tsx
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  surface?: 'bone' | 'parchment';
}

// Modal.tsx
export interface ModalProps {
  isOpen: boolean; onClose: () => void;
  title?: string; children: React.ReactNode;
}

// Dropdown.tsx
export interface DropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

// Avatar.tsx
export interface AvatarProps {
  src?: string; name: string;
  size?: 'sm' | 'md' | 'lg';
}

// ProgressBar.tsx
export interface ProgressBarProps {
  value: number; // 0-100
  color?: 'primary' | 'secondary' | 'faint';
  label?: string;
}

// Spinner.tsx
export interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; }

// Toast.tsx
export interface ToastProps {
  message: string; type: 'success' | 'error' | 'info';
  onClose: () => void;
}

// Tabs.tsx
export interface TabsProps {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onChange: (val: string) => void;
}
```

#### components/layout
```ts
export interface NavbarProps {
  isAuthenticated: boolean;
  user?: import('../../types').User;
}

export interface SidebarProps {
  role: 'user' | 'admin';
  currentPath: string;
}

export interface UserLayoutProps { children: React.ReactNode; }
export interface AdminLayoutProps { children: React.ReactNode; }
```

#### components/auth
```ts
export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading: boolean;
}

export interface RegisterFormProps {
  onSubmit: (data: {
    name: string; email: string;
    password: string; confirmPassword: string;
  }) => void;
  isLoading: boolean;
}

export interface ResetPasswordFormProps {
  onSubmit: (data: { email: string }) => void;
  isLoading: boolean;
}
```

#### components/dashboard
```ts
export interface SummaryCardProps {
  title: string; value: string | number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'faint';
  trend?: string;
}

export interface RecentActivityListProps { activities: import('../../types').WasteReport[]; }

export interface NotificationBannerProps {
  message: string; type: 'success' | 'info';
  onDismiss: () => void;
}
```

#### components/reports
```ts
export interface ReportFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export interface PhotoUploaderProps {
  onUpload: (file: File) => void;
  preview?: string;
  maxSizeMB?: number;
}

export interface WasteTypeSelectorProps {
  value: string;
  onChange: (val: string) => void;
}

export interface LocationPickerProps {
  value: string;
  onChange: (val: string) => void;
  onGetGPS: () => void;
  isGPSLoading: boolean;
}

export interface ReportCardProps { report: import('../../types').WasteReport; onClick: () => void; }

export interface ReportStatusBadgeProps {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ReportDetailModalProps {
  report?: import('../../types').WasteReport; isOpen: boolean; onClose: () => void;
}
```

#### components/points
```ts
export interface PointsBalanceCardProps { totalPoints: number; }

export interface PointsTransactionListProps { transactions: import('../../types').PointTransaction[]; }

export interface PointsProgressBarProps {
  currentPoints: number; nextRewardPoints: number; nextRewardName: string;
}

export interface RewardCardProps {
  reward: import('../../types').Reward; userPoints: number; onClick: () => void;
}

export interface RewardCatalogGridProps {
  rewards: import('../../types').Reward[]; userPoints: number;
  activeFilter: string; onFilterChange: (f: string) => void;
}

export interface RedeemConfirmModalProps {
  reward?: import('../../types').Reward; isOpen: boolean; onClose: () => void;
  onConfirm: (deliveryAddress: string) => void; isLoading: boolean;
}

export interface RedemptionHistoryListProps { redemptions: import('../../types').RewardRedemption[]; }
```

#### components/notifications
```ts
export interface NotificationItemProps {
  notification: import('../../types').Notification; onClick: () => void;
}

export interface NotificationListProps {
  notifications: import('../../types').Notification[]; onMarkAllRead: () => void;
}

export interface NotificationBellProps { count: number; onClick: () => void; }
```

#### components/map
```ts
export interface InteractiveMapProps {
  center: [number, number]; zoom?: number;
  markers?: Array<{ position: [number, number]; type: string; popupContent?: React.ReactNode }>;
  onMapClick?: (coords: [number, number]) => void;
  height?: string;
}

export interface MapMarkerProps {
  position: [number, number];
  type: 'trash-spot' | 'disposal' | 'selected';
  popupContent?: React.ReactNode;
}

export interface TrashSpotPopupProps { spot: import('../../types').TrashSpotReport; }
export interface DisposalLocationPopupProps { location: import('../../types').DisposalLocation; }

export interface TrashSpotFormProps {
  selectedCoords?: [number, number];
  onSubmit: (data: unknown) => void;
  isLoading: boolean;
}

export interface TrashSpotCardProps { spot: import('../../types').TrashSpotReport; onClick: () => void; }

export interface LocationSidebarProps {
  locations: import('../../types').DisposalLocation[];
  onSelect: (loc: import('../../types').DisposalLocation) => void;
}

export interface MapFilterBarProps {
  options: { label: string; value: string }[];
  active: string;
  onChange: (val: string) => void;
}
```

#### components/education
```ts
export interface ArticleCardProps { article: import('../../types').EducationArticle; onClick: () => void; }
export interface ArticleGridProps { articles: import('../../types').EducationArticle[]; }

export interface ArticleSearchBarProps {
  value: string; onChange: (v: string) => void; placeholder?: string;
}

export interface CategoryFilterTabsProps {
  categories: string[]; active: string; onChange: (v: string) => void;
}

export interface ArticleDetailProps { article: import('../../types').EducationArticle; }

export interface RelatedArticlesProps {
  articles: import('../../types').EducationArticle[]; currentSlug: string;
}
```

#### components/admin
```ts
export interface AdminStatsCardProps {
  title: string; value: number | string;
  icon: React.ReactNode; color?: 'primary' | 'secondary' | 'faint';
  change?: string;
}

export interface AdminActivityChartProps {
  data: Array<{ date: string; reports: number; points: number }>;
}

export interface ReportValidationTableProps {
  reports: import('../../types').WasteReport[];
  onApprove: (id: string, points: number) => void;
  onReject: (id: string, reason: string) => void;
  activeFilter: string;
  onFilterChange: (f: string) => void;
}

export interface ReportDetailPanelProps {
  report?: import('../../types').WasteReport; isOpen: boolean; onClose: () => void;
}

export interface ValidationActionButtonsProps {
  reportId: string;
  onApprove: () => void;
  onReject: () => void;
}

export interface RewardManagementTableProps {
  rewards: import('../../types').Reward[];
  onEdit: (r: import('../../types').Reward) => void;
  onToggle: (id: string) => void;
}

export interface RewardFormModalProps {
  reward?: import('../../types').Reward; isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<import('../../types').Reward>) => void;
}

export interface RedemptionManagementTableProps {
  redemptions: import('../../types').RewardRedemption[];
  onUpdateStatus: (id: string, status: string) => void;
}

export interface ArticleManagementTableProps {
  articles: import('../../types').EducationArticle[];
  onEdit: (a: import('../../types').EducationArticle) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

export interface ArticleEditorProps {
  article?: import('../../types').EducationArticle;
  onSave: (data: Partial<import('../../types').EducationArticle>) => void;
  isLoading: boolean;
}

export interface TrashSpotManagementTableProps {
  spots: import('../../types').TrashSpotReport[];
  onUpdateStatus: (id: string, status: string) => void;
  onAssign: (id: string, petugasId: string) => void;
}

export interface DisposalLocationTableProps {
  locations: import('../../types').DisposalLocation[];
  onEdit: (l: import('../../types').DisposalLocation) => void;
  onToggle: (id: string) => void;
}

export interface DisposalLocationFormModalProps {
  location?: import('../../types').DisposalLocation; isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<import('../../types').DisposalLocation>) => void;
}

export interface UserManagementTableProps {
  users: import('../../types').User[];
  onChangeRole: (id: string, role: string) => void;
  onSuspend: (id: string) => void;
}
```

## TODOs
> Implementation + Verification = ONE task. Never separate.
> Every task includes QA scenarios with evidence output paths.

- [ ] 1. Initialize Node/npm Next.js 14 workspace + scripts

  **What to do**:
  - Create `package.json` with dependencies/devDependencies exactly as provided in the brief.
  - Add scripts:
    - `dev`: `next dev`
    - `build`: `next build`
    - `start`: `next start`
    - `typecheck`: `tsc -p tsconfig.json --noEmit`
  - Add `engines: { "node": ">=20" }`.
  - Ensure no extraneous dependencies (eslint/prettier/test frameworks) are added.

  **Must NOT do**:
  - Do not add CI/test/lint tooling.
  - Do not create a `pages/` directory.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: repo bootstrapping + dependency correctness.
  - Skills: []

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: 2–9 | Blocked By: none

  **References**:
  - External: user brief “package.json” section — exact dependency list and versions.
  - Constraint: “Critical Rules” — App Router only, no extra tooling.

  **Acceptance Criteria**:
  - [ ] `node -v` is `v20.*` OR engines is set to `>=20`.
  - [ ] `npm install` exits 0.
  - [ ] `npm run typecheck` exits 0 (may require tasks 2–4 first; if so, rerun and attach evidence in Task 9).

  **QA Scenarios**:
  ```
  Scenario: Install dependencies
    Tool: Bash
    Steps:
      1) npm install
    Expected: Exit code 0
    Evidence: .sisyphus/evidence/task-1-npm-install.txt

  Scenario: Ensure no unrequested tooling
    Tool: Bash
    Steps:
      1) node -e "const p=require('./package.json'); console.log(Object.keys(p.devDependencies||{}).sort().join(','))"
    Expected: Output contains only typescript, @types/*, tailwindcss, postcss, autoprefixer (and nothing like eslint, prettier, vitest, jest)
    Evidence: .sisyphus/evidence/task-1-devdeps-check.txt
  ```

  **Commit**: YES | Message: `chore(scaffold): initialize npm workspace` | Files: [package.json]

- [ ] 2. Add TypeScript + Next.js plumbing files

  **What to do**:
  - Create `tsconfig.json` suitable for Next.js 14 + TS5 (use `"jsx": "preserve"`, `"moduleResolution": "bundler"`, `"strict": true`, `"noEmit": true` for scripts; allow Next to emit).
  - Create `next-env.d.ts` with the standard Next.js references.
  - Create `next.config.ts` minimal export (do not add experimental flags).

  **Must NOT do**:
  - Do not add path aliases unless needed by stubs.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: config correctness.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: 9 | Blocked By: 1

  **References**:
  - Next.js TS defaults (standard `next-env.d.ts`).

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` exits 0 after Task 3+4 create minimal app files.

  **QA Scenarios**:
  ```
  Scenario: TypeScript config present
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); console.log(fs.existsSync('tsconfig.json'), fs.existsSync('next-env.d.ts'), fs.existsSync('next.config.ts'))"
    Expected: true true true
    Evidence: .sisyphus/evidence/task-2-ts-plumbing.txt

  Scenario: Typecheck gate (rerun later)
    Tool: Bash
    Steps:
      1) npm run typecheck
    Expected: Exit code 0
    Evidence: .sisyphus/evidence/task-2-typecheck.txt
  ```

  **Commit**: YES | Message: `chore(config): add typescript and next config` | Files: [tsconfig.json, next-env.d.ts, next.config.ts]

- [ ] 3. Add Tailwind + globals.css per Living Archive spec

  **What to do**:
  - Create `tailwind.config.ts`:
    - `content`: `['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}']`
    - `theme.extend.colors`: exact tokens from brief (including feedback colors) + semantic aliases `primary`, `secondary`, `background`.
    - `theme.extend.fontFamily`: sans/serif/mono per brief.
    - `theme.extend.borderRadius`: `{ card: '16px', input: '10px', btn: '999px' }`
    - Do NOT add boxShadow extension.
  - Create `postcss.config.js` with tailwindcss + autoprefixer.
  - Create `styles/globals.css`:
    - Google fonts imports for Plus Jakarta Sans and Merriweather.
    - `@tailwind base; @tailwind components; @tailwind utilities;`
    - `:root` CSS custom properties as specified.
    - `body` uses Plus Jakarta Sans, background var(--color-surface), text var(--color-text).
    - `.font-article` class for Merriweather.

  **Must NOT do**:
  - Do not use hex colors in component code; only Tailwind tokens.
  - Do not define borders/dividers utilities for layout.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: design-system mapping.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: 4–9 | Blocked By: 1

  **References**:
  - Brief section “Design System: The Living Archive — Verdant Core” (final hex values + typography rules).

  **Acceptance Criteria**:
  - [ ] `npm run build` (after Task 4 creates app/layout) succeeds.

  **QA Scenarios**:
  ```
  Scenario: Tailwind config contains required tokens
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); const s=fs.readFileSync('tailwind.config.ts','utf8'); console.log(['deep-forest','veridian-leaf','sapling-green','parchment','bone','charcoal','mist','feedback-success','feedback-error','feedback-link','primary','secondary','background'].every(k=>s.includes(k)))"
    Expected: true
    Evidence: .sisyphus/evidence/task-3-tailwind-tokens-check.txt

  Scenario: globals.css has root variables
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); const s=fs.readFileSync('styles/globals.css','utf8'); console.log(s.includes(':root') && s.includes('--color-primary') && s.includes('--color-surface'))"
    Expected: true
    Evidence: .sisyphus/evidence/task-3-globals-check.txt
  ```

  **Commit**: YES | Message: `feat(ui): add Living Archive tailwind + globals` | Files: [tailwind.config.ts, postcss.config.js, styles/globals.css]

- [ ] 4. Create App Router root + route-group layouts (minimal composition)

  **What to do**:
  - Create `app/layout.tsx`:
    - Line 1 assignment comment.
    - Implement Next requirement: include a named export `RootLayout` AND `export default RootLayout`.
    - Return `<html lang="id">` + `<body className="font-sans bg-parchment text-charcoal">`.
    - Import `../styles/globals.css`.
    - Include `{children}`.
  - Create route-group layouts (all stubs):
    - Each layout file MUST include a named export + `export default` (Next requirement).
    - `app/(public)/layout.tsx` (wraps children with `<Navbar/>` and `<Footer/>` stubs once those exist; until then placeholder only).
    - `app/(user)/layout.tsx` uses `components/layout/UserLayout`.
    - `app/(map)/layout.tsx`:
      - Import Leaflet CSS here (e.g., `import 'leaflet/dist/leaflet.css'`) to ensure map pages render; keep as server layout but only CSS import.
    - `app/(admin)/layout.tsx` uses `components/layout/AdminLayout`.

  **Must NOT do**:
  - Do not add client directives to layouts unless necessary.
  - Do not implement auth guards.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: Next.js layout correctness.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: 5–9 | Blocked By: 2,3

  **References**:
  - Next.js App Router layout conventions.
  - Leaflet rule: CSS import location + map components are client-only.

  **Acceptance Criteria**:
  - [ ] `npm run build` reaches compilation stage (may fail until stubs exist; rerun in Task 9).

  **QA Scenarios**:
  ```
  Scenario: Layout files exist
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); console.log(['app/layout.tsx','app/(public)/layout.tsx','app/(user)/layout.tsx','app/(map)/layout.tsx','app/(admin)/layout.tsx'].every(p=>fs.existsSync(p)))"
    Expected: true
    Evidence: .sisyphus/evidence/task-4-layouts-exist.txt

  Scenario: Root layout imports globals.css
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); const s=fs.readFileSync('app/layout.tsx','utf8'); console.log(s.includes('globals.css'))"
    Expected: true
    Evidence: .sisyphus/evidence/task-4-globals-import.txt
  ```

  **Commit**: YES | Message: `feat(app): add root and group layouts` | Files: [app/layout.tsx, app/(public)/layout.tsx, app/(user)/layout.tsx, app/(map)/layout.tsx, app/(admin)/layout.tsx]

- [ ] 5. Create shared TypeScript domain interfaces in `types/index.ts`

  **What to do**:
  - Create `types/index.ts` exporting the exact interfaces from the brief (User, WasteReport, PointTransaction, Reward, RewardRedemption, TrashSpotReport, EducationArticle, DisposalLocation, Notification).
  - No additional fields/types.

  **Must NOT do**:
  - Do not change field names or enum string unions.

  **Recommended Agent Profile**:
  - Category: `quick` — Reason: pure type declarations.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: 6–8 | Blocked By: 2

  **References**:
  - Brief section “types/index.ts” — authoritative interfaces.

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` succeeds once all imports are correct.

  **QA Scenarios**:
  ```
  Scenario: Types file exports required interface names
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); const s=fs.readFileSync('types/index.ts','utf8'); console.log(['interface User','interface WasteReport','interface PointTransaction','interface Reward','interface RewardRedemption','interface TrashSpotReport','interface EducationArticle','interface DisposalLocation','interface Notification'].every(k=>s.includes(k)))"
    Expected: true
    Evidence: .sisyphus/evidence/task-5-types-check.txt
  ```

  **Commit**: YES | Message: `feat(types): add core domain interfaces` | Files: [types/index.ts]

- [ ] 6. Create `lib/utils.ts` + `lib/*` and `hooks/*` stubs (Hamid)

  **What to do**:
  - Create `lib/utils.ts`:
    - Export `cn()` using `clsx` + `tailwind-merge`.
    - Export `formatDate(dateStr: string): string` using `date-fns/format`.
    - Export `formatPoints(points: number): string` formatting to Indonesian style (e.g., 1500 → `"1.500 poin"`).
  - Create stubs:
    - `lib/api.ts`, `lib/auth.ts`, `lib/validators.ts`
    - `hooks/useAuth.ts`, `hooks/useGeolocation.ts`, `hooks/useNotifications.ts`
  - For non-specified stubs (api/auth/validators/hooks):
    - Follow standard stub rules: assignment header, named export(s), JSDoc, placeholder return/value.
    - Keep them logic-free (no real HTTP, no auth).

  **Must NOT do**:
  - Do not introduce new dependencies beyond those in `package.json`.
  - Do not implement real validation/auth.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: utilities must compile and match constraints.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: 7–9 | Blocked By: 1,2

  **References**:
  - Brief section “lib/utils.ts” — required exports.

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` succeeds.

  **QA Scenarios**:
  ```
  Scenario: Compile utils.ts and validate runtime behavior
    Tool: Bash (PowerShell)
    Steps:
      1) mkdir .sisyphus\tmp -Force
      2) npx tsc lib/utils.ts --target ES2020 --module commonjs --outDir .sisyphus/tmp --esModuleInterop
      3) node -e "const u=require('./.sisyphus/tmp/utils.js'); console.log(typeof u.cn, typeof u.formatDate, u.formatPoints(1500))"
    Expected: Output ends with: function function 1.500 poin
    Evidence: .sisyphus/evidence/task-6-utils-runtime.txt
  ```

  **Commit**: YES | Message: `feat(core): add utils, lib, and hooks stubs` | Files: [lib/utils.ts, lib/api.ts, lib/auth.ts, lib/validators.ts, hooks/useAuth.ts, hooks/useGeolocation.ts, hooks/useNotifications.ts]

- [ ] 7. Generate `components/ui/*` stubs (Hamid)

  **What to do**:
  - Create all files under `components/ui/` listed in inventory.
  - Each file MUST:
    - Line 1: `// ASSIGNED TO: Hamid`
    - Export named component matching filename (e.g., `export function Button(...)`)
    - Declare props interface exactly per brief for that component.
    - Include JSDoc describing the component.
    - Return a placeholder `<div>` (or semantic element when required, e.g., `<button>` is allowed) with:
      - `data-component="Button"` etc.
      - Visible text label with component name.
      - Tailwind classes using tokens (`bg-bone`, `bg-parchment`, `text-charcoal`, `rounded-2xl`, etc.)
      - `// TODO: Implement UI` inside return.
    - Use `cn()` for conditional class composition.
  - Enforce No-Line rules:
    - No layout borders/dividers.
    - Allowed exceptions:
      - Button `outlined` variant uses `border border-deep-forest`.
      - Input/Textarea error state may use `border border-feedback-error`.
      - Focus rings via `ring-*`.

  **Must NOT do**:
  - Do not include any hardcoded hex color in JSX.
  - Do not implement variant logic beyond minimal class switching (even that can be stubbed).

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: consistent Tailwind token usage.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: 8–9 | Blocked By: 3,6

  **References**:
  - Brief “UI PRIMITIVE COMPONENTS” section — props + styling guidance.

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` succeeds.

  **QA Scenarios**:
  ```
  Scenario: No hardcoded hex in ui components
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); const path=require('path'); const dir='components/ui'; const files=fs.readdirSync(dir).filter(f=>f.endsWith('.tsx')); const bad=[]; for (const f of files){const s=fs.readFileSync(path.join(dir,f),'utf8'); if (/#([0-9a-fA-F]{3,8})/.test(s)) bad.push(f);} console.log(bad.length===0? 'OK' : bad.join(','))"
    Expected: OK
    Evidence: .sisyphus/evidence/task-7-no-hex-ui.txt

  Scenario: data-component present (string check)
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); const path=require('path'); const dir='components/ui'; const files=fs.readdirSync(dir).filter(f=>f.endsWith('.tsx')); const missing=[]; for (const f of files){const name=f.replace('.tsx',''); const s=fs.readFileSync(path.join(dir,f),'utf8'); if (!(s.includes('data-component') && s.includes(name))) missing.push(f);} console.log(missing.length===0?'OK':missing.join(','))"
    Expected: OK
    Evidence: .sisyphus/evidence/task-7-data-component-ui.txt
  ```

  **Commit**: YES | Message: `feat(ui): scaffold primitive components` | Files: [components/ui/*]

- [ ] 8. Generate `components/layout/*`, landing/auth sections, and public/auth pages (Hamid)

  **What to do**:
  - Create layout components:
    - `components/layout/Navbar.tsx`, `Footer.tsx`, `Sidebar.tsx`, `UserLayout.tsx`, `AdminLayout.tsx`
    - Ensure any `User` type import comes from `types/index.ts`.
  - Create landing sections under `components/landing/*` and auth forms under `components/auth/*` per brief.
  - Create public/auth pages:
    - `app/(public)/page.tsx` composes landing sections.
    - `app/(public)/auth/login/page.tsx` composes `LoginForm`.
    - `app/(public)/auth/register/page.tsx` composes `RegisterForm`.
  - Page stubs MUST:
    - Have assignment header and `// Route: ...` comment.
    - Wrap content in `<main className="...">` using tokens.
    - Only minimal composition, no logic.
    - Include a named export (e.g., `PublicHomePage`) AND `export default PublicHomePage` (Next requirement).

  **Must NOT do**:
  - No auth logic, no form validation, no API calls.
  - No borders/dividers for layout (except explicit button outlined variant).

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: consistent layout/token usage.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: 9 | Blocked By: 4,5,7

  **References**:
  - Brief “LAYOUT COMPONENTS”, “LANDING PAGE SECTIONS”, “AUTH COMPONENTS”, and “PAGE STUBS”.

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` succeeds.
  - [ ] `npm run build` succeeds once remaining pages/components exist.

  **QA Scenarios**:
  ```
  Scenario: Public routes respond (PowerShell head requests)
    Tool: Bash (PowerShell)
    Steps:
      1) npm run build
      2) Start-Job -Name ecotrack-start -ScriptBlock { npm run start } | Out-Null
      3) Start-Sleep -Seconds 3
      4) (Invoke-WebRequest -Uri http://localhost:3000/ -Method Head -UseBasicParsing).StatusCode
      5) (Invoke-WebRequest -Uri http://localhost:3000/auth/login -Method Head -UseBasicParsing).StatusCode
      6) (Invoke-WebRequest -Uri http://localhost:3000/auth/register -Method Head -UseBasicParsing).StatusCode
      7) Stop-Job -Name ecotrack-start -Force
    Expected: Prints 200 for each request
    Evidence: .sisyphus/evidence/task-8-public-iwr.txt

  Scenario: No forbidden border utilities introduced (broad scan)
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); const path=require('path'); const glob=(d)=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?glob(path.join(d,e.name)):[path.join(d,e.name)]); const files=glob('components').concat(glob('app')).filter(f=>f.endsWith('.tsx')); const bad=[]; const re=/(border-(gray|slate)-|divide-)/; for (const f of files){const s=fs.readFileSync(f,'utf8'); if (re.test(s)) bad.push(f);} console.log(bad.length===0?'OK':bad.slice(0,20).join('\n'))"
    Expected: OK (except any explicitly allowed border usage for outlined button / upload dashed border / error borders)
    Evidence: .sisyphus/evidence/task-8-no-forbidden-borders-scan.txt
  ```

  **Commit**: YES | Message: `feat(landing): scaffold public pages and layout` | Files: [components/layout/*, components/landing/*, components/auth/*, app/(public)/*]

- [ ] 9. Generate Alfin domain: user pages + dashboard/reports/points/notifications components

  **What to do**:
  - Create all `components/dashboard/*`, `components/reports/*`, `components/points/*`, `components/notifications/*` stubs.
  - Ensure types imported from `types/index.ts` (WasteReport, Reward, PointTransaction, RewardRedemption, Notification).
  - Create all `app/(user)/*` pages per inventory and compose minimal components.
  - Each `page.tsx` MUST include a named export + `export default`.
  - Keep components stub-only; props interfaces per brief.
  - Ensure `cn()` usage for conditional classes.

  **Must NOT do**:
  - No real form logic; no react-hook-form usage yet (allowed to import but avoid real wiring).
  - No data fetching.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: component scaffolding across many files.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: 12 | Blocked By: 4,5,6,7

  **References**:
  - Brief sections: “DASHBOARD COMPONENTS”, “REPORT COMPONENTS”, “POINTS & REWARDS COMPONENTS”, “NOTIFICATION COMPONENTS”, and user “PAGE STUBS”.

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` exits 0.
  - [ ] `npm run build` exits 0 after Tasks 10–11 complete.

  **QA Scenarios**:
  ```
  Scenario: User routes respond (PowerShell head requests)
    Tool: Bash (PowerShell)
    Steps:
      1) npm run build
      2) Start-Job -Name ecotrack-start -ScriptBlock { npm run start } | Out-Null
      3) Start-Sleep -Seconds 3
      4) (Invoke-WebRequest -Uri http://localhost:3000/dashboard -Method Head -UseBasicParsing).StatusCode
      5) (Invoke-WebRequest -Uri http://localhost:3000/reports -Method Head -UseBasicParsing).StatusCode
      6) (Invoke-WebRequest -Uri http://localhost:3000/reports/create -Method Head -UseBasicParsing).StatusCode
      7) (Invoke-WebRequest -Uri http://localhost:3000/points -Method Head -UseBasicParsing).StatusCode
      8) (Invoke-WebRequest -Uri http://localhost:3000/rewards -Method Head -UseBasicParsing).StatusCode
      9) (Invoke-WebRequest -Uri http://localhost:3000/rewards/history -Method Head -UseBasicParsing).StatusCode
      10) (Invoke-WebRequest -Uri http://localhost:3000/rewards/redeem/demo -Method Head -UseBasicParsing).StatusCode
      11) (Invoke-WebRequest -Uri http://localhost:3000/profile -Method Head -UseBasicParsing).StatusCode
      12) (Invoke-WebRequest -Uri http://localhost:3000/notifications -Method Head -UseBasicParsing).StatusCode
      13) Stop-Job -Name ecotrack-start -Force
    Expected: Prints 200 for each request
    Evidence: .sisyphus/evidence/task-9-user-iwr.txt
  ```

  **Commit**: YES | Message: `feat(user): scaffold dashboard reports points notifications` | Files: [components/dashboard/*, components/reports/*, components/points/*, components/notifications/*, app/(user)/*]

- [ ] 10. Generate Raja domain: map + education components and pages (Leaflet SSR-safe)

  **What to do**:
  - Create map components under `components/map/*`:
    - `InteractiveMap.tsx` MUST be client-only and SSR-safe:
      - Top: `"use client"`.
      - Use `next/dynamic` to dynamically import the Leaflet map implementation with `{ ssr: false }`.
      - Keep placeholder-only rendering (e.g., a container with label and optional marker list text).
    - `MapMarker.tsx`, popups, form/card/sidebar/filter stubs: follow conventions.
  - Create map pages under `app/(map)/*`:
    - `trash-spots/page.tsx`, `trash-spots/create/page.tsx`, `disposal-locations/page.tsx`.
    - Compose `InteractiveMap` + relevant stubs, no real data.
  - Create education components under `components/education/*` and education pages under `app/(public)/education/*`:
    - `ArticleDetail` body content uses `font-serif` (and only there).
    - All other UI uses `font-sans`.

  **Must NOT do**:
  - Do not import Leaflet modules at the top-level of server components.
  - Do not access `window` at module scope.
  - Do not add real map click handlers beyond placeholder props.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: consistent scaffold + SSR constraints.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 4 | Blocks: 12 | Blocked By: 4,5,6

  **References**:
  - Brief “MAP COMPONENTS” Leaflet rules.
  - Critical rule: Leaflet uses `"use client"` + `dynamic import ssr:false`.

  **Acceptance Criteria**:
  - [ ] `npm run build` succeeds (this is the SSR-safety gate).
  - [ ] `curl -I` routes: `/trash-spots`, `/trash-spots/create`, `/disposal-locations`, `/education`, `/education/demo` return 200 when server running.

  **QA Scenarios**:
  ```
  Scenario: Build succeeds (Leaflet SSR gate)
    Tool: Bash
    Steps:
      1) npm run build
    Expected: Exit code 0
    Evidence: .sisyphus/evidence/task-10-build-leaflet-gate.txt

  Scenario: Map + education routes respond (PowerShell head requests)
    Tool: Bash (PowerShell)
    Steps:
      1) Start-Job -Name ecotrack-start -ScriptBlock { npm run start } | Out-Null
      2) Start-Sleep -Seconds 3
      3) (Invoke-WebRequest -Uri http://localhost:3000/trash-spots -Method Head -UseBasicParsing).StatusCode
      4) (Invoke-WebRequest -Uri http://localhost:3000/trash-spots/create -Method Head -UseBasicParsing).StatusCode
      5) (Invoke-WebRequest -Uri http://localhost:3000/disposal-locations -Method Head -UseBasicParsing).StatusCode
      6) (Invoke-WebRequest -Uri http://localhost:3000/education -Method Head -UseBasicParsing).StatusCode
      7) (Invoke-WebRequest -Uri http://localhost:3000/education/demo -Method Head -UseBasicParsing).StatusCode
      8) Stop-Job -Name ecotrack-start -Force
    Expected: Prints 200 for each request
    Evidence: .sisyphus/evidence/task-10-map-edu-iwr.txt
  ```

  **Commit**: YES | Message: `feat(map,education): scaffold leaflet-safe map and education` | Files: [components/map/*, components/education/*, app/(map)/*, app/(public)/education/*]

- [ ] 11. Generate Rifqi domain: admin components + admin pages

  **What to do**:
  - Create all `components/admin/*` stubs per brief.
  - Create admin pages under `app/(admin)/admin/*` per inventory.
  - Each `page.tsx` MUST include a named export + `export default`.
  - Compose minimal page markup using admin components; no real tables/charts logic.
  - `AdminActivityChart` may import Recharts but keep stub-only; avoid real chart config.

  **Must NOT do**:
  - Do not add admin auth/guard logic.
  - Do not add WYSIWYG real editor logic; TipTap remains stub.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: many UI stubs.
  - Skills: []

  **Parallelization**: Can Parallel: YES | Wave 4 | Blocks: 12 | Blocked By: 4,5,6,7

  **References**:
  - Brief “ADMIN COMPONENTS” + admin “PAGE STUBS”.

  **Acceptance Criteria**:
  - [ ] `npm run typecheck` exits 0.
  - [ ] `curl -I` routes `/admin` and subroutes return 200 when server running.

  **QA Scenarios**:
  ```
  Scenario: Admin routes respond (PowerShell head requests)
    Tool: Bash (PowerShell)
    Steps:
      1) npm run build
      2) Start-Job -Name ecotrack-start -ScriptBlock { npm run start } | Out-Null
      3) Start-Sleep -Seconds 3
      4) (Invoke-WebRequest -Uri http://localhost:3000/admin -Method Head -UseBasicParsing).StatusCode
      5) (Invoke-WebRequest -Uri http://localhost:3000/admin/reports -Method Head -UseBasicParsing).StatusCode
      6) (Invoke-WebRequest -Uri http://localhost:3000/admin/rewards -Method Head -UseBasicParsing).StatusCode
      7) (Invoke-WebRequest -Uri http://localhost:3000/admin/education -Method Head -UseBasicParsing).StatusCode
      8) (Invoke-WebRequest -Uri http://localhost:3000/admin/trash-spots -Method Head -UseBasicParsing).StatusCode
      9) (Invoke-WebRequest -Uri http://localhost:3000/admin/disposal-locations -Method Head -UseBasicParsing).StatusCode
      10) (Invoke-WebRequest -Uri http://localhost:3000/admin/users -Method Head -UseBasicParsing).StatusCode
      11) Stop-Job -Name ecotrack-start -Force
    Expected: Prints 200 for each request
    Evidence: .sisyphus/evidence/task-11-admin-iwr.txt
  ```

  **Commit**: YES | Message: `feat(admin): scaffold admin panel stubs` | Files: [components/admin/*, app/(admin)/*]

- [ ] 12. Repo-wide compliance sweep + build/serve route verification

  **What to do**:
  - Run a repo-wide scan to enforce conventions:
    - Every `.ts/.tsx` file begins with `// ASSIGNED TO: ...`.
    - Only named exports used (no `export default`).
    - No hardcoded hex colors in components/pages.
    - No forbidden border/divider utilities (except explicit exceptions).
    - Pages: contain `// Route:` comment and wrap in `<main>`.
  - Run full gate:
    - `npm run typecheck`
    - `npm run build`
    - `npm run start` then curl all routes in “Route Verification List”.
  - Save evidence logs.

  **Must NOT do**:
  - Do not weaken constraints to make scans pass; fix stubs instead.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: cross-cutting validation and fixes.
  - Skills: []

  **Parallelization**: Can Parallel: NO | Wave Final | Blocks: F1–F4 | Blocked By: 8–11

  **References**:
  - “Critical Rules” section from brief.
  - This plan’s “Route Verification List”.

  **Acceptance Criteria**:
  - [ ] All scans return OK.
  - [ ] `npm run typecheck` exits 0.
  - [ ] `npm run build` exits 0.
  - [ ] All curl route checks return 200.

  **QA Scenarios**:
  ```
  Scenario: No default exports
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); const path=require('path'); const walk=(d)=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]); const files=[...walk('app'),...walk('components'),...walk('lib'),...walk('hooks'),...walk('types')].filter(f=>f.endsWith('.ts')||f.endsWith('.tsx')); const allowedApp=(p)=>{const norm=p.replace(/\\/g,'/'); return /^app\/.+\/(page|layout)\.tsx$/.test(norm) || /^app\/(page|layout)\.tsx$/.test(norm);}; const bad=[]; for(const f of files){const s=fs.readFileSync(f,'utf8'); if(/export\s+default/.test(s) && !allowedApp(f)) bad.push(f);} console.log(bad.length===0?'OK':bad.join('\n'))"
    Expected: OK
    Evidence: .sisyphus/evidence/task-12-no-default-exports.txt

  Scenario: Assignment header present
    Tool: Bash
    Steps:
      1) node -e "const fs=require('fs'); const path=require('path'); const walk=(d)=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]); const dirs=['app','components','lib','hooks','types']; const files=dirs.flatMap(walk).filter(f=>f.endsWith('.ts')||f.endsWith('.tsx')); const bad=[]; for(const f of files){const s=fs.readFileSync(f,'utf8').split(/\r?\n/)[0]; if(!s.startsWith('// ASSIGNED TO:')) bad.push(f);} console.log(bad.length===0?'OK':bad.slice(0,30).join('\n'))"
    Expected: OK
    Evidence: .sisyphus/evidence/task-12-assignment-headers.txt

  Scenario: Full build + serve + route HEAD checks
    Tool: Bash (PowerShell)
    Steps:
      1) npm run typecheck
      2) npm run build
      3) Start-Job -Name ecotrack-start -ScriptBlock { npm run start } | Out-Null
      4) Start-Sleep -Seconds 3
      5) $routes = @(
           '/',
           '/auth/login','/auth/register',
           '/education','/education/demo',
           '/dashboard','/reports','/reports/create',
           '/points','/rewards','/rewards/history','/rewards/redeem/demo',
           '/profile','/notifications',
           '/trash-spots','/trash-spots/create','/disposal-locations',
           '/admin','/admin/reports','/admin/rewards','/admin/education','/admin/trash-spots','/admin/disposal-locations','/admin/users'
         )
      6) $bad = @(); foreach ($r in $routes) {
           try {
             $code = (Invoke-WebRequest -Uri ("http://localhost:3000" + $r) -Method Head -UseBasicParsing).StatusCode
             if ($code -ne 200) { $bad += "$r:$code" }
           } catch {
             $bad += "$r:ERROR"
           }
         }
      7) if ($bad.Count -gt 0) { throw ("Route checks failed: " + ($bad -join ', ')) } else { 'OK' }
      8) Stop-Job -Name ecotrack-start -Force
    Expected: Prints OK (and does not throw)
    Evidence: .sisyphus/evidence/task-12-build-and-routes.txt
  ```

  **Commit**: YES | Message: `chore(verify): enforce scaffold conventions and build gates` | Files: [multiple]






## Final Verification Wave (MANDATORY — after ALL implementation tasks)
> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
> Do NOT auto-proceed after verification.
- [ ] F1. Plan Compliance Audit — oracle
- [ ] F2. Code Quality Review — unspecified-high
- [ ] F3. Real Manual QA — unspecified-high
- [ ] F4. Scope Fidelity Check — deep

## Commit Strategy
- Branching (per brief):
  - `feature/hamid/core-ui-design-system`
  - `feature/hamid/landing-auth-pages`
  - `feature/alfin/dashboard-reports`
  - `feature/alfin/points-rewards`
  - `feature/raja/map-leaflet`
  - `feature/raja/education`
  - `feature/rifqi/admin-panel`
- Conventional commits examples (per brief): `feat(ui): ...`, `feat(landing): ...`, `fix(map): ...`, `style(cards): ...`.
- Recommended atomic commit cadence: one commit per task group (Wave 1 foundations, then per domain wave).

## Success Criteria
- Project installs, typechecks, builds, serves, and all declared routes respond.
- All created stubs follow the file-level conventions and token rules.
  - Each `page.tsx` MUST include a named export + `export default`.
- [ ] 0. Initialize git repository (optional but required if making commits)

  **What to do**:
  - If `git status` fails, run `git init`.
  - Create `.gitignore` at repo root with at least:
    - `node_modules/`, `.next/`, `out/`, `dist/`, `.env*`, `.DS_Store`
    - Keep `.sisyphus/` tracked (plans/drafts), but allow `.sisyphus/evidence/` if you prefer ignoring generated logs.

  **Must NOT do**:
  - Do not add secrets.

  **Recommended Agent Profile**:
  - Category: `quick`
  - Skills: []

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: any Commit=YES | Blocked By: none

  **Acceptance Criteria**:
  - [ ] `git status` exits 0.

  **QA Scenarios**:
  ```
  Scenario: Git initialized
    Tool: Bash
    Steps:
      1) git status
    Expected: Exit code 0
    Evidence: .sisyphus/evidence/task-0-git-status.txt
  ```

  **Commit**: NO
