'use client';

import { Search, Mail, Phone, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockUser, mockAdminUser } from '@/data/mock';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

const users = [
  mockUser,
  { ...mockUser, id: 2, full_name: 'Trần Minh Tuấn', email: 'tuan@gmail.com', phone: '0912345678', date_joined: '2024-03-10' },
  { ...mockUser, id: 3, full_name: 'Lê Thị Hương', email: 'huong@gmail.com', phone: '0923456789', date_joined: '2024-05-22' },
  mockAdminUser,
  { ...mockUser, id: 4, full_name: 'Phạm Đức Anh', email: 'ducanh@gmail.com', phone: '0934567890', date_joined: '2024-07-15' },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white font-[Playfair_Display,serif]">Người Dùng</h2>
        <p className="text-white/40 text-sm">{users.length} tài khoản trong hệ thống</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên hoặc email..."
          className="pl-10 bg-dark-card border-dark-border text-white rounded-xl h-11 placeholder:text-white/30 focus:border-gold" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              {['Người dùng', 'Liên hệ', 'Ngày tham gia', 'Vai trò', ''].map(h => (
                <th key={h} className="text-left text-white/40 text-xs uppercase tracking-wider py-3 px-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-dark-border/50 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border border-gold/20">
                      <AvatarFallback className="bg-gold/15 text-gold text-xs font-semibold">
                        {user.full_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white text-sm font-medium">{user.full_name}</span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="space-y-0.5">
                    <p className="text-white/60 text-xs flex items-center gap-1"><Mail size={10} /> {user.email}</p>
                    <p className="text-white/40 text-xs flex items-center gap-1"><Phone size={10} /> {user.phone}</p>
                  </div>
                </td>
                <td className="py-3 px-3 text-white/50 text-xs">{formatDate(user.date_joined)}</td>
                <td className="py-3 px-3">
                  {user.is_staff ? (
                    <Badge className="bg-gold/20 text-gold border-gold/30 gap-1 text-xs">
                      <Shield size={10} /> Admin
                    </Badge>
                  ) : (
                    <Badge className="bg-white/5 text-white/50 border-white/10 text-xs">Khách hàng</Badge>
                  )}
                </td>
                <td className="py-3 px-3">
                  <Button variant="ghost" size="sm" className="text-white/40 hover:text-gold text-xs">
                    Chi tiết
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
