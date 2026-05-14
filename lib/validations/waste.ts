import { z } from 'zod';

export const WasteReportSchema = z.object({
  userId: z.string().uuid({ message: "User ID must be a valid UUID" }),
  wasteType: z.enum(['ORGANIK', 'ANORGANIK', 'B3', 'RESIDU'], {
    errorMap: () => ({ message: "Jenis sampah harus salah satu dari: ORGANIK, ANORGANIK, B3, RESIDU" }),
  }),
  estimatedWeight: z.number().positive({ message: "Estimasi berat harus lebih dari 0" }),
  photoUrl: z.string().url({ message: "URL foto tidak valid" }),
  locationAddress: z.string().min(5, { message: "Alamat lokasi minimal 5 karakter" }),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export type WasteReportInput = z.infer<typeof WasteReportSchema>;
