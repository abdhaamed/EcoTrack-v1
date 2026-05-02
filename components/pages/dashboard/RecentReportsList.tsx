// ASSIGNED TO: Alfin
// CONTRACT: List of recent waste reports with status badges
// IMPORTS (comment-only):
// import { WasteReport } from '@/types';
// import { Badge } from '@/components/ui/Badge'; (variants: success, warning, error, info, neutral)
// import { Card } from '@/components/ui/Card'; (variants: bone, parchment)

interface RecentReportsListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reports: any[]; // Should be WasteReport[] from @/types
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RecentReportsList({ reports }: RecentReportsListProps) {
  return null;
}
