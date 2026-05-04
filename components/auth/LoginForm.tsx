'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) onSuccess();
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <Card variant="bone" className="p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-deep-forest">Selamat Datang Kembali</h2>
        <p className="text-mist text-sm mt-2">Masuk untuk melanjutkan ke dashboard</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-charcoal">Email</label>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="nama@email.com" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-charcoal">Password</label>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
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
