'use client';

import { Shield, Clock, Truck, Star, Award, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/card';
import SectionHeader from '@/components/shared/SectionHeader';

const allServices = [
  { icon: Shield, title: 'Bảo Hiểm Toàn Diện', desc: 'Mỗi chuyến thuê xe đều đi kèm gói bảo hiểm cao cấp, bao gồm bảo hiểm thiệt hại va chạm, trách nhiệm dân sự và bảo vệ tài sản cá nhân.' },
  { icon: Clock, title: 'Hỗ Trợ 24/7', desc: 'Đội ngũ concierge chuyên nghiệp luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi, từ tư vấn lộ trình đến hỗ trợ kỹ thuật khẩn cấp.' },
  { icon: Truck, title: 'Giao Xe Tận Nơi', desc: 'Dịch vụ giao và nhận xe tại bất kỳ địa điểm nào bạn mong muốn - sân bay, khách sạn, văn phòng hay tại nhà.' },
  { icon: Star, title: 'Xe Luôn Mới', desc: 'Đội xe được cập nhật liên tục với các phiên bản mới nhất, đảm bảo bạn luôn được trải nghiệm những công nghệ tiên tiến nhất.' },
  { icon: Award, title: 'Chương Trình VIP', desc: 'Tích lũy điểm thưởng với mỗi chuyến thuê. Thành viên VIP nhận ưu đãi đặc biệt, nâng hạng xe miễn phí và quyền ưu tiên.' },
  { icon: Headphones, title: 'Tư Vấn Chuyên Gia', desc: 'Đội ngũ chuyên gia ô tô giàu kinh nghiệm sẵn sàng tư vấn giúp bạn chọn chiếc xe phù hợp nhất cho mọi dịp.' },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-gold/5 to-transparent">
        <SectionHeader label="DỊCH VỤ" title="Dịch Vụ Cao Cấp" subtitle="Mỗi chi tiết đều được chăm chút tỉ mỉ để mang đến trải nghiệm hoàn hảo nhất" />
      </section>
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service, i) => (
            <Card key={i} className="bg-dark-card border-dark-border rounded-2xl p-6 transition-all duration-300 hover:border-gold/20 hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <service.icon size={24} className="text-gold" />
              </div>
              <h3 className="text-white text-lg font-bold mb-3 font-[Playfair_Display,serif]">{service.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{service.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
