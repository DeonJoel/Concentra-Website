"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QualityCertificates() {
  const [cmsData, setCmsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Automatically fetch from the backend on load
  useEffect(() => {
    async function fetchQualityData() {
      try {
        const response = await fetch("http://localhost:8000/api/content/home");
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
  const heading = getValue("quality_heading", "Uncompromising Quality");
  const subHeading = getValue("quality_subheading", "Engineered for Exacting Standards");
  const buttonText = getValue("quality_button", "View Manufacturing Facility");
  
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
    return url.startsWith('http') ? url : `http://localhost:8000/${url}`;
  };

  // Check if we only have one certificate to adjust sizing dynamically
  const isSingleCert = displayCertificates.length === 1;

  return (
    <section className="w-full py-16 relative z-30">
      
      {/* 12-Column Grid Alignment */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* The White Card: Spans Column 2 to 11 */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-white rounded-[15px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT HALF: Dynamic Main Image */}
          <div 
            className="w-full lg:w-1/2 min-h-[300px] lg:min-h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${getBgImageUrl(mainImage)}')` }}
          ></div>

          {/* RIGHT HALF: Content & Dynamic Certificates */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center lg:items-center text-center">
            
            <h2 className="text-concentra-purple font-bold tracking-widest text-sm md:text-base uppercase mb-4 drop-shadow-sm">
              {heading}
            </h2>
            
            <h3 className="text-industrial-slate font-bold text-4xl md:text-5xl leading-tight mb-10">
              {subHeading}
            </h3>

            {/* DYNAMIC CERTIFICATES ROW */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
              {displayCertificates.map((cert) => (
                <div 
                  key={cert.id} 
                  // If single, make it larger (w-32/h-40). If multiple, keep original size.
                  className={`${
                    isSingleCert 
                      ? "w-32 h-40 md:w-40 md:h-48" 
                      : "w-20 h-24 md:w-24 md:h-28"
                  } bg-gray-50 border border-gray-200 rounded flex flex-col items-center justify-center p-2 shadow-sm transition hover:shadow-md overflow-hidden`}
                >
                  {/* DYNAMIC RENDER: Image vs Text */}
                  {cert.content_type === "image" ? (
                    <img 
                      src={cert.content_value.startsWith('http') ? cert.content_value : `http://localhost:8000/${cert.content_value}`} 
                      alt="Certificate Logo" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-[10px] text-gray-400 font-medium text-center leading-tight break-words">
                      {cert.content_value} <br /> Logo
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Dynamic Button Text */}
            <Link 
              href="/company/facilities"
              className="bg-transparent hover:bg-concentra-green border-2 border-concentra-green text-concentra-green hover:text-white font-semibold py-3 px-8 rounded transition duration-300 shadow-sm inline-block"
            >
              {buttonText}
            </Link>
            
          </div>

        </div>
      </div>
    </section>
  );
}