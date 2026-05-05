'use client';

import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockBookings } from '@/data/mock';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { BookingStatus } from '@/types';
import { toast } from 'sonner';

const statusFilters = ['all', ...Object.values(BookingStatus)];

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = mockBookings.filter((b) => {
    const matchFilter = filter === 'all' || b.status === filter;
    const matchSearch = !search || b.car.name.toLowerCase().includes(search.toLowerCase()) || b.user.full_name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white font-[Playfair_Display,serif]">Đơn Đặt Xe</h2>
        <p className="text-white/40 text-sm">{mockBookings.length} đơn đặt xe</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <Button
            key={s}
            variant="outline"
            size="sm"
            onClick={() => setFilter(s)}
            className={`rounded-lg text-xs ${filter === s ? 'bg-gold/20 text-gold border-gold/40' : 'border-dark-border text-white/50 hover:border-gold/20'}`}
          >
            {s === 'all' ? 'Tất cả' : getStatusLabel(s)}
          </Button>
        ))}
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên xe hoặc khách hàng..."
          className="pl-10 bg-dark-card border-dark-border text-white rounded-xl h-11 placeholder:text-white/30 focus:border-gold" />
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              {['Mã đơn', 'Khách hàng', 'Xe', 'Thời gian', 'Địa điểm', 'Tổng tiền', 'Trạng thái', ''].map(h => (
                <th key={h} className="text-left text-white/40 text-xs uppercase tracking-wider py-3 px-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((booking) => (
              <tr key={booking.id} className="border-b border-dark-border/50 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-2 text-white text-sm font-medium">#{booking.id}</td>
                <td className="py-3 px-2">
                  <p className="text-white/70 text-sm">{booking.user.full_name}</p>
                  <p className="text-white/30 text-xs">{booking.user.email}</p>
                </td>
                <td className="py-3 px-2 text-white/70 text-sm">{booking.car.name}</td>
                <td className="py-3 px-2 text-white/50 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(booking.pickup_date)} → {formatDate(booking.return_date)}
                  </div>
                </td>
                <td className="py-3 px-2 text-white/50 text-xs max-w-[150px] truncate">{booking.pickup_location}</td>
                <td className="py-3 px-2 text-gold text-sm font-medium">{formatCurrency(booking.total_price)}</td>
                <td className="py-3 px-2">
                  <Badge className={`${getStatusColor(booking.status)} text-xs rounded-lg`}>{getStatusLabel(booking.status)}</Badge>
                </td>
                <td className="py-3 px-2">
                  <Button variant="ghost" size="sm" onClick={() => toast.success('Đã cập nhật trạng thái')}
                    className="text-gold/60 hover:text-gold text-xs">
                    Cập nhật
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-white/40">Không có đơn đặt xe nào</div>
      )}
    </div>
  );
}
