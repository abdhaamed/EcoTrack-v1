/**
 * Note: The canonical UI report model remains types/index.ts:WasteReport (camelCase).
 */

export type WasteType = 'ORGANIK' | 'ANORGANIK' | 'B3' | 'RESIDU';

export type ReportStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface WasteReportPayload {
  userId: string;
  wasteType: WasteType;
  estimatedWeight: number;
  photoUrl: string;
  locationAddress: string;
  latitude: number;
  longitude: number;
}

export interface WasteReportResult {
  success: boolean;
  data?: any;
  error?: string;
}
