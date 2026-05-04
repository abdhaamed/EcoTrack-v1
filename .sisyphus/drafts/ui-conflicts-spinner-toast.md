# UI Conflicts: Spinner and Toast

## Existing Reality
- `Spinner` already implemented; supports `size?: 'sm'|'md'|'lg'`.
- `Toast` already implemented; supports `variant?: 'default'|'error'` and renders `children` (no `message/type/onClose` props and no auto-dismiss).

## Original Requested Contract
- `Spinner`: Props: size ('sm' | 'md' | 'lg'), color? (string)
- `Toast`: Props: message (string), type ('success' | 'error' | 'info'), onClose (() => void), auto-dismiss after 3 seconds.

## Decision
**Option A**: Keep existing `components/ui/Spinner.tsx` + `components/ui/Toast.tsx` unchanged, do NOT scaffold them, and update team expectations: Raja’s “Toast props = message/type/onClose + auto-dismiss” becomes **future refactor work**, not scaffolding.
