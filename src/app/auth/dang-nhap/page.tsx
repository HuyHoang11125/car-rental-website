'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/auth.store';
import { mockUser } from '@/data/mock';
import { toast } from 'sonner';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login
    setTimeout(() => {
      setUser(mockUser);
      localStorage.setItem('access_token', 'mock_access_token');
      localStorage.setItem('refresh_token', 'mock_refresh_token');
      toast.success('Đăng nhập thành công!');
      router.push('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="glass rounded-2xl p-8 border-dark-border">
      <h1 className="text-2xl font-bold text-white text-center mb-2 font-[Playfair_Display,serif]">
        Chào Mừng Trở Lại
      </h1>
      <p className="text-white/40 text-sm text-center mb-8">
        Đăng nhập để tiếp tục trải nghiệm
      </p>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {['Google', 'Facebook'].map((provider) => (
          <Button
            key={provider}
            variant="outline"
            className="border-white/10 bg-white/[0.03] text-white/70 hover:border-gold/30 hover:bg-gold/5 rounded-xl h-11"
          >
            {provider}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Separator className="bg-white/10 flex-1" />
        <span className="text-white/30 text-xs">hoặc</span>
        <Separator className="bg-white/10 flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="text-white/60 text-xs font-medium mb-2 block">Email</Label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold"
              required
              id="signin-email"
            />
          </div>
        </div>

        <div>
          <Label className="text-white/60 text-xs font-medium mb-2 block">Mật khẩu</Label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10 bg-white/5 border-white/10 text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold"
              required
              id="signin-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-gold/60 text-xs hover:text-gold transition-colors">
            Quên mật khẩu?
          </a>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold py-6 rounded-xl text-sm tracking-widest uppercase hover:shadow-[0_10px_35px_rgba(201,169,110,0.35)] transition-all duration-300 disabled:opacity-50"
          id="signin-submit"
        >
          {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
        </Button>
      </form>

      <p className="text-center mt-6 text-white/40 text-sm">
        Chưa có tài khoản?{' '}
        <Link href="/auth/dang-ky" className="text-gold font-medium hover:underline no-underline">
          Đăng ký
        </Link>
      </p>
    </Card>
  );
}
