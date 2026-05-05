'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth.store';
import Logo from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Bộ sưu tập', href: '/bo-suu-tap' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 lg:px-12 transition-all duration-500',
        scrolled
          ? 'bg-darker/95 backdrop-blur-xl border-b border-gold/10'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <Logo size="md" />

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium tracking-wider uppercase font-[Inter,sans-serif] transition-colors duration-300 relative no-underline',
              pathname === link.href ? 'text-gold' : 'text-white/70 hover:text-gold'
            )}
          >
            {link.label}
            {pathname === link.href && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
            )}
          </Link>
        ))}
      </div>

      {/* Auth */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gold/10 transition-colors outline-none cursor-pointer">
              <Avatar className="w-8 h-8 border border-gold/30">
                <AvatarFallback className="bg-gold/20 text-gold text-xs font-semibold">
                  {user.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-white/80">{user.full_name}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dark-surface border-dark-border w-48" align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/tai-khoan" className="flex items-center gap-2 text-white/80 no-underline w-full">
                  <User size={16} /> Tài khoản
                </Link>
              </DropdownMenuItem>
              {user.is_staff && (
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/admin" className="flex items-center gap-2 text-white/80 no-underline w-full">
                    <LayoutDashboard size={16} /> Quản trị
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-dark-border" />
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2 text-red-400 cursor-pointer"
              >
                <LogOut size={16} /> Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/auth/dang-nhap"
            className="bg-gradient-to-r from-gold to-gold-light text-black px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,169,110,0.35)] no-underline"
            id="sign-in-btn"
          >
            Đăng nhập
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger className="md:hidden text-gold p-2 cursor-pointer">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </SheetTrigger>
        <SheetContent side="right" className="bg-dark border-dark-border w-72 p-0">
          <div className="flex flex-col h-full pt-12 px-6">
            <Logo size="sm" className="mb-8" />
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium tracking-wider uppercase transition-colors no-underline',
                    pathname === link.href
                      ? 'bg-gold/10 text-gold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto pb-8">
              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 border border-gold/30 text-gold px-6 py-3 rounded-xl text-sm font-medium hover:bg-gold/10 transition-colors"
                >
                  <LogOut size={16} /> Đăng xuất
                </button>
              ) : (
                <Link
                  href="/auth/dang-nhap"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full bg-gradient-to-r from-gold to-gold-light text-black text-center px-6 py-3 rounded-xl text-sm font-semibold tracking-wider uppercase no-underline"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
