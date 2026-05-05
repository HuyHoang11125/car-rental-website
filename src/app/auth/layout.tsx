import Logo from '@/components/shared/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Logo size="lg" className="justify-center" />
        </div>
        {children}
      </div>
    </div>
  );
}
