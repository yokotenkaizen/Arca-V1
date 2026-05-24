import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  FileText, 
  HardDrive, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import type { FilterState } from "@/src/pages/CatalogPage";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rows: number;
  fileSize: string;
  format: string;
  category: string;
  integrityScore: number;
  provider: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Indonesia B2B Corporate Contacts 2024",
    description: "Database kontak perusahaan B2B lengkap dengan email dan nomor telepon terverifikasi.",
    price: 15000000,
    rows: 250000,
    fileSize: "1.2 GB",
    format: "csv",
    category: "b2b",
    integrityScore: 98,
    provider: "DataTrust ID",
  },
  {
    id: "2",
    title: "E-Commerce Transaction Analytics Q1-Q4",
    description: "Data transaksi e-commerce anonim untuk analisis perilaku konsumen.",
    price: 25000000,
    rows: 1500000,
    fileSize: "4.8 GB",
    format: "sql",
    category: "ecommerce",
    integrityScore: 99,
    provider: "CommerceData",
  },
  {
    id: "3",
    title: "Financial Market Historical Data",
    description: "Data historis pasar finansial Indonesia 5 tahun terakhir.",
    price: 35000000,
    rows: 3200000,
    fileSize: "8.2 GB",
    format: "sql",
    category: "financial",
    integrityScore: 100,
    provider: "FinData Solutions",
  },
  {
    id: "4",
    title: "Automotive Dealer Network SQL",
    description: "Database jaringan dealer otomotif nasional dengan data penjualan.",
    price: 18000000,
    rows: 450000,
    fileSize: "2.1 GB",
    format: "bak",
    category: "automotive",
    integrityScore: 96,
    provider: "AutoInsight",
  },
  {
    id: "5",
    title: "Academic Research Citations 2020-2024",
    description: "Dataset sitasi penelitian akademik dari jurnal terakreditasi.",
    price: 12000000,
    rows: 850000,
    fileSize: "3.4 GB",
    format: "json",
    category: "academic",
    integrityScore: 97,
    provider: "AcademicDB",
  },
  {
    id: "6",
    title: "Real Estate Property Listings Jakarta",
    description: "Data properti real estate area Jakarta dan sekitarnya.",
    price: 22000000,
    rows: 180000,
    fileSize: "1.8 GB",
    format: "xlsx",
    category: "realestate",
    integrityScore: 95,
    provider: "PropertyData",
  },
];

interface ProductGridProps {
  filters: FilterState;
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

export default function ProductGrid({ filters }: ProductGridProps) {
  // Filter products based on filters
  const filteredProducts = mockProducts.filter((product) => {
    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Format filter
    if (filters.formats.length > 0 && !filters.formats.includes(product.format)) {
      return false;
    }
    
    // Record range filter
    if (product.rows < filters.recordRange[0] || product.rows > filters.recordRange[1]) {
      return false;
    }
    
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    
    return true;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Database className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Tidak ada dataset ditemukan
        </h3>
        <p className="text-muted-foreground text-sm">
          Coba ubah filter untuk menemukan dataset yang sesuai
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Menampilkan <span className="text-foreground font-medium">{filteredProducts.length}</span> dataset
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id}
            className="group relative overflow-hidden bg-card/50 border-border hover:border-primary/30 transition-all duration-300"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1.5 bg-secondary/50">
                  <Database className="w-3 h-3" />
                  {formatNumber(product.rows)} rows
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1.5 bg-secondary/50">
                  <HardDrive className="w-3 h-3" />
                  {product.fileSize}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1.5 bg-secondary/50">
                  <FileText className="w-3 h-3" />
                  {product.format.toUpperCase()}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1.5 border-primary/30 text-primary"
                >
                  <ShieldCheck className="w-3 h-3" />
                  {product.integrityScore}% Verified
                </Badge>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Provider: {product.provider}</p>
                  <p className="text-lg font-bold text-foreground">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <Link to={`/product/${product.id}`}>
                  <Button 
                    size="sm" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Detail
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export { mockProducts };
