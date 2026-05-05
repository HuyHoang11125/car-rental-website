'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Fuel, Users, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, getCategoryLabel } from '@/lib/utils';
import type { Car } from '@/types';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Card className="card-glow group relative rounded-2xl overflow-hidden bg-dark-card border-dark-border cursor-pointer">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Category Badge */}
        <Badge className="absolute top-4 left-4 bg-gold/20 text-gold border border-gold/30 backdrop-blur-sm text-xs tracking-wider uppercase">
          {getCategoryLabel(car.category)}
        </Badge>

        {/* Availability */}
        {!car.available && (
          <Badge className="absolute top-4 right-4 bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-sm">
            Đã đặt
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <Star size={14} className="fill-gold text-gold" />
          <span className="text-gold text-sm font-medium">{car.rating}</span>
          <span className="text-white/40 text-xs">({car.review_count} đánh giá)</span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-white mb-1 font-[Playfair_Display,serif] group-hover:text-gold transition-colors">
          {car.name}
        </h3>

        {/* Specs Row */}
        <div className="flex items-center gap-4 text-white/50 text-xs mb-4">
          <span className="flex items-center gap-1">
            <Gauge size={12} /> {car.specs.horsepower} HP
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {car.specs.seats} chỗ
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={12} /> {car.specs.fuel_type}
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gold/10">
          <div>
            <span className="text-gold-gradient text-xl font-bold font-[Playfair_Display,serif]">
              {formatCurrency(car.price_per_day)}
            </span>
            <span className="text-white/40 text-xs ml-1">/ ngày</span>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-transparent border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 rounded-lg text-xs font-semibold tracking-wide"
          >
            <Link href={`/bo-suu-tap/${car.id}`}>
              Chi tiết →
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function CarCardSkeleton() {
  return (
    <Card className="rounded-2xl overflow-hidden bg-dark-card border-dark-border">
      <Skeleton className="h-64 w-full bg-dark-surface" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20 bg-dark-surface" />
        <Skeleton className="h-6 w-3/4 bg-dark-surface" />
        <Skeleton className="h-4 w-1/2 bg-dark-surface" />
        <div className="flex justify-between pt-4 border-t border-dark-border">
          <Skeleton className="h-6 w-28 bg-dark-surface" />
          <Skeleton className="h-8 w-20 bg-dark-surface rounded-lg" />
        </div>
      </div>
    </Card>
  );
}
