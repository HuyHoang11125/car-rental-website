'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu không khớp!');
      return;
    }
    if (!agreed) {
      toast.error('Vui lòng đồng ý với điều khoản dịch vụ');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      router.push('/auth/dang-nhap');
      setLoading(false);
    }, 1000);
  };

  const fields = [
    { name: 'full_name', label: 'Họ và tên', type: 'text', icon: User, placeholder: 'Nguyễn Văn A' },
    { name: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'email@example.com' },
    { name: 'phone', label: 'Số điện thoại', type: 'tel', icon: Phone, placeholder: '0901234567' },
    { name: 'password', label: 'Mật khẩu', type: 'password', icon: Lock, placeholder: '••••••••' },
    { name: 'confirmPassword', label: 'Xác nhận mật khẩu', type: 'password', icon: Lock, placeholder: '••••••••' },
  ];

  return (
    <Card className="glass rounded-2xl p-8 border-dark-border">
      <h1 className="text-2xl font-bold text-white text-center mb-2 font-[Playfair_Display,serif]">
        Tạo Tài Khoản
      </h1>
      <p className="text-white/40 text-sm text-center mb-8">
        Tham gia ÉLITE để trải nghiệm dịch vụ đẳng cấp
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <Label className="text-white/60 text-xs font-medium mb-2 block">{field.label}</Label>
            <div className="relative">
              <field.icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <Input
                type={field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                value={formData[field.name as keyof typeof formData]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold"
                required
                id={`signup-${field.name}`}
              />
              {field.type === 'password' && field.name === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-start gap-2 pt-2">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
            className="mt-0.5 border-white/20 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
          />
          <Label htmlFor="terms" className="text-white/40 text-xs leading-relaxed cursor-pointer">
            Tôi đồng ý với{' '}
            <a href="#" className="text-gold">Điều khoản dịch vụ</a>
            {' '}và{' '}
            <a href="#" className="text-gold">Chính sách bảo mật</a>
          </Label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold py-6 rounded-xl text-sm tracking-widest uppercase hover:shadow-[0_10px_35px_rgba(201,169,110,0.35)] transition-all duration-300 disabled:opacity-50"
          id="signup-submit"
        >
          {loading ? 'Đang xử lý...' : 'Đăng Ký'}
        </Button>
      </form>

      <p className="text-center mt-6 text-white/40 text-sm">
        Đã có tài khoản?{' '}
        <Link href="/auth/dang-nhap" className="text-gold font-medium hover:underline no-underline">
          Đăng nhập
        </Link>
      </p>
    </Card>
  );
}
