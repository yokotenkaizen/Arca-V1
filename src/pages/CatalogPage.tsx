import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import FilterSidebar from "@/src/components/catalog/FilterSidebar";
import ProductGrid from "@/src/components/catalog/ProductGrid";
import { Button } from "@/src/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

export interface FilterState {
  priceRange: [number, number];
  formats: string[];
  recordRange: [number, number];
  categories: string[];
}

const defaultFilters: FilterState = {
  priceRange: [0, 50000000],
  formats: [],
  recordRange: [0, 5000000],
  categories: [],
};

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Katalog Dataset
            </h1>
            <p className="text-muted-foreground">
              Temukan dan akses dataset premium untuk kebutuhan analisis Anda
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </aside>

            {/* Mobile Sidebar */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div 
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Filter</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <FilterSidebar filters={filters} setFilters={setFilters} />
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              <ProductGrid filters={filters} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
