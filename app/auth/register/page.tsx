import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4">
      <Link href="/" className="mb-8 font-bold text-3xl text-deep-forest tracking-tight">
        EcoTrack
      </Link>
      <RegisterForm />
      <p className="mt-6 text-sm text-mist">
        Sudah punya akun?{' '}
        <Link href="/auth/login" className="text-deep-forest font-medium hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
