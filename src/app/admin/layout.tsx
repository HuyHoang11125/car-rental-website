'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Car, FileText, Users, CreditCard, LogOut, Menu, X, ChevronLeft, CalendarDays, Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tổng quan', href: '/admin' },
  { icon: Car, label: 'Quản lý xe', href: '/admin/xe' },
  { icon: CalendarDays, label: 'Lịch trình xe', href: '/admin/lich-trinh' },
  { icon: Store, label: 'Nhà cung cấp', href: '/admin/nha-cung-cap' },
  { icon: FileText, label: 'Đơn đặt xe', href: '/admin/don-hang' },
  { icon: Users, label: 'Người dùng', href: '/admin/nguoi-dung' },
  { icon: CreditCard, label: 'Thanh toán', href: '/admin/thanh-toan' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <>
      <div className="p-4 mb-4">
        {collapsed ? (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-extrabold text-black text-sm font-[Playfair_Display,serif]">
            É
          </div>
        ) : (
          <Logo size="sm" />
        )}
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all no-underline',
                isActive
                  ? 'bg-gold/15 text-gold font-medium'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-4">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all no-underline',
          )}
        >
          <ChevronLeft size={18} />
          {!collapsed && <span>Về trang chủ</span>}
        </Link>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all w-full">
          <LogOut size={18} />
          {!collapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-dark">
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col border-r border-dark-border bg-darker transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}>
        <SidebarContent />
        <button onClick={() => setCollapsed(!collapsed)} className="p-3 text-white/30 hover:text-white/60 border-t border-dark-border text-center">
          {collapsed ? '→' : '←'}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-darker border-r border-dark-border flex flex-col z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-dark-border bg-darker/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-40">
          <Button variant="ghost" size="icon" className="lg:hidden text-white/60" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </Button>
          <h1 className="text-sm font-medium text-white/60 tracking-wider uppercase">Bảng Điều Khiển Quản Trị</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
