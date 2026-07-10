import HeroSlider from "@/components/HeroSlider";
import TrustedBy from "@/components/TrustedBy";
import OurExpertise from "@/components/OurExpertise";

export default function Home() {
  return (
    <main className="min-h-screen bg-blueprint-bg">
      {/* 1. Hero Slider Section */}
      <HeroSlider />
      
      {/* 2. The Trusted By Banner */}
      <TrustedBy />

      {/* 3. Expertise Bento Box Grid */}
      <OurExpertise />

    </main>
  );
}