import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookGrid from "@/components/BookGrid";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import PartnershipSection from "@/components/PartnershipSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />

      {/* Home Hero Section */}
      <Hero />

      {/* Image Carousel */}
      <Carousel />

      {/* Partnership Overview */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <PartnershipSection />
      </div>
      {/* Featured Digital Repository */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />
        <BookGrid limit={8} />
      </div>

      <Footer />
    </main>
  );
}
