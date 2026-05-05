import Link from 'next/link';
import { Globe, Camera, Play, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
  { label: 'Bộ sưu tập xe', href: '/bo-suu-tap' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Liên hệ', href: '/lien-he' },
  { label: 'Về chúng tôi', href: '/ve-chung-toi' },
];

const serviceLinks = [
  'Đưa đón sân bay',
  'Dịch vụ tài xế',
  'Xe cưới hỏi',
  'Cho thuê doanh nghiệp',
  'Thuê dài hạn',
];

const socials = [
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Play, href: '#', label: 'Youtube' },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-darker border-t border-gold/10 pt-20 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="md" className="mb-5" />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Trải nghiệm đỉnh cao dịch vụ cho thuê xe sang. Xe cao cấp, dịch vụ xuất sắc, hành trình khó quên.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-gold/20 flex items-center justify-center text-white/50 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/5"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 font-[Inter,sans-serif]">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/45 text-sm transition-colors duration-300 hover:text-gold no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 font-[Inter,sans-serif]">
              Dịch vụ
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <span className="text-white/45 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 font-[Inter,sans-serif]">
              Liên hệ
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/45 text-sm">123 Đường Luxury</p>
                  <p className="text-white/45 text-sm">Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gold shrink-0" />
                <p className="text-white/45 text-sm">+84 28 1234 5678</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gold shrink-0" />
                <p className="text-white/45 text-sm">contact@elite-rental.com</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/5 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © 2026 ÉLITE Car Rental. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6">
            {['Chính sách bảo mật', 'Điều khoản dịch vụ'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/30 text-xs transition-colors duration-300 hover:text-gold no-underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
