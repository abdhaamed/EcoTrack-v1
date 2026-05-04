import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4">
      <Link href="/" className="mb-8 font-bold text-3xl text-deep-forest tracking-tight">
        EcoTrack
      </Link>
      <LoginForm />
      <p className="mt-6 text-sm text-mist">
        Belum punya akun?{' '}
        <Link href="/auth/register" className="text-deep-forest font-medium hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
