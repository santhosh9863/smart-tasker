import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import ServiceSection from "@/components/ui/ServiceSection";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white pt-16">
      <Navbar />
      <HeroSection />
      <ServiceSection /> 
    </main>
  );
}