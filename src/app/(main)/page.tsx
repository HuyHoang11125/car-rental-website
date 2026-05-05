'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Shield, Clock, Truck, ChevronRight, Quote, MapPin, CalendarDays, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CarCard } from '@/components/shared/CarCard';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockCars, mockReviews, locations } from '@/data/mock';

// ===== HERO SECTION =====
function HeroSection() {
  return (
    <section id="hero-section" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/hero-bg.png" alt="Luxury car" fill className="object-cover object-[center_60%]" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
        <h1 className="animate-fade-in-up text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[1.1] mb-5 font-[Playfair_Display,serif]">
          <span className="text-white">Lái Xe </span>
          <span className="text-gold-gradient">Đẳng Cấp</span>
        </h1>
        <p className="animate-fade-in-up delay-200 text-[clamp(1rem,2vw,1.2rem)] text-white/75 max-w-2xl mx-auto mb-10 font-light leading-relaxed tracking-wide">
          Trải nghiệm những chiếc xe danh giá nhất thế giới với dịch vụ concierge đẳng cấp quốc tế.
        </p>

        {/* Search Widget */}
        <div className="animate-fade-in-up delay-400">
          <div className="glass rounded-2xl p-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60 z-10" />
                <select className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none appearance-none" id="search-location">
                  <option value="" className="bg-dark-surface">Địa điểm nhận xe</option>
                  {locations.slice(0, 5).map(loc => (
                    <option key={loc} value={loc} className="bg-dark-surface">{loc}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
                <input type="date" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none" id="search-pickup" />
              </div>
              <div className="relative">
                <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
                <input type="date" className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none" id="search-return" />
              </div>
              <div className="relative">
                <Car size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60 z-10" />
                <select className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none appearance-none" id="search-type">
                  <option value="" className="bg-dark-surface">Loại xe</option>
                  <option value="sports" className="bg-dark-surface">Xe thể thao</option>
                  <option value="sedan" className="bg-dark-surface">Sedan cao cấp</option>
                  <option value="suv" className="bg-dark-surface">SUV hạng sang</option>
                  <option value="coupe" className="bg-dark-surface">Grand Tourer</option>
                </select>
              </div>
            </div>
            <Link
              href="/bo-suu-tap"
              className="bg-gradient-to-r from-gold to-gold-light text-black font-bold px-10 py-4 rounded-xl text-sm tracking-widest uppercase hover:shadow-[0_10px_35px_rgba(201,169,110,0.35)] transition-all duration-300 hover:-translate-y-0.5 no-underline inline-block"
            >
              Tìm xe sang
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[0.7rem] tracking-widest uppercase text-white/50">Cuộn xuống</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}

// ===== FLEET PREVIEW SECTION =====
function FleetPreview() {
  return (
    <section id="fleet-section" className="py-24 px-6 lg:px-12 bg-dark">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="BỘ SƯU TẬP"
          title="Đội Xe Cao Cấp"
          subtitle="Những chiếc xe được tuyển chọn kỹ lưỡng, đại diện cho đỉnh cao kỹ thuật ô tô"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14 max-w-6xl mx-auto">
          {mockCars.slice(0, 3).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center mt-14">
          <Link
            href="/bo-suu-tap"
            className="inline-flex items-center gap-2 border border-gold/30 text-gold hover:bg-gold hover:text-black px-8 py-3 rounded-xl text-sm tracking-wider uppercase transition-all duration-300 no-underline"
          >
            Xem toàn bộ <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== SERVICE SECTION =====
const services = [
  {
    icon: Shield,
    title: 'Bảo Hiểm Toàn Diện',
    desc: 'Bảo hiểm cao cấp đi kèm mỗi chuyến thuê xe',
  },
  {
    icon: Clock,
    title: 'Hỗ Trợ 24/7',
    desc: 'Dịch vụ concierge chuyên nghiệp mọi lúc mọi nơi',
  },
  {
    icon: Truck,
    title: 'Giao Xe Tận Nơi',
    desc: 'Chúng tôi mang sự sang trọng đến vị trí của bạn',
  },
];

function ServiceSection() {
  return (
    <section id="service-section" className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
      {/* Left - Text */}
      <div className="bg-dark py-20 px-8 lg:px-16 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
          <span className="text-gold text-xs tracking-[3px] uppercase font-medium">DỊCH VỤ CAO CẤP</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5 font-[Playfair_Display,serif] leading-tight">
          Trải Nghiệm{' '}
          <span className="text-gold-gradient">Đẳng Cấp Thượng Lưu</span>
        </h2>
        <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md font-light">
          Mỗi chi tiết đều được chăm chút tỉ mỉ cho hành trình hoàn hảo. Từ giao xe concierge đến bảo hiểm cao cấp.
        </p>
        <div className="flex flex-col gap-7">
          {services.map((service, i) => (
            <div
              key={i}
              className="flex items-start gap-5 group cursor-default transition-transform duration-300 hover:translate-x-2"
            >
              <div className="w-14 h-14 min-w-[56px] rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <service.icon size={24} className="text-gold" />
              </div>
              <div>
                <h4 className="text-white text-base font-semibold mb-1">{service.title}</h4>
                <p className="text-white/45 text-sm font-light">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Image */}
      <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
        <Image
          src="/car-interior.png"
          alt="Nội thất xe sang"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/30 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

// ===== TESTIMONIALS =====
function TestimonialsSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-darker">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="ĐÁNH GIÁ"
          title="Khách Hàng Nói Gì"
          subtitle="Những trải nghiệm thực từ khách hàng đã tin tưởng dịch vụ của chúng tôi"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-5xl mx-auto">
          {mockReviews.map((review) => (
            <Card
              key={review.id}
              className="bg-dark-card border-dark-border rounded-2xl p-6 transition-all duration-400 hover:border-gold/20 hover:-translate-y-1"
            >
              <Quote size={20} className="text-gold/30 mb-4" />
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                  {review.user.full_name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{review.user.full_name}</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={12} className="fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== CTA SECTION =====
function CTASection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-dark to-gold/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,169,110,0.08),transparent_70%)]" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[Playfair_Display,serif]">
          Sẵn Sàng Cho <span className="text-gold-gradient">Hành Trình Đẳng Cấp</span>?
        </h2>
        <p className="text-white/50 text-lg mb-10 font-light leading-relaxed">
          Đặt xe ngay hôm nay và trải nghiệm dịch vụ cho thuê xe sang hàng đầu Việt Nam.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/bo-suu-tap"
            className="bg-gradient-to-r from-gold to-gold-light text-black px-10 py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:shadow-[0_10px_35px_rgba(201,169,110,0.35)] transition-all duration-300 hover:-translate-y-0.5 no-underline inline-block"
          >
            Đặt Xe Ngay
          </Link>
          <Link
            href="/lien-he"
            className="border border-gold/30 text-gold hover:bg-gold/10 px-10 py-4 rounded-xl text-sm font-bold tracking-widest uppercase no-underline inline-block transition-all"
          >
            Liên Hệ Tư Vấn
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== HOME PAGE =====
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FleetPreview />
      <ServiceSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
