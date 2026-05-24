import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import DataPreviewTable from "@/src/components/product/DataPreviewTable";
import CheckoutDialog from "@/src/components/product/CheckoutDialog";
import { mockProducts } from "@/src/components/catalog/ProductGrid";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { 
  ArrowLeft, 
  Database, 
  FileText, 
  HardDrive, 
  ShieldCheck,
  Calendar,
  User,
  AlertTriangle
} from "lucide-react";

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

export default function ProductDetailPage() {
  const { id } = useParams();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  
  const product = mockProducts.find((p) => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Dataset tidak ditemukan</h1>
          <Link to="/catalog">
            <Button variant="outline">Kembali ke Katalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/catalog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Katalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title Card */}
              <Card className="bg-card/50 border-border p-6">
                <h1 className="text-2xl font-bold text-foreground mb-3">
                  {product.title}
                </h1>
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>

                {/* Metadata Badges */}
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5">
                    <Database className="w-3.5 h-3.5" />
                    {formatNumber(product.rows)} rows
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5">
                    <HardDrive className="w-3.5 h-3.5" />
                    {product.fileSize}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    {product.format.toUpperCase()}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1.5 border-primary/30 text-primary px-3 py-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {product.integrityScore}% Integrity Score
                  </Badge>
                </div>
              </Card>

              {/* Data Preview */}
              <Card className="bg-card/50 border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Data Preview
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Menampilkan 5 sampel data dengan field sensitif yang dimasking untuk keamanan.
                </p>
                <DataPreviewTable />
              </Card>

              {/* Compliance Notice */}
              <Card className="bg-card/50 border-border/50 p-5 border-l-4 border-l-primary">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Disclaimer Kepatuhan</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dataset ini telah melalui proses anonimisasi sesuai standar GDPR dan UU PDP Indonesia. 
                      Data sampel yang ditampilkan bersifat representatif dan tidak mengandung informasi 
                      pribadi yang dapat diidentifikasi (PII). Pembeli bertanggung jawab untuk memastikan 
                      penggunaan data sesuai regulasi yang berlaku.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-card/50 border-border p-6 sticky top-24">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Harga Dataset</p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Provider Info */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Provider</p>
                      <p className="text-sm font-medium text-foreground">{product.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Last Updated</p>
                      <p className="text-sm font-medium text-foreground">24 Mei 2024</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  size="lg" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-emerald font-semibold"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Dapatkan Data
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Pembayaran aman via QRIS atau WhatsApp
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Checkout Dialog */}
      <CheckoutDialog 
        open={checkoutOpen} 
        onOpenChange={setCheckoutOpen}
        product={product}
      />
    </div>
  );
}
