'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import type { Reward } from '@/types/index';

interface AdminRewardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRewardData) => Promise<void>;
  initialData?: Reward | null;
  mode: 'create' | 'edit';
}

export interface CreateRewardData {
  name: string;
  description: string;
  imageUrl: string;
  points_required: number;
  stock: number;
  is_active: boolean;
}

export function AdminRewardForm({ isOpen, onClose, onSubmit, initialData, mode }: AdminRewardFormProps) {
  const [formData, setFormData] = useState<CreateRewardData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    imageUrl: initialData?.imageUrl || '',
    points_required: initialData?.points_required || 0,
    stock: initialData?.stock || 0,
    is_active: initialData?.is_active ?? true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-charcoal">
            {mode === 'create' ? 'Tambah Reward Baru' : 'Edit Reward'}
          </h2>
          <button onClick={onClose} className="text-muted hover:text-charcoal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-[10px] text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Nama Reward</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Tumbler Ramah Lingkungan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Deskripsi</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deskripsi detail reward..."
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">URL Gambar</label>
            <Input
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.png"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Poin Needed</label>
              <Input
                name="points_required"
                type="number"
                min={1}
                value={formData.points_required}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Stok</label>
              <Input
                name="stock"
                type="number"
                min={0}
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 rounded border-mist text-veridian-leaf focus:ring-veridian-leaf"
            />
            <label htmlFor="is_active" className="text-sm text-charcoal">
              Reward aktif dan dapat ditukar
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading} className="flex-1">
              {isLoading ? 'Menyimpan...' : mode === 'create' ? 'Buat Reward' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
