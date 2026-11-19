"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Target, CircleDot } from "lucide-react";

export default function QualityCertificates() {
  const [cmsData, setCmsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Automatically fetch from the backend on load
  useEffect(() => {
    async function fetchQualityData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/home`);
        if (!response.ok) throw new Error("Failed to fetch CMS data");
        
        const data = await response.json();
        const qualityData = data.filter((item: any) => item.section === "quality_certificates");
        setCmsData(qualityData);
      } catch (error) {
        console.error("Error fetching Quality data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQualityData();
  }, []);

  // Helper function to extract text/images safely
  const getValue = (key: string, fallback: string) => {
    const block = cmsData.find(c => c.content_key === key);
    return block?.content_value || fallback;
  };

  // 1. Get Text & Main Image Data
  const heading = getValue("quality_heading", "QUALITY ASSURANCE");
  const subHeading = getValue("quality_subheading", "Quality isn't a final step.<br><em>It's built into our process.</em>");
  const desc = getValue("quality_desc", "Precision is only meaningful when it can be verified. Our quality infrastructure supports reliable dimensional measurement and inspection throughout manufacturing.");
  const buttonText = getValue("quality_button", "Discuss quality requirements");
  
  // Defaulting to a high-precision CNC / CMM Machine image
  const mainImage = getValue("quality_main_image", "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"); 

  // 2. Extract only the certificates from the CMS data
  const fetchedCertificates = cmsData.filter(c => c.content_key.startsWith("cert_logo_"));

  // Safety fallback just in case the CMS is entirely empty
  const displayCertificates = fetchedCertificates.length > 0 ? fetchedCertificates : [
    { id: 'mock1', content_type: 'image', content_value: "https://raw.githubusercontent.com/DeonJoel/company-assets/5822f8874ad7fbf2620f7f085992de1789272b54/Quality_Certificate.png" }
  ];

  // Helper to format the image URL for the main background
  const getBgImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
  };

  return (
    <section className="w-full py-16 md:py-[105px] bg-white relative z-30">
      
      {/* MASTER CONTAINER: Center-Locked Max Width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[65px] items-center">
          
          {/* LEFT COLUMN: Text & Quality Points */}
          <div>
            
            {/* Eyebrow */}
            <div className="flex items-center gap-3 text-concentra-purple text-[11px] font-extrabold tracking-[2px] uppercase mb-5">
              <span className="w-[27px] h-[2px] bg-concentra-green inline-block"></span>
              {heading}
            </div>

            {/* Main Headline (Supports HTML for <em> purple text) */}
            <h2 
              className="text-[clamp(31px,3.4vw,45px)] leading-[1.23] font-extrabold tracking-[-1px] mb-[22px] text-industrial-slate [&>em]:text-concentra-purple [&>em]:not-italic"
              dangerouslySetInnerHTML={{ __html: subHeading }}
            />
            
            {/* Description */}
            <p className="text-[14px] leading-[1.9] text-[#716b77]">
              {desc}
            </p>

            {/* Quality Points List */}
            <div className="my-[28px] flex flex-col gap-[22px]">
              
              <div className="flex gap-[15px]">
                <div className="h-[38px] min-w-[38px] rounded-full grid place-items-center bg-[#eef7eb] text-concentra-green shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-extrabold text-industrial-slate mb-1">ISO 9001:2015 Certified</h3>
                  <p className="text-[12px] text-[#716b77] leading-relaxed m-0">Quality management system certification documented by TÜV India in our company profile.</p>
                </div>
              </div>

              <div className="flex gap-[15px]">
                <div className="h-[38px] min-w-[38px] rounded-full grid place-items-center bg-[#eef7eb] text-concentra-green shrink-0">
                  <Target className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-extrabold text-industrial-slate mb-1">Coordinate Measuring Machine</h3>
                  <p className="text-[12px] text-[#716b77] leading-relaxed m-0">CONTURA G2 CMM, listed measurement range 1,000 × 1,600 × 600 mm.</p>
                </div>
              </div>

              <div className="flex gap-[15px]">
                <div className="h-[38px] min-w-[38px] rounded-full grid place-items-center bg-[#eef7eb] text-concentra-green shrink-0">
                  <CircleDot className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-extrabold text-industrial-slate mb-1">Precision Inspection Equipment</h3>
                  <p className="text-[12px] text-[#716b77] leading-relaxed m-0">Mitutoyo LH-600 2D height gauge and laser engraving capability.</p>
                </div>
              </div>
              
            </div>

            {/* Dynamic CTA Button */}
            <Link 
              href="/request-quote"
              className="inline-flex items-center gap-[35px] px-[22px] py-[17px] text-[12px] font-extrabold bg-concentra-green text-[#1b2c1b] transition-transform hover:-translate-y-0.5 w-fit"
            >
              {buttonText} <span className="text-[15px] leading-none">↗</span>
            </Link>

          </div>

          {/* RIGHT COLUMN: Visual & Floating Cert Card */}
          <div className="relative w-full mt-8 lg:mt-0">
            
            <img 
              src={getBgImageUrl(mainImage)}
              alt="Quality Inspection Equipment"
              className="h-[350px] md:h-[480px] w-full object-cover"
            />
            
            {/* Dark Floating Cert Card mapping the CMS logos */}
            <div className="absolute -bottom-[30px] left-0 md:-left-[30px] bg-[#2a1731] text-white p-[25px] w-[240px] md:w-[260px] shadow-2xl z-10">
              <span className="text-[9px] tracking-[1.5px] text-concentra-green uppercase font-bold block mb-[10px]">
                QUALITY MANAGEMENT SYSTEM
              </span>
              <strong className="font-extrabold text-[35px] md:text-[40px] leading-[1.1] block mb-[15px]">
                ISO<br/>9001:2015
              </strong>
              
              {/* Dynamic CMS Certificates injected here */}
              <div className="flex flex-wrap gap-2 mb-[15px]">
                {displayCertificates.map((cert) => (
                  <div key={cert.id} className="bg-white rounded p-1 w-[60px] h-[60px] flex items-center justify-center shadow-inner">
                    {cert.content_type === "image" ? (
                      <img 
                        src={getBgImageUrl(cert.content_value)} 
                        alt="Certificate Logo" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-[8px] text-gray-800 font-bold text-center leading-tight break-words">
                        {cert.content_value}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <small className="text-[#d3c9d5] text-[11px] leading-[1.5] block">
                TÜV India certification shown in company profile. Request current certificate for verification.
              </small>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}