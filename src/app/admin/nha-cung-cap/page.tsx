'use client';

import { useState } from 'react';
import { Plus, Edit3, Trash2, Search, Star, Mail, Phone, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { mockSuppliers, mockCars } from '@/data/mock';
import { toast } from 'sonner';

export default function AdminSuppliersPage() {
  const [search, setSearch] = useState('');
  const suppliers = mockSuppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const getCarCountForSupplier = (supplierId: number) => {
    return mockCars.filter(c => c.supplier?.id === supplierId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-[Playfair_Display,serif]">Nhà Cung Cấp (Marketplace)</h2>
          <p className="text-white/40 text-sm">Quản lý đối tác và nhà cung cấp xe trên hệ thống</p>
        </div>
        <Dialog>
          <DialogTrigger className="bg-gradient-to-r from-gold to-gold-light text-black font-semibold rounded-xl gap-2 inline-flex items-center px-4 py-2 text-sm hover:shadow-[0_4px_15px_rgba(201,169,110,0.2)] transition-all">
            <Plus size={16} /> Thêm nhà cung cấp
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-dark-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-white font-[Playfair_Display,serif]">Thêm Đối Tác Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label className="text-white/60 text-xs mb-2 block">Tên nhà cung cấp</Label>
                <Input className="bg-dark-surface border-dark-border text-white rounded-xl h-11 focus:border-gold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/60 text-xs mb-2 block">Email liên hệ</Label>
                  <Input type="email" className="bg-dark-surface border-dark-border text-white rounded-xl h-11 focus:border-gold" />
                </div>
                <div>
                  <Label className="text-white/60 text-xs mb-2 block">Số điện thoại</Label>
                  <Input type="tel" className="bg-dark-surface border-dark-border text-white rounded-xl h-11 focus:border-gold" />
                </div>
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-2 block">Địa chỉ trụ sở</Label>
                <Input className="bg-dark-surface border-dark-border text-white rounded-xl h-11 focus:border-gold" />
              </div>
              <Button onClick={() => toast.success('Thêm nhà cung cấp thành công!')} className="w-full bg-gold text-black font-semibold rounded-xl mt-4">
                Lưu Thông Tin
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <Input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm nhà cung cấp..."
          className="pl-10 bg-dark-card border-dark-border text-white rounded-xl h-11 placeholder:text-white/30 focus:border-gold max-w-md" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="bg-dark-card border-dark-border rounded-2xl p-6 hover:border-gold/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-xl bg-dark-surface border border-dark-border flex items-center justify-center text-gold font-bold text-lg overflow-hidden relative">
                  {supplier.logo ? (
                     <div className="absolute inset-0 bg-gold/10 flex items-center justify-center">{supplier.name.charAt(0)}</div>
                  ) : (
                    supplier.name.charAt(0)
                  )}
                </div>
                <div>
                  <h3 className="text-white font-bold">{supplier.name}</h3>
                  <div className="flex items-center gap-1 text-white/50 text-xs mt-1">
                    <Star size={12} className="fill-gold text-gold" />
                    <span>{supplier.rating} / 5.0</span>
                  </div>
                </div>
              </div>
              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-white/40 hover:text-gold rounded-lg">
                  <Edit3 size={14} />
                </Button>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Mail size={14} className="text-gold/60" />
                <span>{supplier.contact_email}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Phone size={14} className="text-gold/60" />
                <span>{supplier.contact_phone}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={14} className="text-gold/60" />
                <span className="truncate">{supplier.address}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-dark-border flex justify-between items-center">
              <div className="text-white/40 text-xs">Tổng số xe:</div>
              <div className="text-gold font-bold">{getCarCountForSupplier(supplier.id)} xe</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
