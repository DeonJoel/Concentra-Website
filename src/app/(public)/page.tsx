import HeroSlider from "@/components/home/HeroSlider";
import CompanyIntro from "@/components/home/CompanyIntro";
import TrustedBy from "@/components/home/TrustedBy";
import OurExpertise from "@/components/home/OurExpertise";
import QualityCertificates from "@/components/home/QualityCertificates";
import GlobalReach from "@/components/home/GlobalReach";
import ProcessBanner from "@/components/home/ProcessBanner";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Slider Section */}
      <HeroSlider />

      {/* 2. The Trusted By Banner */}
      <TrustedBy />

      {/* 3. The Company Intro Section */}
      <CompanyIntro />

      {/* 4. Expertise Bento Box Grid */}
      <OurExpertise />

      {/* 5. Quality Certificates Section */}
      <QualityCertificates />
      
      {/* 6. Process Banner Section */}
      <ProcessBanner />

      {/* 7. Global Reach Section */}
      <GlobalReach />
      
    </main>
  );
}