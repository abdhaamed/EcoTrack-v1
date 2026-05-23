import { z } from 'zod';

export const RedeemRewardSchema = z.object({
  rewardId: z.string().uuid({ message: "Reward ID must be valid UUID" }),
  deliveryAddress: z.string().min(10, { message: "Alamat pengiriman minimal 10 karakter" }),
});

export type RedeemRewardInput = z.infer<typeof RedeemRewardSchema>;

export const CreateRewardSchema = z.object({
  name: z.string().min(3, { message: "Nama reward minimal 3 karakter" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid" }),
  points_required: z.number().min(1, { message: "Poin minimal 1" }),
  stock: z.number().int().min(0, { message: "Stok minimal 0" }),
  is_active: z.boolean().default(true),
});

export const UpdateRewardSchema = CreateRewardSchema.extend({
  id: z.string().uuid({ message: "Reward ID must be valid UUID" }),
});

export type CreateRewardInput = z.infer<typeof CreateRewardSchema>;
export type UpdateRewardInput = z.infer<typeof UpdateRewardSchema>;
