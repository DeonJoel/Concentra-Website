import HeroSlider from "@/components/home/HeroSlider";
import CompanyIntro from "@/components/home/CompanyIntro";
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

      {/* 2. The Company Intro Section */}
      <CompanyIntro />
      
      {/* 3. The Trusted By Banner */}
      <TrustedBy />

      {/* 4. Expertise Bento Box Grid */}
      <OurExpertise />

      {/* 5. Quality Certificates Section */}
      <QualityCertificates />

      {/* 6. Global Reach Section */}
      <GlobalReach />

      {/* 7. CTA Banner Section */}
      <CtaBanner />
    </main>
  );
}