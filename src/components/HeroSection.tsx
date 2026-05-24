import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Database, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  Shield
} from "lucide-react";

const stats = [
  { 
    label: "Total Records", 
    value: "12.4M+", 
    icon: Database,
    description: "Data terverifikasi" 
  },
  { 
    label: "Approved Sets", 
    value: "847", 
    icon: CheckCircle2,
    description: "Dataset tersedia" 
  },
  { 
    label: "Verified Providers", 
    value: "126", 
    icon: Users,
    description: "Penyedia terpercaya" 
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              GDPR & UU PDP Compliant
            </span>
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight text-balance">
            Satu Arsitektur Data untuk{" "}
            <span className="text-gradient">Keputusan Melesat</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Platform marketplace data premium terpercaya. Akses dataset berkualitas tinggi 
            dengan transparansi penuh dan kepatuhan regulasi untuk profesional dan bisnis.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/catalog">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-emerald font-semibold px-8 h-12 text-base"
              >
                Jelajahi Katalog
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="border-border hover:bg-secondary font-medium px-8 h-12 text-base"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label}
              className="relative overflow-hidden bg-card/50 border-border backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  {stat.description}
                </p>
              </div>
              
              {/* Accent Line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-accent/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
