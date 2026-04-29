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
