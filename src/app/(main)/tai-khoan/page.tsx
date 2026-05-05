'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Phone, Edit3, Save, Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockUser, mockBookings } from '@/data/mock';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProfilePage() {
  const user = mockUser;
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: user.full_name,
    email: user.email,
    phone: user.phone,
  });

  const handleSave = () => {
    setEditing(false);
    toast.success('Cập nhật thông tin thành công!');
  };

  return (
    <div className="pt-24 pb-20 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-10 font-[Playfair_Display,serif]">Tài Khoản</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-dark-card border border-dark-border rounded-xl p-1 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold rounded-lg px-6">
              Thông tin
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold rounded-lg px-6">
              Lịch sử đặt xe
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-dark-card border-dark-border rounded-2xl p-8">
              <div className="flex items-center gap-5 mb-8">
                <Avatar className="w-20 h-20 border-2 border-gold/30">
                  <AvatarFallback className="bg-gold/20 text-gold text-2xl font-bold font-[Playfair_Display,serif]">
                    {user.full_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-white">{user.full_name}</h2>
                  <p className="text-white/40 text-sm">Thành viên từ {formatDate(user.date_joined)}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  className="ml-auto border-gold/30 text-gold hover:bg-gold/10 rounded-lg"
                >
                  {editing ? <><Save size={14} className="mr-1" /> Lưu</> : <><Edit3 size={14} className="mr-1" /> Sửa</>}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Họ và tên', field: 'full_name', icon: User },
                  { label: 'Email', field: 'email', icon: Mail },
                  { label: 'Số điện thoại', field: 'phone', icon: Phone },
                ].map((item) => (
                  <div key={item.field}>
                    <Label className="text-white/50 text-xs mb-2 block">{item.label}</Label>
                    <div className="relative">
                      <item.icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
                      <Input
                        value={profile[item.field as keyof typeof profile]}
                        onChange={(e) => setProfile(prev => ({ ...prev, [item.field]: e.target.value }))}
                        disabled={!editing}
                        className="pl-9 bg-dark-surface border-dark-border text-white rounded-xl h-12 disabled:opacity-60 focus:border-gold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id} className="bg-dark-card border-dark-border rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-40 h-28 rounded-xl overflow-hidden shrink-0">
                      <Image src={booking.car.image} alt={booking.car.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-bold font-[Playfair_Display,serif]">{booking.car.name}</h3>
                          <p className="text-white/40 text-xs">Đơn #{booking.id}</p>
                        </div>
                        <Badge className={`${getStatusColor(booking.status)} text-xs rounded-lg`}>
                          {getStatusLabel(booking.status)}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-white/50 text-xs mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {formatDate(booking.pickup_date)} - {formatDate(booking.return_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {formatDate(booking.created_at)}
                        </span>
                      </div>
                      <Separator className="bg-dark-border mb-3" />
                      <div className="flex items-center justify-between">
                        <span className="text-gold-gradient font-bold font-[Playfair_Display,serif]">
                          {formatCurrency(booking.total_price)}
                        </span>
                        <Link 
                          href={`/bo-suu-tap/${booking.car.id}`}
                          className="border border-gold/20 text-gold hover:bg-gold/10 rounded-lg text-xs px-3 py-1.5 no-underline transition-all"
                        >
                          Xem xe →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
