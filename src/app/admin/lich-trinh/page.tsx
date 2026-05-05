'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCars, mockBookings } from '@/data/mock';
import { BookingStatus } from '@/types';

export default function AdminSchedulerPage() {
  const [currentDate, setCurrentDate] = useState(new Date('2026-05-01'));
  const [search, setSearch] = useState('');

  // Generate an array of 14 days starting from currentDate
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  const filteredCars = mockCars.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.brand.toLowerCase().includes(search.toLowerCase())
  );

  const getBookingForCarAndDate = (carId: number, date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockBookings.find(b => {
      const isForCar = b.car.id === carId;
      const isDateInRange = dateStr >= b.pickup_date && dateStr <= b.return_date;
      const isActive = b.status !== BookingStatus.CANCELLED;
      return isForCar && isDateInRange && isActive;
    });
  };

  const shiftDate = (daysCount: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + daysCount);
    setCurrentDate(d);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-[Playfair_Display,serif]">Lịch Trình Đội Xe</h2>
          <p className="text-white/40 text-sm">Quản lý và theo dõi tình trạng xe theo thời gian thực</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => shiftDate(-7)} className="border-dark-border text-white hover:text-gold hover:border-gold/30">
            <ChevronLeft size={16} /> Tuần trước
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-surface border border-dark-border rounded-xl text-white text-sm">
            <CalendarIcon size={16} className="text-gold" />
            {currentDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
          </div>
          <Button variant="outline" onClick={() => shiftDate(7)} className="border-dark-border text-white hover:text-gold hover:border-gold/30">
            Tuần sau <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <Card className="bg-dark-card border-dark-border rounded-2xl p-6">
        <div className="mb-6 max-w-sm relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <Input 
            placeholder="Tìm xe..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-dark-surface border-dark-border text-white rounded-xl focus:border-gold h-10" 
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left border-b border-r border-dark-border min-w-[200px] text-white/40 text-xs uppercase tracking-wider font-medium sticky left-0 bg-dark-card z-10">Xe</th>
                {days.map((d, i) => (
                  <th key={i} className="p-3 text-center border-b border-dark-border min-w-[60px] text-xs">
                    <div className="text-white/40 mb-1">{d.toLocaleDateString('vi-VN', { weekday: 'short' })}</div>
                    <div className={`font-medium ${d.getDay() === 0 || d.getDay() === 6 ? 'text-gold' : 'text-white'}`}>
                      {d.getDate()}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCars.map(car => (
                <tr key={car.id} className="border-b border-dark-border/50 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-3 border-r border-dark-border sticky left-0 bg-dark-card group-hover:bg-dark-surface transition-colors">
                    <div className="font-medium text-white text-sm">{car.name}</div>
                    <div className="text-white/40 text-xs">{car.brand}</div>
                  </td>
                  {days.map((d, i) => {
                    const booking = getBookingForCarAndDate(car.id, d);
                    const isStart = booking && booking.pickup_date === d.toISOString().split('T')[0];
                    const isEnd = booking && booking.return_date === d.toISOString().split('T')[0];
                    
                    return (
                      <td key={i} className="p-1 border-r border-dark-border/20 relative h-12">
                        {booking ? (
                          <div className={`absolute inset-y-1 left-0 right-0 bg-gold/20 border-y border-gold/40 flex items-center justify-center text-[10px] font-bold text-gold
                            ${isStart ? 'rounded-l-lg border-l ml-1' : ''}
                            ${isEnd ? 'rounded-r-lg border-r mr-1' : ''}
                          `}>
                            {isStart && <span className="truncate px-2 whitespace-nowrap">Đơn #{booking.id}</span>}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/10 text-xs cursor-pointer hover:bg-gold/5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            +
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
