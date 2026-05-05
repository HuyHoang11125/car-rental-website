'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, CalendarDays, ChevronLeft, Check, CreditCard, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { mockCars, locations } from '@/data/mock';
import { formatCurrency, calculateDays } from '@/lib/utils';
import { toast } from 'sonner';

const steps = [
  { id: 1, label: 'Thông tin', icon: FileText },
  { id: 2, label: 'Xác nhận', icon: Check },
  { id: 3, label: 'Thanh toán', icon: CreditCard },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const carId = Number(searchParams.get('car') || 1);
  const car = mockCars.find((c) => c.id === carId) || mockCars[0];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
    notes: '',
  });
  const [paymentType, setPaymentType] = useState<'full' | 'deposit'>('full');
  const [loading, setLoading] = useState(false);

  const days = formData.pickupDate && formData.returnDate
    ? calculateDays(formData.pickupDate, formData.returnDate)
    : 0;
  const totalPrice = days * car.price_per_day;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.pickupDate || !formData.returnDate || !formData.pickupLocation) {
        toast.error('Vui lòng điền đầy đủ thông tin!');
        return;
      }
    }
    if (step < 3) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => {
        toast.success('Đặt xe thành công!');
        router.push('/tai-khoan/don-hang');
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <Link href={`/bo-suu-tap/${car.id}`} className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm mb-8 transition-colors no-underline">
          <ChevronLeft size={16} /> Quay lại
        </Link>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s.id ? 'bg-gold text-black' : 'bg-dark-surface text-white/40 border border-dark-border'
              }`}>
                {step > s.id ? <Check size={16} /> : s.id}
              </div>
              <span className={`text-xs tracking-wider hidden sm:inline ${step >= s.id ? 'text-gold' : 'text-white/30'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`w-12 h-px mx-2 ${step > s.id ? 'bg-gold' : 'bg-dark-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="bg-dark-card border-dark-border rounded-2xl p-6 space-y-5">
                <h2 className="text-xl font-bold text-white font-[Playfair_Display,serif]">Thông Tin Đặt Xe</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/60 text-xs mb-2 block">Ngày nhận xe</Label>
                    <div className="relative">
                      <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
                      <Input type="date" value={formData.pickupDate} onChange={(e) => handleChange('pickupDate', e.target.value)}
                        className="pl-9 bg-dark-surface border-dark-border text-white rounded-xl h-12 focus:border-gold" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-2 block">Ngày trả xe</Label>
                    <div className="relative">
                      <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
                      <Input type="date" value={formData.returnDate} onChange={(e) => handleChange('returnDate', e.target.value)}
                        className="pl-9 bg-dark-surface border-dark-border text-white rounded-xl h-12 focus:border-gold" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-white/60 text-xs mb-2 block">Địa điểm nhận xe</Label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60 z-10" />
                    <select value={formData.pickupLocation} onChange={(e) => handleChange('pickupLocation', e.target.value)}
                      className="w-full bg-dark-surface border border-dark-border text-white rounded-xl py-3 pl-9 pr-4 text-sm appearance-none focus:border-gold outline-none">
                      <option value="">Chọn địa điểm</option>
                      {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-white/60 text-xs mb-2 block">Địa điểm trả xe</Label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60 z-10" />
                    <select value={formData.returnLocation} onChange={(e) => handleChange('returnLocation', e.target.value)}
                      className="w-full bg-dark-surface border border-dark-border text-white rounded-xl py-3 pl-9 pr-4 text-sm appearance-none focus:border-gold outline-none">
                      <option value="">Cùng địa điểm nhận</option>
                      {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                </div>

                {/* Bản đồ Placeholder */}
                {(formData.pickupLocation || formData.returnLocation) && (
                  <div className="h-48 bg-dark-surface border border-dark-border rounded-xl relative overflow-hidden mt-2">
                    <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=10.7769,106.7009&zoom=12&size=600x200&style=feature:all|element:labels.text.fill|color:0x8a8a8a&style=feature:all|element:labels.text.stroke|visibility:on|color:0x000000|weight:2&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x144b53|lightness:14|weight:1.4&style=feature:landscape|element:all|color:0x08304b&style=feature:poi|element:geometry|color:0x0c4152|lightness:5&style=feature:road.highway|element:geometry.fill|color:0x000000&style=feature:road.highway|element:geometry.stroke|color:0x0b434f|lightness:25&style=feature:road.arterial|element:geometry.fill|color:0x000000&style=feature:road.arterial|element:geometry.stroke|color:0x0b3d51|lightness:16&style=feature:road.local|element:geometry|color:0x000000&style=feature:transit|element:all|color:0x146474&style=feature:water|element:all|color:0x021019')] bg-cover bg-center opacity-60"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <div className="bg-black/80 backdrop-blur border border-gold/30 px-4 py-2 rounded-lg text-gold text-xs font-medium">
                        Hiển thị tuyến đường trên bản đồ (Demo)
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-white/60 text-xs mb-2 block">Ghi chú (tùy chọn)</Label>
                  <Textarea value={formData.notes} onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Yêu cầu đặc biệt..." className="bg-dark-surface border-dark-border text-white rounded-xl placeholder:text-white/30 focus:border-gold min-h-[80px]" />
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="bg-dark-card border-dark-border rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-white font-[Playfair_Display,serif]">Xác Nhận Thông Tin</h2>
                {[
                  { label: 'Ngày nhận', value: formData.pickupDate },
                  { label: 'Ngày trả', value: formData.returnDate },
                  { label: 'Số ngày', value: `${days} ngày` },
                  { label: 'Nơi nhận', value: formData.pickupLocation },
                  { label: 'Nơi trả', value: formData.returnLocation || formData.pickupLocation },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-dark-border last:border-0">
                    <span className="text-white/40 text-sm">{item.label}</span>
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  </div>
                ))}
                {formData.notes && (
                  <div className="pt-2">
                    <p className="text-white/40 text-xs mb-1">Ghi chú:</p>
                    <p className="text-white/70 text-sm">{formData.notes}</p>
                  </div>
                )}
              </Card>
            )}

            {step === 3 && (
              <Card className="bg-dark-card border-dark-border rounded-2xl p-6 space-y-5">
                <h2 className="text-xl font-bold text-white font-[Playfair_Display,serif] mb-4">Phương thức thanh toán</h2>
                
                {/* Lựa chọn Thanh toán */}
                <div className="space-y-3 mb-6">
                  <Label className="text-white/60 text-xs block">Lựa chọn thanh toán</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentType('full')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        paymentType === 'full' 
                          ? 'bg-gold/10 border-gold/50' 
                          : 'bg-dark-surface border-dark-border hover:border-gold/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-semibold ${paymentType === 'full' ? 'text-gold' : 'text-white'}`}>Toàn bộ</span>
                        {paymentType === 'full' && <Check size={14} className="text-gold" />}
                      </div>
                      <p className="text-white/50 text-xs">Thanh toán 100% trước</p>
                      <p className="text-white font-bold mt-2">{formatCurrency(totalPrice)}</p>
                    </button>
                    <button
                      onClick={() => setPaymentType('deposit')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        paymentType === 'deposit' 
                          ? 'bg-gold/10 border-gold/50' 
                          : 'bg-dark-surface border-dark-border hover:border-gold/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-semibold ${paymentType === 'deposit' ? 'text-gold' : 'text-white'}`}>Đặt cọc 30%</span>
                        {paymentType === 'deposit' && <Check size={14} className="text-gold" />}
                      </div>
                      <p className="text-white/50 text-xs">Thanh toán 70% tại quầy</p>
                      <p className="text-white font-bold mt-2">{formatCurrency(totalPrice * 0.3)}</p>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Thẻ tín dụng', value: 'card' },
                    { label: 'Chuyển khoản', value: 'bank' },
                    { label: 'Ví điện tử', value: 'ewallet' },
                  ].map((m) => (
                    <Button key={m.value} variant="outline" className="border-dark-border text-white/60 hover:border-gold/30 hover:text-gold rounded-xl h-12 text-xs">
                      {m.label}
                    </Button>
                  ))}
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-white/60 text-xs mb-2 block">Số thẻ</Label>
                    <Input placeholder="1234 5678 9012 3456" className="bg-dark-surface border-dark-border text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-white/60 text-xs mb-2 block">Ngày hết hạn</Label>
                      <Input placeholder="MM/YY" className="bg-dark-surface border-dark-border text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold" />
                    </div>
                    <div>
                      <Label className="text-white/60 text-xs mb-2 block">CVV</Label>
                      <Input placeholder="123" className="bg-dark-surface border-dark-border text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold" />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="border-dark-border text-white/60 hover:border-gold/30 hover:text-gold rounded-xl">
                  ← Quay lại
                </Button>
              ) : <div />}
              <Button onClick={handleNext} disabled={loading}
                className="bg-gradient-to-r from-gold to-gold-light text-black font-bold px-8 py-3 rounded-xl text-sm tracking-wider uppercase hover:shadow-[0_10px_35px_rgba(201,169,110,0.35)] transition-all disabled:opacity-50">
                {loading ? 'Đang xử lý...' : step === 3 ? 'Xác Nhận Thanh Toán' : 'Tiếp tục →'}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="glass-card rounded-2xl p-5 border-dark-border sticky top-28">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Tóm tắt đơn</h3>
              <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                <Image src={car.image} alt={car.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h4 className="text-white font-bold font-[Playfair_Display,serif] mb-1">{car.name}</h4>
              <p className="text-white/40 text-xs mb-4">{car.brand} • {car.year}</p>
              <Separator className="bg-dark-border mb-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">{formatCurrency(car.price_per_day)} × {days || 0} ngày</span>
                  <span className="text-white">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Bảo hiểm</span>
                  <span className="text-green-400">Miễn phí</span>
                </div>
              </div>
              <Separator className="bg-dark-border my-4" />
              <div className="flex justify-between">
                <span className="text-white font-semibold">Tổng cộng</span>
                <span className="text-white text-xl font-bold font-[Playfair_Display,serif]">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t border-dark-border">
                <span className="text-gold font-semibold text-sm">Cần thanh toán ngay</span>
                <span className="text-gold-gradient text-xl font-bold font-[Playfair_Display,serif]">
                  {formatCurrency(paymentType === 'deposit' ? totalPrice * 0.3 : totalPrice)}
                </span>
              </div>
              {paymentType === 'deposit' && (
                <div className="flex justify-between mt-1">
                  <span className="text-white/40 text-xs">Thanh toán tại quầy</span>
                  <span className="text-white/60 text-xs">{formatCurrency(totalPrice * 0.7)}</span>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white/50">Đang tải...</div>}>
      <BookingContent />
    </Suspense>
  );
}
