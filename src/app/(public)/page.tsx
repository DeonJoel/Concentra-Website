import HeroSlider from "@/components/home/HeroSlider";
import TrustedBy from "@/components/home/TrustedBy";
import CompanyIntro from "@/components/home/CompanyIntro";
import OurExpertise from "@/components/home/OurExpertise";
import QualityCertificates from "@/components/home/QualityCertificates";
import GlobalReach from "@/components/home/GlobalReach";
import ProcessBanner from "@/components/home/ProcessBanner";

export default function Home() {
  return (
    <main className="w-full bg-transparent">
      {/* 1. Dark Architectural Hero Slider */}
      <HeroSlider />

      {/* 2. Flat Structural Trust Band */}
      <TrustedBy />

      {/* 3. Who We Are + Deep Plum Numbers Strip */}
      <CompanyIntro />

      {/* 4. Dynamic CMS Expertise Cards */}
      <OurExpertise />

      {/* 5. Quality Assurance + CMM Showcase */}
      <QualityCertificates />

      {/* 6. Global Reach Section */}
      <GlobalReach />

      {/* 7. How We Work (4-Step Process Band) */}
      <ProcessBanner />
    </main>
  );
}