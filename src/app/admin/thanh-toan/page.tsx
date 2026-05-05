'use client';

import { CreditCard, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { mockBookings } from '@/data/mock';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';

const payments = mockBookings.map((b, i) => ({
  id: i + 1,
  booking_id: b.id,
  customer: b.user.full_name,
  car: b.car.name,
  amount: b.total_price,
  method: ['Thẻ tín dụng', 'Chuyển khoản', 'Ví MoMo'][i % 3],
  status: ['paid', 'paid', 'pending'][i % 3],
  date: b.created_at,
}));

export default function AdminPaymentsPage() {
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white font-[Playfair_Display,serif]">Thanh Toán</h2>
        <p className="text-white/40 text-sm">{payments.length} giao dịch</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-dark-card border-dark-border rounded-2xl p-5">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Tổng thu</p>
          <p className="text-gold text-2xl font-bold font-[Playfair_Display,serif]">{formatCurrency(totalPaid)}</p>
        </Card>
        <Card className="bg-dark-card border-dark-border rounded-2xl p-5">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Đã thanh toán</p>
          <p className="text-green-400 text-2xl font-bold">{payments.filter(p => p.status === 'paid').length}</p>
        </Card>
        <Card className="bg-dark-card border-dark-border rounded-2xl p-5">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Đang chờ</p>
          <p className="text-yellow-400 text-2xl font-bold">{payments.filter(p => p.status === 'pending').length}</p>
        </Card>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              {['Mã GD', 'Khách hàng', 'Xe', 'Số tiền', 'Phương thức', 'Ngày', 'Trạng thái'].map(h => (
                <th key={h} className="text-left text-white/40 text-xs uppercase tracking-wider py-3 px-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-dark-border/50 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-2 text-white text-sm font-medium">#{p.id}</td>
                <td className="py-3 px-2 text-white/70 text-sm">{p.customer}</td>
                <td className="py-3 px-2 text-white/60 text-sm">{p.car}</td>
                <td className="py-3 px-2 text-gold text-sm font-medium">{formatCurrency(p.amount)}</td>
                <td className="py-3 px-2">
                  <span className="flex items-center gap-1.5 text-white/50 text-xs">
                    <CreditCard size={12} /> {p.method}
                  </span>
                </td>
                <td className="py-3 px-2 text-white/50 text-xs">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(p.date)}</span>
                </td>
                <td className="py-3 px-2">
                  <Badge className={`${getStatusColor(p.status)} text-xs rounded-lg`}>{getStatusLabel(p.status)}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
