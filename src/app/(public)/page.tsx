import HeroSlider from "@/components/home/HeroSlider";
import TrustedBy from "@/components/home/TrustedBy";
import OurExpertise from "@/components/home/OurExpertise";
import QualityCertificates from "@/components/home/QualityCertificates";
import GlobalReach from "@/components/home/GlobalReach";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Slider Section */}
      <HeroSlider />
      
      {/* 2. The Trusted By Banner */}
      <TrustedBy />

      {/* 3. Expertise Bento Box Grid */}
      <OurExpertise />

      {/* 4. Quality Certificates Section (NEW) */}
        <QualityCertificates />

      {/* 5. Global Reach Section (NEW) */}
      <GlobalReach />

      {/* 6. CTA Banner Section */}
      <CtaBanner />

    </main>
  );
}