'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Map, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CarCard, CarCardSkeleton } from '@/components/shared/CarCard';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockCars, carBrands, mockSuppliers } from '@/data/mock';
import { CarCategory } from '@/types';
import { formatCurrency, getCategoryLabel } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

const categories = Object.values(CarCategory);

export default function FleetPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isMapView, setIsMapView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isLoading] = useState(false);
  
  const debouncedSearch = useDebounce(search, 300);
  const debouncedPrice = useDebounce(priceRange, 300);

  const filteredCars = useMemo(() => {
    return mockCars.filter((car) => {
      const matchSearch = !debouncedSearch ||
        car.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        car.brand.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchCategory = !selectedCategory || car.category === selectedCategory;
      const matchBrand = !selectedBrand || car.brand === selectedBrand;
      const matchSupplier = !selectedSupplier || car.supplier?.id === selectedSupplier;
      const matchPrice = car.price_per_day >= debouncedPrice[0] && car.price_per_day <= debouncedPrice[1];
      
      return matchSearch && matchCategory && matchBrand && matchSupplier && matchPrice;
    });
  }, [debouncedSearch, selectedCategory, selectedBrand, selectedSupplier, debouncedPrice]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const paginatedCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedSupplier(null);
    setPriceRange([0, 50000000]);
    setCurrentPage(1);
  };

  const hasFilters = search || selectedCategory || selectedBrand || selectedSupplier || priceRange[0] > 0 || priceRange[1] < 50000000;

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-gold/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="BỘ SƯU TẬP"
            title="Đội Xe Cao Cấp"
            subtitle="Khám phá bộ sưu tập xe sang hàng đầu với đa dạng thương hiệu và phong cách"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-12 pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <Input
                placeholder="Tìm kiếm theo tên xe hoặc hãng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 bg-dark-card border-dark-border text-white rounded-xl h-12 placeholder:text-white/30 focus:border-gold"
                id="fleet-search"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-dark-border text-white/70 hover:border-gold/30 hover:text-gold rounded-xl h-12 px-6 shrink-0"
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Bộ lọc
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsMapView(!isMapView)}
                className="border-dark-border text-white/70 hover:border-gold/30 hover:text-gold rounded-xl h-12 px-4 shrink-0 hidden md:flex"
              >
                {isMapView ? <List size={16} className="mr-2" /> : <Map size={16} className="mr-2" />}
                {isMapView ? 'Danh sách' : 'Bản đồ'}
              </Button>
            </div>
          </div>

          {/* Filter Tags */}
          {showFilters && (
            <div className="glass-card rounded-2xl p-6 mb-6 space-y-4 animate-fade-in">
              <div>
                <p className="text-white/50 text-xs tracking-wider uppercase mb-3">Loại xe</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge
                      key={cat}
                      className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs transition-all ${
                        selectedCategory === cat
                          ? 'bg-gold/20 text-gold border-gold/40'
                          : 'bg-dark-surface text-white/50 border-dark-border hover:border-gold/20 hover:text-gold'
                      }`}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                    >
                      {getCategoryLabel(cat)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/50 text-xs tracking-wider uppercase mb-3">Hãng xe</p>
                <div className="flex flex-wrap gap-2">
                  {carBrands.map((brand) => (
                    <Badge
                      key={brand}
                      className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs transition-all ${
                        selectedBrand === brand
                          ? 'bg-gold/20 text-gold border-gold/40'
                          : 'bg-dark-surface text-white/50 border-dark-border hover:border-gold/20 hover:text-gold'
                      }`}
                      onClick={() => setSelectedBrand(selectedBrand === brand ? '' : brand)}
                    >
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-dark-border">
                {/* Price Range */}
                <div>
                  <p className="text-white/50 text-xs tracking-wider uppercase mb-3">Khoảng giá / ngày: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}</p>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="number" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="bg-dark-surface border-dark-border text-white text-sm h-10"
                    />
                    <span className="text-white/30">-</span>
                    <Input 
                      type="number" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="bg-dark-surface border-dark-border text-white text-sm h-10"
                    />
                  </div>
                  <input 
                    type="range" 
                    min="0" max="50000000" step="500000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full mt-4 accent-gold"
                  />
                </div>
                
                {/* Supplier Filter */}
                <div>
                  <p className="text-white/50 text-xs tracking-wider uppercase mb-3">Nhà cung cấp (Marketplace)</p>
                  <div className="flex flex-wrap gap-2">
                    {mockSuppliers.map((supplier) => (
                      <Badge
                        key={supplier.id}
                        className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs transition-all ${
                          selectedSupplier === supplier.id
                            ? 'bg-gold/20 text-gold border-gold/40'
                            : 'bg-dark-surface text-white/50 border-dark-border hover:border-gold/20 hover:text-gold'
                        }`}
                        onClick={() => setSelectedSupplier(selectedSupplier === supplier.id ? null : supplier.id)}
                      >
                        {supplier.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasFilters && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white/40 text-xs">Đang lọc:</span>
              {selectedCategory && (
                <Badge className="bg-gold/10 text-gold border-gold/20 gap-1">
                  {getCategoryLabel(selectedCategory)}
                  <X size={12} className="cursor-pointer" onClick={() => setSelectedCategory('')} />
                </Badge>
              )}
              {selectedBrand && (
                <Badge className="bg-gold/10 text-gold border-gold/20 gap-1">
                  {selectedBrand}
                  <X size={12} className="cursor-pointer" onClick={() => setSelectedBrand('')} />
                </Badge>
              )}
              {selectedSupplier && (
                <Badge className="bg-gold/10 text-gold border-gold/20 gap-1">
                  {mockSuppliers.find(s => s.id === selectedSupplier)?.name}
                  <X size={12} className="cursor-pointer" onClick={() => setSelectedSupplier(null)} />
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 50000000) && (
                <Badge className="bg-gold/10 text-gold border-gold/20 gap-1">
                  Giá đã lọc
                  <X size={12} className="cursor-pointer" onClick={() => setPriceRange([0, 50000000])} />
                </Badge>
              )}
              <button onClick={clearFilters} className="text-gold/60 text-xs hover:text-gold ml-2">
                Xóa tất cả
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-sm mb-6">{filteredCars.length} xe được tìm thấy</p>

          <div className={`grid ${isMapView ? 'grid-cols-1 lg:grid-cols-2 gap-8' : 'grid-cols-1 gap-7'}`}>
            
            {/* Map View Placeholder */}
            {isMapView && (
              <div className="hidden lg:block h-[800px] bg-dark-card border border-dark-border rounded-2xl relative overflow-hidden sticky top-24">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=10.7769,106.7009&zoom=13&size=800x800&style=feature:all|element:labels.text.fill|color:0x8a8a8a&style=feature:all|element:labels.text.stroke|visibility:on|color:0x000000|weight:2&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x144b53|lightness:14|weight:1.4&style=feature:landscape|element:all|color:0x08304b&style=feature:poi|element:geometry|color:0x0c4152|lightness:5&style=feature:road.highway|element:geometry.fill|color:0x000000&style=feature:road.highway|element:geometry.stroke|color:0x0b434f|lightness:25&style=feature:road.arterial|element:geometry.fill|color:0x000000&style=feature:road.arterial|element:geometry.stroke|color:0x0b3d51|lightness:16&style=feature:road.local|element:geometry|color:0x000000&style=feature:transit|element:all|color:0x146474&style=feature:water|element:all|color:0x021019')] bg-cover bg-center opacity-60"></div>
                
                {/* Mock Map Pins */}
                {paginatedCars.map((car, idx) => (
                  <div key={car.id} className="absolute flex flex-col items-center group cursor-pointer" style={{ top: `${20 + idx * 15}%`, left: `${30 + (idx % 3) * 20}%` }}>
                    <div className="bg-gold text-black font-bold text-xs px-2 py-1 rounded shadow-lg group-hover:scale-110 transition-transform">
                      {formatCurrency(car.price_per_day)}
                    </div>
                    <div className="w-3 h-3 bg-gold rotate-45 -mt-1.5"></div>
                  </div>
                ))}
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/80 backdrop-blur border border-gold/30 px-6 py-3 rounded-xl text-gold font-medium">
                    Bản Đồ Vị Trí Xe (Demo)
                  </div>
                </div>
              </div>
            )}

            {/* List View */}
            <div className={isMapView ? '' : 'w-full'}>
              {isLoading ? (
                <div className={`grid grid-cols-1 ${isMapView ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-7`}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CarCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredCars.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-white/50 text-lg mb-2">Không tìm thấy xe phù hợp</p>
                  <p className="text-white/30 text-sm mb-6">Thử thay đổi bộ lọc để tìm kiếm rộng hơn</p>
                  <Button onClick={clearFilters} className="bg-gold/20 text-gold border border-gold/30 hover:bg-gold hover:text-black">
                    Xóa bộ lọc
                  </Button>
                </div>
              ) : (
                <>
                  <div className={`grid grid-cols-1 ${isMapView ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-7`}>
                    {paginatedCars.map((car) => (
                      <CarCard key={car.id} car={car} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 p-0 border-dark-border text-white/60 hover:text-gold hover:border-gold/30"
                      >
                        <ChevronLeft size={18} />
                      </Button>
                      
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <Button
                          key={i}
                          variant={currentPage === i + 1 ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 p-0 ${
                            currentPage === i + 1 
                              ? 'bg-gold text-black border-gold' 
                              : 'border-dark-border text-white/60 hover:text-gold hover:border-gold/30'
                          }`}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 p-0 border-dark-border text-white/60 hover:text-gold hover:border-gold/30"
                      >
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
