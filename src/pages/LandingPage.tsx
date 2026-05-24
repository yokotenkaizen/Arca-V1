import Navbar from "@/src/components/Navbar";
import HeroSection from "@/src/components/HeroSection";
import CategoryBadges from "@/src/components/CategoryBadges";
import Footer from "@/src/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategoryBadges />
      </main>
      <Footer />
    </div>
  );
}
