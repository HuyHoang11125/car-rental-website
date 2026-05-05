'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/shared/SectionHeader';
import { toast } from 'sonner';

const contactInfo = [
  { icon: MapPin, label: 'Địa chỉ', value: '123 Đường Luxury, Quận 1, TP. Hồ Chí Minh' },
  { icon: Phone, label: 'Điện thoại', value: '+84 28 1234 5678' },
  { icon: Mail, label: 'Email', value: 'contact@elite-rental.com' },
  { icon: Clock, label: 'Giờ làm việc', value: 'T2 - CN: 8:00 - 22:00' },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-20">
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-gold/5 to-transparent">
        <SectionHeader label="LIÊN HỆ" title="Liên Hệ Với Chúng Tôi" subtitle="Đội ngũ tư vấn sẵn sàng hỗ trợ bạn 24/7" />
      </section>

      <section className="px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-white text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-3 bg-dark-card border-dark-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 font-[Playfair_Display,serif]">Gửi Tin Nhắn</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/60 text-xs mb-2 block">Họ và tên</Label>
                  <Input placeholder="Nhập họ tên" className="bg-dark-surface border-dark-border text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold" required />
                </div>
                <div>
                  <Label className="text-white/60 text-xs mb-2 block">Email</Label>
                  <Input type="email" placeholder="email@example.com" className="bg-dark-surface border-dark-border text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold" required />
                </div>
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-2 block">Số điện thoại</Label>
                <Input type="tel" placeholder="0901234567" className="bg-dark-surface border-dark-border text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold" />
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-2 block">Nội dung</Label>
                <Textarea placeholder="Nhập nội dung tin nhắn..." className="bg-dark-surface border-dark-border text-white rounded-xl placeholder:text-white/30 focus:border-gold min-h-[120px]" required />
              </div>
              <Button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold py-6 rounded-xl text-sm tracking-widest uppercase hover:shadow-[0_10px_35px_rgba(201,169,110,0.35)] transition-all disabled:opacity-50 gap-2">
                <Send size={16} /> {loading ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
