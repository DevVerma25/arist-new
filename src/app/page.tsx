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
      <div className="relative py-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <BookGrid limit={8} />
      </div>

      <Footer />
    </main>
  );
}
