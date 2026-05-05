'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit3, Trash2, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { mockCars } from '@/data/mock';
import { formatCurrency, getCategoryLabel } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminCarsPage() {
  const [search, setSearch] = useState('');
  const cars = mockCars.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-[Playfair_Display,serif]">Quản Lý Xe</h2>
          <p className="text-white/40 text-sm">{mockCars.length} xe trong hệ thống</p>
        </div>
        <Dialog>
          <DialogTrigger className="bg-gradient-to-r from-gold to-gold-light text-black font-semibold rounded-xl gap-2 inline-flex items-center px-4 py-2 text-sm">
            <Plus size={16} /> Thêm xe mới
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-dark-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-white font-[Playfair_Display,serif]">Thêm Xe Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              {['Tên xe', 'Hãng xe', 'Model', 'Giá thuê / ngày'].map((label) => (
                <div key={label}>
                  <Label className="text-white/60 text-xs mb-2 block">{label}</Label>
                  <Input className="bg-dark-surface border-dark-border text-white rounded-xl h-11 focus:border-gold" />
                </div>
              ))}
              <Button onClick={() => toast.success('Thêm xe thành công!')} className="w-full bg-gold text-black font-semibold rounded-xl">
                Lưu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm xe..."
          className="pl-10 bg-dark-card border-dark-border text-white rounded-xl h-11 placeholder:text-white/30 focus:border-gold" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              {['Xe', 'Loại', 'Giá / ngày', 'Đánh giá', 'Trạng thái', 'Thao tác'].map(h => (
                <th key={h} className="text-left text-white/40 text-xs uppercase tracking-wider py-3 px-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-b border-dark-border/50 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0">
                      <Image src={car.image} alt={car.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{car.name}</p>
                      <p className="text-white/40 text-xs">{car.brand} • {car.year}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <Badge className="bg-gold/10 text-gold/80 border-gold/20 text-xs">{getCategoryLabel(car.category)}</Badge>
                </td>
                <td className="py-3 px-3 text-gold text-sm font-medium">{formatCurrency(car.price_per_day)}</td>
                <td className="py-3 px-3 text-white/60 text-sm">⭐ {car.rating}</td>
                <td className="py-3 px-3">
                  <Badge className={car.available ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                    {car.available ? 'Sẵn sàng' : 'Đã đặt'}
                  </Badge>
                </td>
                <td className="py-3 px-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-white/40 hover:text-gold">
                      <Edit3 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-white/40 hover:text-red-400">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
