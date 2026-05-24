import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { 
  Clock, 
  Copy, 
  MessageCircle, 
  QrCode, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import type { Product } from "@/src/components/catalog/ProductGrid";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function CheckoutDialog({ open, onOpenChange, product }: CheckoutDialogProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!open) {
      setTimeLeft(15 * 60);
      setPaymentInitiated(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(product.price.toString());
    toast.success("Nominal berhasil disalin!", {
      description: formatPrice(product.price),
    });
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Halo, saya ingin membeli dataset:\n\n` +
      `📦 *${product.title}*\n` +
      `💰 Harga: ${formatPrice(product.price)}\n` +
      `📊 Rows: ${product.rows.toLocaleString()}\n` +
      `📁 Format: ${product.format.toUpperCase()}\n\n` +
      `Mohon informasi cara pembayaran dan proses pengiriman data. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
    
    toast.success("WhatsApp dibuka!", {
      description: "Silakan lanjutkan chat dengan tim kami",
    });
  };

  const qrValue = `https://arca.id/pay/${product.id}?amount=${product.price}&ref=${Date.now()}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Checkout Dataset
          </DialogTitle>
        </DialogHeader>

        {/* Product Summary */}
        <div className="bg-secondary/30 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-secondary/50">
              {product.format.toUpperCase()} • {product.rows.toLocaleString()} rows
            </Badge>
            <span className="font-bold text-primary text-lg">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <Tabs defaultValue="qris" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
            <TabsTrigger 
              value="qris" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <QrCode className="w-4 h-4 mr-2" />
              QRIS Instan
            </TabsTrigger>
            <TabsTrigger 
              value="whatsapp"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </TabsTrigger>
          </TabsList>

          {/* QRIS Tab */}
          <TabsContent value="qris" className="mt-4">
            <div className="flex flex-col items-center">
              {/* Timer */}
              <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Berlaku dalam</span>
                <Badge 
                  variant={timeLeft < 300 ? "destructive" : "secondary"}
                  className={timeLeft < 300 ? "bg-destructive/20 text-destructive" : ""}
                >
                  {formatTime(timeLeft)}
                </Badge>
              </div>

              {/* QR Code */}
              <div className="bg-white p-4 rounded-xl mb-4">
                <QRCodeSVG 
                  value={qrValue}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>

              {/* Instructions */}
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Scan QR dengan aplikasi e-wallet atau mobile banking
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCopyAmount}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Payment Status */}
              {paymentInitiated ? (
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Menunggu konfirmasi pembayaran...</span>
                </div>
              ) : (
                <Button 
                  onClick={() => {
                    setPaymentInitiated(true);
                    toast.info("Pembayaran diproses", {
                      description: "Silakan selesaikan pembayaran di aplikasi Anda",
                    });
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Saya Sudah Bayar
                </Button>
              )}
            </div>
          </TabsContent>

          {/* WhatsApp Tab */}
          <TabsContent value="whatsapp" className="mt-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>

              <h3 className="font-semibold text-foreground mb-2">
                Hubungi via WhatsApp
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tim kami akan membantu proses pembelian dan menjawab pertanyaan Anda
              </p>

              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                Pesan akan otomatis terisi dengan detail dataset
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-border mt-4">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground">
            Transaksi aman & terenkripsi
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
