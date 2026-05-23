'use server';

import { createClient } from '@/lib/supabase/server';
import { RedeemRewardSchema, CreateRewardSchema, UpdateRewardSchema } from '@/lib/validations/rewards';
import { RewardResult } from '@/types/rewards';
import { revalidatePath } from 'next/cache';

export async function getRewards(): Promise<RewardResult> {
  const supabase = createClient();

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    return {
      success: true,
      data: [
        {
          id: 'mock-reward-1',
          name: 'Tumbler Ramah Lingkungan',
          description: 'Tumbler dari bahan daur ulang, kapasitas 500ml',
          imageUrl: '/images/rewards/tumbler.png',
          points_required: 500,
          stock: 15,
          is_active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'mock-reward-2',
          name: 'Tas Belanja Kanvas',
          description: 'Tas belanja dari kanvas organik',
          imageUrl: '/images/rewards/tas.png',
          points_required: 750,
          stock: 8,
          is_active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'mock-reward-3',
          name: 'Voucher Belanja 50rb',
          description: 'Voucher belanja di supermarket partner',
          imageUrl: '/images/rewards/voucher.png',
          points_required: 1000,
          stock: 0,
          is_active: true,
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .eq('is_active', true)
    .order('points_required', { ascending: true });

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Gagal mengambil data dari database' };
  }

  return { success: true, data };
}

export async function redeemReward(payload: unknown): Promise<RewardResult> {
  const supabase = createClient();

  const validation = RedeemRewardSchema.safeParse(payload);

  if (!validation.success) {
    const errorMessage = validation.error.issues.map((e: { message: string }) => e.message).join(', ');
    return { success: false, error: errorMessage };
  }

  const { rewardId, deliveryAddress } = validation.data;

  // Get current user
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    return { success: false, error: 'User not authenticated' };
  }

  const userId = userData.user.id;

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    revalidatePath('/dashboard/rewards');
    revalidatePath('/dashboard/points');
    revalidatePath('/dashboard/redemptions');
    return {
      success: true,
      data: {
        id: 'mock-redemption-' + Date.now(),
        userId,
        rewardId,
        pointsSpent: 500,
        status: 'PROCESSING',
        deliveryAddress,
        createdAt: new Date().toISOString(),
      },
    };
  }

  // Check reward exists and has stock
  const { data: reward, error: rewardError } = await supabase
    .from('rewards')
    .select('*')
    .eq('id', rewardId)
    .single();

  if (rewardError || !reward) {
    return { success: false, error: 'Reward tidak ditemukan' };
  }

  if (reward.stock <= 0) {
    return { success: false, error: 'Reward sudah habis stoknya' };
  }

  // Check user points - create profile if doesn't exist
  let { data: user, error: userFetchError } = await supabase
    .from('profiles')
    .select('total_points')
    .eq('id', userId)
    .single();

  // If profile doesn't exist, create one with 0 points
  if (userFetchError || !user) {
    // Get user email from auth.users
    const { data: authUser } = await supabase.auth.getUser();
    const email = authUser?.user?.email || `${userId}@placeholder.com`;
    
    const { data: newUser, error: createError } = await supabase
      .from('profiles')
      .insert({ id: userId, email, total_points: 0 })
      .select('total_points')
      .single();
    
    if (createError || !newUser) {
      return { success: false, error: 'User tidak ditemukan' };
    }
    user = newUser;
  }

  if (user.total_points < reward.points_required) {
    return { success: false, error: 'Poin tidak cukup untuk menukarkan reward ini' };
  }

  // Create redemption
  const { data: redemption, error: redemptionError } = await supabase
    .from('reward_redemptions')
    .insert({
      user_id: userId,
      reward_id: rewardId,
      points_spent: reward.points_required,
      status: 'PROCESSING',
      delivery_address: deliveryAddress,
    })
    .select()
    .single();

  if (redemptionError) {
    console.error('Supabase Error:', redemptionError);
    return { success: false, error: 'Gagal membuat redemption' };
  }

  // Create DEBIT transaction
  const { error: transactionError } = await supabase
    .from('point_transactions')
    .insert({
      user_id: userId,
      transaction_type: 'DEBIT',
      points: reward.points_required,
      description: `Redeemed: ${reward.name}`,
    });

  if (transactionError) {
    console.error('Supabase Error:', transactionError);
    return { success: false, error: 'Gagal mencatat transaksi' };
  }

  // Deduct points from user
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ total_points: user.total_points - reward.points_required })
    .eq('id', userId);

  if (updateError) {
    console.error('Supabase Error:', updateError);
    return { success: false, error: 'Gagal mengupdate poin' };
  }

  // Decrement stock
  await supabase
    .from('rewards')
    .update({ stock: reward.stock - 1 })
    .eq('id', rewardId);

  revalidatePath('/dashboard/rewards');
  revalidatePath('/dashboard/redemptions');
  revalidatePath('/dashboard/points');

  revalidatePath('/dashboard/rewards');
  revalidatePath('/dashboard/points');
  revalidatePath('/dashboard/redemptions');

  return { success: true, data: redemption };
}

export async function getPointHistory(userId: string): Promise<RewardResult> {
  const supabase = createClient();

  if (!userId) {
    return { success: false, error: 'User ID required' };
  }

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    return {
      success: true,
      data: [
        {
          id: 'mock-pt-1',
          userId,
          reportId: 'mock-report-1',
          transactionType: 'CREDIT',
          points: 50,
          description: 'Waste Report: ORGANIK',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 'mock-pt-2',
          userId,
          transactionType: 'DEBIT',
          points: 200,
          description: 'Redeemed: Tumbler Ramah Lingkungan',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  const { data, error } = await supabase
    .from('point_transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Gagal mengambil data dari database' };
  }

  return { success: true, data };
}

export async function getUserPoints(): Promise<RewardResult> {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData?.user) {
    return { success: false, error: 'User not authenticated' };
  }
  
  const userId = userData.user.id;
  
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('total_points')
    .eq('id', userId)
    .single();
  
  if (profileError || !profile) {
    return { success: true, data: 0 };
  }
  
  return { success: true, data: profile.total_points };
}

export async function getRedemptions(userId: string): Promise<RewardResult> {
  const supabase = createClient();

  if (!userId) {
    return { success: false, error: 'User ID required' };
  }

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    return {
      success: true,
      data: [
        {
          id: 'mock-redemption-1',
          userId,
          rewardId: 'mock-reward-1',
          pointsSpent: 500,
          status: 'PROCESSING',
          deliveryAddress: 'Jl. Rayagreen No. 123, Jakarta',
          trackingNote: null,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: 'mock-redemption-2',
          userId,
          rewardId: 'mock-reward-2',
          pointsSpent: 750,
          status: 'SHIPPED',
          deliveryAddress: 'Jl. Rayagreen No. 123, Jakarta',
          trackingNote: 'Resi: JNE123456789',
          createdAt: new Date(Date.now() - 604800000).toISOString(),
        },
      ],
    };
  }

  const { data, error } = await supabase
    .from('reward_redemptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Gagal mengambil data dari database' };
  }

  return { success: true, data };
}

export async function getLeaderboard(limit: number = 10): Promise<RewardResult> {
  const supabase = createClient();

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    return {
      success: true,
      data: [
        { id: 'user-1', name: 'Budi Santoso', total_points: 2500, photoUrl: null },
        { id: 'user-2', name: 'Siti Rahayu', total_points: 2100, photoUrl: null },
        { id: 'user-3', name: 'Ahmad Fauzi', total_points: 1800, photoUrl: null },
        { id: 'user-4', name: 'Dewi Lestari', total_points: 1500, photoUrl: null },
        { id: 'user-5', name: 'Rudi Hermawan', total_points: 1200, photoUrl: null },
      ].slice(0, limit),
    };
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, photo_url, total_points')
    .order('total_points', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Gagal mengambil data dari database' };
  }

  return { success: true, data };
}

export async function getAllRewards(): Promise<RewardResult> {
  const supabase = createClient();

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    return {
      success: true,
      data: [
        {
          id: 'mock-reward-1',
          name: 'Tumbler Ramah Lingkungan',
          description: 'Tumbler dari bahan daur ulang, kapasitas 500ml',
          imageUrl: '/images/rewards/tumbler.png',
          points_required: 500,
          stock: 15,
          is_active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'mock-reward-2',
          name: 'Tas Belanja Kanvas',
          description: 'Tas belanja dari kanvas organik yang tahan lama',
          imageUrl: '/images/rewards/tas.png',
          points_required: 750,
          stock: 8,
          is_active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'mock-reward-3',
          name: 'Voucher Belanja 50rb',
          description: 'Voucher belanja di supermarket partner kami',
          imageUrl: '/images/rewards/voucher.png',
          points_required: 1000,
          stock: 0,
          is_active: true,
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Gagal mengambil data dari database' };
  }

  return { success: true, data };
}

export async function createReward(payload: unknown): Promise<RewardResult> {
  const supabase = createClient();

  const validation = CreateRewardSchema.safeParse(payload);

  if (!validation.success) {
    const errorMessage = validation.error.issues.map((e: { message: string }) => e.message).join(', ');
    return { success: false, error: errorMessage };
  }

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    revalidatePath('/dashboard/admin/rewards');
    return {
      success: true,
      data: {
        id: 'mock-reward-' + Date.now(),
        ...validation.data,
        createdAt: new Date().toISOString(),
      },
    };
  }

  // Map camelCase to snake_case for Supabase
  const { imageUrl, ...rest } = validation.data;
  const insertData = { ...rest, image_url: imageUrl };

  const { data, error } = await supabase
    .from('rewards')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Gagal membuat reward baru' };
  }

  revalidatePath('/dashboard/admin/rewards');
  revalidatePath('/dashboard/rewards');

  return { success: true, data };
}

export async function updateReward(payload: unknown): Promise<RewardResult> {
  const supabase = createClient();

  const validation = UpdateRewardSchema.safeParse(payload);

  if (!validation.success) {
    const errorMessage = validation.error.issues.map((e: { message: string }) => e.message).join(', ');
    return { success: false, error: errorMessage };
  }

  const { id, ...updateData } = validation.data;

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    revalidatePath('/dashboard/admin/rewards');
    revalidatePath('/dashboard/rewards');
    return {
      success: true,
      data: {
        id,
        ...updateData,
        updatedAt: new Date().toISOString(),
      },
    };
  }

  // Map camelCase to snake_case for Supabase
  const { imageUrl, is_active, ...rest } = updateData;
  const mappedUpdate = { ...rest, image_url: imageUrl, is_active: is_active };

  const { data, error } = await supabase
    .from('rewards')
    .update(mappedUpdate)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Gagal mengupdate reward' };
  }

  revalidatePath('/dashboard/admin/rewards');
  revalidatePath('/dashboard/rewards');

  return { success: true, data };
}

export async function deleteReward(rewardId: string): Promise<RewardResult> {
  const supabase = createClient();

  if (!rewardId || typeof rewardId !== 'string') {
    return { success: false, error: 'ID reward tidak valid' };
  }

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === 'true') {
    revalidatePath('/dashboard/admin/rewards');
    revalidatePath('/dashboard/rewards');
    return { success: true, data: { id: rewardId } };
  }

  const { error } = await supabase
    .from('rewards')
    .delete()
    .eq('id', rewardId);

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Gagal menghapus reward' };
  }

  revalidatePath('/dashboard/admin/rewards');
  revalidatePath('/dashboard/rewards');

  return { success: true, data: { id: rewardId } };
}
