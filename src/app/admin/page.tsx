'use client';

import { Car, FileText, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockDashboardStats, mockBookings } from '@/data/mock';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';

const stats = [
  {
    label: 'Tổng xe',
    value: mockDashboardStats.total_cars,
    icon: Car,
    change: '+3',
    trend: 'up',
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
  },
  {
    label: 'Đơn đặt xe',
    value: mockDashboardStats.total_bookings,
    icon: FileText,
    change: '+12',
    trend: 'up',
    color: 'from-green-500/20 to-green-600/5',
    iconColor: 'text-green-400',
  },
  {
    label: 'Doanh thu',
    value: formatCurrency(mockDashboardStats.total_revenue),
    icon: TrendingUp,
    change: '+18%',
    trend: 'up',
    color: 'from-gold/20 to-gold/5',
    iconColor: 'text-gold',
  },
  {
    label: 'Khách hàng',
    value: mockDashboardStats.total_users,
    icon: Users,
    change: '+5',
    trend: 'up',
    color: 'from-purple-500/20 to-purple-600/5',
    iconColor: 'text-purple-400',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white font-[Playfair_Display,serif] mb-1">Tổng Quan</h2>
        <p className="text-white/40 text-sm">Chào mừng trở lại! Đây là tình hình hoạt động hôm nay.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Card key={stat.label} className={`bg-gradient-to-br ${stat.color} border-dark-border rounded-2xl p-5 transition-all duration-300 hover:border-gold/20`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.iconColor}`}>
                <stat.icon size={20} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </span>
            </div>
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-white text-2xl font-bold font-[Playfair_Display,serif]">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="bg-dark-card border-dark-border rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-6">Doanh Thu Theo Tháng</h3>
        <div className="flex items-end gap-4 h-48">
          {mockDashboardStats.monthly_revenue.map((item) => {
            const maxRevenue = Math.max(...mockDashboardStats.monthly_revenue.map(m => m.revenue));
            const height = (item.revenue / maxRevenue) * 100;
            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-white/40 text-[10px]">{formatCurrency(item.revenue)}</span>
                <div
                  className="w-full bg-gradient-to-t from-gold/60 to-gold/20 rounded-t-lg transition-all duration-500 hover:from-gold hover:to-gold/40"
                  style={{ height: `${height}%` }}
                />
                <span className="text-white/50 text-xs">{item.month}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card className="bg-dark-card border-dark-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold">Đơn Đặt Gần Đây</h3>
          <Badge className="bg-gold/10 text-gold border-gold/20 text-xs">
            {mockBookings.length} đơn
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                {['Mã đơn', 'Khách hàng', 'Xe', 'Ngày thuê', 'Tổng tiền', 'Trạng thái'].map((h) => (
                  <th key={h} className="text-left text-white/40 text-xs uppercase tracking-wider py-3 px-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-dark-border/50 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-2 text-white text-sm font-medium">#{booking.id}</td>
                  <td className="py-3 px-2 text-white/70 text-sm">{booking.user.full_name}</td>
                  <td className="py-3 px-2 text-white/70 text-sm">{booking.car.name}</td>
                  <td className="py-3 px-2 text-white/50 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(booking.pickup_date)}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gold text-sm font-medium">{formatCurrency(booking.total_price)}</td>
                  <td className="py-3 px-2">
                    <Badge className={`${getStatusColor(booking.status)} text-xs rounded-lg`}>
                      {getStatusLabel(booking.status)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
