'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Gauge, Users, Fuel, Cog, Zap, ChevronLeft, Calendar, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CarCard } from '@/components/shared/CarCard';
import { mockCars, mockReviews } from '@/data/mock';
import { formatCurrency, getCategoryLabel, cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth.store';

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const car = mockCars.find((c) => c.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const { isAuthenticated, user } = useAuthStore();
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [hasLocalReviewed, setHasLocalReviewed] = useState(false);

  const hasReviewed = hasLocalReviewed || (isAuthenticated && user && car && mockReviews.some(r => r.user.id === user.id && r.car.id === car.id));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để gửi đánh giá.');
      return;
    }
    if (hasReviewed) {
      toast.error('Bạn đã đánh giá chiếc xe này rồi.');
      return;
    }
    if (!reviewComment.trim()) return;
    setIsSubmittingReview(true);
    setTimeout(() => {
      toast.success('Đánh giá của bạn đã được gửi thành công!');
      setReviewComment('');
      setHasLocalReviewed(true);
      setIsSubmittingReview(false);
    }, 1000);
  };

  if (!car) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h2 className="text-2xl text-white font-bold mb-4">Không tìm thấy xe</h2>
        <Button asChild variant="outline" className="border-gold/30 text-gold">
          <Link href="/bo-suu-tap">← Quay lại bộ sưu tập</Link>
        </Button>
      </div>
    );
  }

  const similarCars = mockCars.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);
  const carImages = car.images.length > 0 ? car.images : [car.image];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <Link href="/bo-suu-tap" className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm mb-8 transition-colors no-underline">
          <ChevronLeft size={16} /> Quay lại bộ sưu tập
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left - Images & Details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px] group">
              <Image
                src={carImages[selectedImage]}
                alt={car.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-gold/20 text-gold border-gold/30 backdrop-blur-sm tracking-wider uppercase">
                {getCategoryLabel(car.category)}
              </Badge>
            </div>

            {/* Thumbnails */}
            {carImages.length > 1 && (
              <div className="flex gap-3">
                {carImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-gold' : 'border-dark-border hover:border-gold/30'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Tabs */}
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="bg-dark-card border border-dark-border rounded-xl p-1 w-full">
                <TabsTrigger value="specs" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold rounded-lg flex-1">
                  Thông số
                </TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold rounded-lg flex-1">
                  Tính năng
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold rounded-lg flex-1">
                  Đánh giá
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="mt-6">
                <Card className="bg-dark-card border-dark-border rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Cog, label: 'Động cơ', value: car.specs.engine },
                      { icon: Zap, label: 'Công suất', value: `${car.specs.horsepower} HP` },
                      { icon: Gauge, label: 'Tăng tốc', value: car.specs.acceleration },
                      { icon: Gauge, label: 'Tốc độ tối đa', value: car.specs.top_speed },
                      { icon: Cog, label: 'Hộp số', value: car.specs.transmission },
                      { icon: Users, label: 'Số chỗ', value: `${car.specs.seats} chỗ ngồi` },
                      { icon: Fuel, label: 'Nhiên liệu', value: car.specs.fuel_type },
                      { icon: Calendar, label: 'Năm sản xuất', value: String(car.year) },
                    ].map((spec, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                          <spec.icon size={18} className="text-gold" />
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">{spec.label}</p>
                          <p className="text-white text-sm font-medium">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <Card className="bg-dark-card border-dark-border rounded-2xl p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {car.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 py-2">
                        <Check size={16} className="text-gold" />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-6">
                {/* Form Đánh giá */}
                <Card className="bg-dark-surface border-dark-border rounded-2xl p-5 mb-6">
                  <h4 className="text-white font-medium mb-3">Viết đánh giá của bạn</h4>
                  {!isAuthenticated ? (
                    <div className="text-center py-6">
                      <p className="text-white/50 text-sm mb-4">Vui lòng đăng nhập để có thể để lại đánh giá cho chiếc xe này.</p>
                      <Link 
                        href="/auth/dang-nhap"
                        className="inline-block bg-gold/20 text-gold hover:bg-gold hover:text-black border border-gold/30 rounded-xl px-6 py-2 text-sm font-semibold transition-all no-underline"
                      >
                        Đăng Nhập Ngay
                      </Link>
                    </div>
                  ) : hasReviewed ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check size={24} />
                      </div>
                      <p className="text-white font-medium">Cảm ơn bạn!</p>
                      <p className="text-white/50 text-sm">Bạn đã gửi đánh giá cho chiếc xe này rồi.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <Label className="text-white/60 text-xs mb-2 block">Xếp hạng</Label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                              key={star} 
                              type="button" 
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none"
                            >
                              <Star size={20} className={star <= reviewRating ? 'fill-gold text-gold' : 'text-white/20'} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-white/60 text-xs mb-2 block">Nhận xét</Label>
                        <Textarea 
                          placeholder="Chia sẻ trải nghiệm của bạn về chiếc xe này..." 
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="bg-dark-card border-dark-border text-white rounded-xl placeholder:text-white/30 focus:border-gold min-h-[100px]"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isSubmittingReview || !reviewComment.trim()}
                        className="bg-gold text-black hover:bg-gold-light rounded-xl text-sm font-semibold px-6"
                      >
                        {isSubmittingReview ? 'Đang gửi...' : 'Gửi đánh giá'}
                      </Button>
                    </form>
                  )}
                </Card>

                {/* Danh sách Đánh giá */}
                <div className="space-y-4">
                  {mockReviews.slice(0, 2).map((review) => (
                    <Card key={review.id} className="bg-dark-card border-dark-border rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                          {review.user.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{review.user.full_name}</p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} size={10} className="fill-gold text-gold" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-white/60 text-sm italic">&ldquo;{review.comment}&rdquo;</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right - Booking Panel */}
          <div className="lg:col-span-2">
            <Card className="glass-card rounded-2xl p-6 sticky top-28 border-dark-border">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white font-[Playfair_Display,serif] mb-1">{car.name}</h1>
                <p className="text-white/40 text-sm">{car.brand} • {car.year}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <Star size={16} className="fill-gold text-gold" />
                <span className="text-gold font-medium">{car.rating}</span>
                <span className="text-white/40 text-sm">({car.review_count} đánh giá)</span>
              </div>

              {/* Supplier Info (Marketplace) */}
              {car.supplier && (
                <div className="bg-dark-surface rounded-xl p-4 mb-6 border border-dark-border">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Được cung cấp bởi</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs shrink-0 overflow-hidden relative border border-gold/30">
                      {car.supplier.logo ? (
                         <div className="absolute inset-0 bg-gold/10 flex items-center justify-center">{car.supplier.name.charAt(0)}</div>
                      ) : (
                        car.supplier.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{car.supplier.name}</p>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="fill-gold text-gold" />
                        <span className="text-white/60 text-xs">{car.supplier.rating} / 5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Separator className="bg-dark-border mb-6" />

              {/* Price */}
              <div className="mb-6">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Giá thuê</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-gold-gradient text-3xl font-bold font-[Playfair_Display,serif]">
                    {formatCurrency(car.price_per_day)}
                  </span>
                  <span className="text-white/40 text-sm">/ ngày</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Gauge, value: `${car.specs.horsepower}HP` },
                  { icon: Users, value: `${car.specs.seats} chỗ` },
                  { icon: Fuel, value: car.specs.fuel_type },
                ].map((item, i) => (
                  <div key={i} className="bg-dark-surface rounded-xl p-3 text-center">
                    <item.icon size={16} className="text-gold mx-auto mb-1" />
                    <p className="text-white/60 text-xs">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Booking Inputs */}
              <div className="space-y-3 mb-6">
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
                  <select className="w-full bg-dark-surface border border-dark-border text-white text-sm rounded-xl py-3 pl-9 pr-4 appearance-none focus:border-gold outline-none">
                    <option value="">Chọn địa điểm</option>
                    <option value="tan-son-nhat">Sân bay Tân Sơn Nhất</option>
                    <option value="q1">Quận 1, TP.HCM</option>
                    <option value="q7">Quận 7, TP.HCM</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
                    <input type="date" className="w-full bg-dark-surface border border-dark-border text-white text-sm rounded-xl py-3 pl-9 pr-3 focus:border-gold outline-none" />
                  </div>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
                    <input type="date" className="w-full bg-dark-surface border border-dark-border text-white text-sm rounded-xl py-3 pl-9 pr-3 focus:border-gold outline-none" />
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <Link
                href={`/dat-xe?car=${car.id}`}
                className={cn(
                  "w-full bg-gradient-to-r from-gold to-gold-light text-black font-bold py-4 rounded-xl text-sm tracking-widest uppercase hover:shadow-[0_10px_35px_rgba(201,169,110,0.35)] transition-all duration-300 hover:-translate-y-0.5 no-underline inline-flex justify-center items-center",
                  !car.available && "opacity-50 pointer-events-none"
                )}
              >
                {car.available ? 'Đặt Xe Ngay' : 'Xe Đã Được Đặt'}
              </Link>

              <p className="text-white/30 text-xs text-center mt-3">
                Miễn phí hủy trước 24 giờ
              </p>
            </Card>
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <section className="mt-20">
            <h3 className="text-2xl font-bold text-white mb-8 font-[Playfair_Display,serif]">Xe Tương Tự</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {similarCars.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
