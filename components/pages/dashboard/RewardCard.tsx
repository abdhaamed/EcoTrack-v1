"use client";

import { useState } from "react";
import { Gift, Loader2 } from "lucide-react";
import { redeemReward } from "@/app/actions/reward";
import { useRouter } from "next/navigation";

interface RewardCardProps {
  reward: {
    id: string;
    name: string;
    description: string;
    image_url: string;
    points_required: number;
    stock: number;
  };
  userId: string;
  userPoints: number;
}

export default function RewardCard({ reward, userId, userPoints }: RewardCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isOutOfStock = reward.stock <= 0;
  const isPointsNotEnough = userPoints < reward.points_required;
  const canRedeem = !isOutOfStock && !isPointsNotEnough;

  const handleRedeem = async () => {
    if (!canRedeem) return;

    if (!confirm(`Tukar ${reward.points_required} poin untuk ${reward.name}?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await redeemReward(reward.id, userId);
      if (res.success) {
        alert("Penukaran berhasil! Anda dapat melihat statusnya di riwayat.");
        router.refresh();
      } else {
        alert(`Gagal menukar: ${res.error}`);
      }
    } catch {
      alert("Terjadi kesalahan sistem saat mencoba menukar hadiah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="h-48 relative bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={reward.image_url} 
          alt={reward.name}
          className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale opacity-70' : ''}`}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Habis</span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight line-clamp-2">{reward.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{reward.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Harga</div>
            <div className="flex items-center gap-1.5 text-green-600 font-bold">
              <Gift className="w-4 h-4" />
              <span>{reward.points_required} Poin</span>
            </div>
          </div>
          
          <button
            onClick={handleRedeem}
            disabled={!canRedeem || loading}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center min-w-[90px]
              ${canRedeem 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-green-600/20' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Tukar'}
          </button>
        </div>
        
        {!isOutOfStock && (
           <div className="text-xs text-gray-400 mt-3 text-right">
             Sisa stok: {reward.stock}
           </div>
        )}
      </div>
    </div>
  );
}
