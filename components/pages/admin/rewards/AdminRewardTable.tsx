'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { AdminRewardForm, type CreateRewardData } from './AdminRewardForm';
import { createReward, updateReward, deleteReward } from '@/app/actions/rewards';
import type { Reward } from '@/types/index';

interface AdminRewardTableProps {
  rewards: Reward[];
}

export function AdminRewardTable({ rewards }: AdminRewardTableProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [deletingReward, setDeletingReward] = useState<Reward | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = () => {
    setEditingReward(null);
    setIsFormOpen(true);
  };

  const handleEdit = (reward: Reward) => {
    setEditingReward(reward);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: CreateRewardData) => {
    setIsSubmitting(true);
    try {
      if (editingReward) {
        const result = await updateReward({ id: editingReward.id, ...data });
        if (!result.success) {
          throw new Error(result.error || 'Gagal mengupdate reward');
        }
      } else {
        const result = await createReward(data);
        if (!result.success) {
          throw new Error(result.error || 'Gagal membuat reward');
        }
      }
      window.location.reload();
    } catch (err) {
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingReward) return;
    setIsDeleting(true);
    try {
      const result = await deleteReward(deletingReward.id);
      if (!result.success) {
        throw new Error(result.error || 'Gagal menghapus reward');
      }
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsDeleting(false);
      setDeletingReward(null);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleCreate}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tambah Reward
          </Button>
        </div>

        {rewards.length === 0 ? (
          <Card variant="bone" className="p-8 text-center">
            <p className="text-muted">Belum ada reward tersedia</p>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-container">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal">Nama</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal">Poin</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal">Stok</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-charcoal">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((reward) => (
                  <tr key={reward.id} className="border-b border-container hover:bg-bone/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[10px] bg-bone overflow-hidden flex-shrink-0">
                          {reward.imageUrl ? (
                            <img src={reward.imageUrl} alt={reward.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted text-xs">No img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">{reward.name}</p>
                          <p className="text-xs text-muted truncate max-w-[200px]">{reward.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-veridian-leaf">{reward.points_required.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={reward.stock === 0 ? 'text-red-500' : 'text-charcoal'}>
                        {reward.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={reward.is_active ? 'success' : 'neutral'}>
                        {reward.is_active ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={() => handleEdit(reward)} className="px-3 py-1.5">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </Button>
                        <Button variant="ghost" onClick={() => setDeletingReward(reward)} className="px-3 py-1.5 text-red-500 hover:bg-red-50">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminRewardForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingReward}
        mode={editingReward ? 'edit' : 'create'}
      />

      <Modal isOpen={!!deletingReward} onClose={() => setDeletingReward(null)}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-charcoal">Hapus Reward</h2>
          <p className="text-muted">
            Apakah Anda yakin ingin menghapus reward <strong>{deletingReward?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setDeletingReward(null)} className="flex-1">
              Batal
            </Button>
            <Button variant="primary" onClick={handleDelete} disabled={isDeleting} className="flex-1 bg-red-500 hover:bg-red-600">
              {isDeleting ? 'Menghapus...' : 'Hapus'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
