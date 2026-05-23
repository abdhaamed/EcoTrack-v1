'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';
import { redeemReward } from '@/app/actions/rewards';
import type { Reward } from '@/types/index';

interface RewardRedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward: Reward | null;
  userPoints?: number;
}

type ModalState = 'confirm' | 'processing' | 'success' | 'error';

export function RewardRedeemModal({
  isOpen,
  onClose,
  reward,
  userPoints = 0,
}: RewardRedeemModalProps) {
  const [state, setState] = useState<ModalState>('confirm');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !reward) return null;

  const canAfford = userPoints >= reward.points_required;
  const isSoldOut = reward.stock <= 0;

  const handleClose = () => {
    setState('confirm');
    setAddress('');
    setError(null);
    setErrorMessage('');
    onClose();
  };

  const handleRedeem = async () => {
    if (address.length < 10) {
      setError('Alamat pengiriman minimal 10 karakter');
      return;
    }

    setState('processing');
    setError(null);

    const result = await redeemReward({
      rewardId: reward.id,
      deliveryAddress: address,
    });

    if (result.success) {
      setState('success');
    } else {
      setState('error');
      setErrorMessage(result.error || 'Terjadi kesalahan');
    }
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-4">
        {state === 'confirm' && (
          <>
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-card bg-bone">
                {reward.imageUrl ? (
                  <img
                    src={reward.imageUrl}
                    alt={reward.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-10 w-10 text-veridian-leaf"
                    >
                      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-charcoal">{reward.name}</h3>
                <p className="mt-1 text-sm text-muted">{reward.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="warning">{reward.points_required.toLocaleString()} Poin</Badge>
                  <Badge variant={isSoldOut ? 'error' : 'success'}>
                    {isSoldOut ? 'Stok Habis' : `${reward.stock} Tersedia`}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="border-t border-mist pt-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted">Poin Anda:</span>
                <span className={`font-semibold ${canAfford ? 'text-veridian-leaf' : 'text-feedback-error'}`}>
                  {userPoints.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Sisa setelah redemption:</span>
                <span className={`font-semibold ${canAfford ? 'text-charcoal' : 'text-feedback-error'}`}>
                  {canAfford
                    ? (userPoints - reward.points_required).toLocaleString()
                    : `Butuh ${(reward.points_required - userPoints).toLocaleString()} lagi`}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-charcoal">
                Alamat Pengiriman
              </label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Masukkan alamat lengkap untuk pengiriman reward..."
                rows={3}
                error={!!error}
              />
              {error && (
                <p className="text-sm text-feedback-error">{error}</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outlined" className="flex-1" onClick={handleClose}>
                Batal
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleRedeem}
                disabled={!canAfford || isSoldOut}
              >
                Konfirmasi Redemption
              </Button>
            </div>
          </>
        )}

        {state === 'processing' && (
          <div className="flex flex-col items-center py-8">
            <Spinner size="lg" />
            <p className="mt-4 text-charcoal">Memproses...</p>
            <p className="mt-1 text-sm text-muted">Mohon tunggu sebentar</p>
          </div>
        )}

        {state === 'success' && (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-veridian-leaf">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8 text-parchment"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-charcoal">Berhasil!</h3>
            <p className="mt-2 text-sm text-muted">
              Redemption Anda sedang diproses
            </p>
            <div className="mt-4 rounded-card bg-bone p-3 text-sm">
              <p className="text-muted">Estimasi pengiriman:</p>
              <p className="font-medium text-charcoal">
                {estimatedDelivery.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <Button variant="primary" className="mt-6 w-full" onClick={handleClose}>
              Tutup
            </Button>
          </div>
        )}

        {state === 'error' && (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-feedback-error">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8 text-parchment"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-charcoal">Gagal</h3>
            <p className="mt-2 text-sm text-muted">{errorMessage}</p>
            <div className="mt-6 flex gap-3">
              <Button variant="outlined" className="flex-1" onClick={handleClose}>
                Batal
              </Button>
              <Button variant="primary" className="flex-1" onClick={() => setState('confirm')}>
                Coba Lagi
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
