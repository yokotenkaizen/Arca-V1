import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  Briefcase, 
  TrendingUp, 
  ShoppingCart, 
  Car, 
  GraduationCap,
  Building2,
  HeartPulse,
  Globe
} from "lucide-react";

const categories = [
  { 
    name: "B2B Lead", 
    icon: Briefcase,
    color: "border-primary/30 hover:border-primary/60 hover:bg-primary/10" 
  },
  { 
    name: "Financial Dataset", 
    icon: TrendingUp,
    color: "border-accent/30 hover:border-accent/60 hover:bg-accent/10" 
  },
  { 
    name: "E-Commerce Analytics", 
    icon: ShoppingCart,
    color: "border-primary/30 hover:border-primary/60 hover:bg-primary/10" 
  },
  { 
    name: "Automotive SQL", 
    icon: Car,
    color: "border-accent/30 hover:border-accent/60 hover:bg-accent/10" 
  },
  { 
    name: "Academic Research", 
    icon: GraduationCap,
    color: "border-primary/30 hover:border-primary/60 hover:bg-primary/10" 
  },
  { 
    name: "Real Estate", 
    icon: Building2,
    color: "border-accent/30 hover:border-accent/60 hover:bg-accent/10" 
  },
  { 
    name: "Healthcare Data", 
    icon: HeartPulse,
    color: "border-primary/30 hover:border-primary/60 hover:bg-primary/10" 
  },
  { 
    name: "Global Markets", 
    icon: Globe,
    color: "border-accent/30 hover:border-accent/60 hover:bg-accent/10" 
  },
];

export default function CategoryBadges() {
  return (
    <section className="py-16 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Kategori Data Populer
          </h2>
          <p className="text-muted-foreground">
            Temukan dataset yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4 justify-center flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant="outline"
                className={`px-5 py-3 text-sm font-medium bg-card/50 cursor-pointer transition-all duration-300 flex items-center gap-2 ${category.color}`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </section>
  );
}
