import HeroSlider from "@/components/home/HeroSlider";
import TrustedBy from "@/components/home/TrustedBy";
import OurExpertise from "@/components/home/OurExpertise";
import QualityCertificates from "@/components/home/QualityCertificates";
import GlobalReach from "@/components/home/GlobalReach";
import CtaBanner from "@/components/home/CtaBanner";

// Fetch data directly from your Python CMS API
async function getHomeContent() {
  try {
    // We use Next.js caching. 'revalidate: 10' means the website will check 
    // Python for new CMS updates every 10 seconds in the background.
    const res = await fetch("http://localhost:8000/api/content/home", { 
      next: { revalidate: 10 } 
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch CMS data:", error);
    return [];
  }
}

export default async function Home() {
  const rawContent = await getHomeContent();

  const getValue = (section: string, key: string, fallback: string) => {
    const block = rawContent.find((item: any) => item.section === section && item.content_key === key);
    return block ? block.content_value : fallback;
  };

  const getArray = (section: string) => {
    return rawContent.filter((item: any) => item.section === section);
  };

  // --- NEW: Parse the Hero Slides dynamically ---
  const heroBlocks = getArray("hero");
  
  // 1. Map to an array of numbers
  const mappedNumbers: number[] = heroBlocks.map((b: any) => {
    const match = b.content_key.match(/slide_(\d+)_/);
    return match ? parseInt(match[1]) : 0;
  });

  // 2. Filter out zeros and get unique numbers, strictly typed as number[]
  const slideNumbers: number[] = Array.from(new Set(mappedNumbers.filter((n: number) => n > 0)));

  // 3. Build the slides array, explicitly setting num as a number
  const heroSlides = slideNumbers.map((num: number) => ({
    id: num,
    heading: getValue("hero", `slide_${num}_heading`, "Missing Heading"),
    subHeading: getValue("hero", `slide_${num}_subheading`, "Missing Subheading"),
    image: getValue("hero", `slide_${num}_image`, "")
  }));
  // ---------------------------------------------

  return (
    <main className="min-h-screen">
      
      {/* 1. Hero Slider Section */}
      <HeroSlider slides={heroSlides} />
      
      {/* 2. The Trusted By Banner */}
      <TrustedBy 
        heading={getValue("trusted_by", "heading", "Trusted By Industry Leaders In Precision Machining")}
        logos={getArray("trusted_by").filter((item: any) => item.content_key.startsWith("logo_"))}
      />

      {/* 3. Expertise Bento Box Grid */}
      <OurExpertise 
        heading={getValue("expertise", "heading", "Our Expertise")}
        subHeading={getValue("expertise", "sub_heading", "Precision Manufacturing & Re-manufacturing")}
        contentBlocks={getArray("expertise")}
      />

      {/* 4. Quality Certificates Section */}
      <QualityCertificates 
        heading={getValue("quality", "heading", "Uncompromising Quality")}
        subHeading={getValue("quality", "sub_heading", "Engineered for Exacting Standards")}
        buttonText={getValue("quality", "button_text", "View Manufacturing Facility")}
        mainImage={getValue("quality", "main_image", "")}
        certificates={getArray("quality").filter((item: any) => item.content_key.startsWith("cert_"))}
      />

      {/* 5. Global Reach Section */}
      <GlobalReach 
        heading={getValue("global_reach", "heading", "Global Reach")}
        subHeading={getValue("global_reach", "sub_heading", "Delivering Precision to Assembly Lines Worldwide")}
        description={getValue("global_reach", "description", "We proudly export our precision-engineered components to industry leaders across the US, EU, China, and Japan.\n\nBacked by a robust global logistics network, we are fully equipped and eager to serve as a reliable supplier for assembly lines in any part of the world.")}
        mapImage={getValue("global_reach", "map_image", "")}
      />

      {/* 6. CTA Banner Section */}
      <CtaBanner 
        heading={getValue("cta", "main_heading", "Ready to upgrade your production capabilities?")}
        button1Text={getValue("cta", "button_1", "Request a Quote")}
        button2Text={getValue("cta", "button_2", "Contact Us")}
      />

    </main>
  );
}