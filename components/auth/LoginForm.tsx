'use client';

import { useState } from 'react';
import { signIn } from '@/app/actions/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signIn(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <Card variant="bone" className="p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-deep-forest">Selamat Datang Kembali</h2>
        <p className="text-mist text-sm mt-2">Masuk untuk melanjutkan ke dashboard</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1 text-charcoal">Email</label>
          <Input 
            name="email"
            type="email" 
            placeholder="nama@email.com" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-charcoal">Password</label>
          <Input 
            name="password"
            type="password" 
            placeholder="Masukkan password" 
            required 
          />
        </div>
        <Button type="submit" variant="primary" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? 'Memproses...' : 'Masuk'}
        </Button>
      </form>
    </Card>
  );
}
