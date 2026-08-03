"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function TrustedBy() {
  // State to hold our dynamic logos from the database
  const [logos, setLogos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Automatically fetch from the backend on load
  useEffect(() => {
    async function fetchTrustedLogos() {
      try {
        // Fetching all content for the "home" page
        const response = await fetch("http://localhost:8000/api/content/home");
        if (!response.ok) throw new Error("Failed to fetch CMS data");
        
        const data = await response.json();
        
        // Filter ONLY the items designated for the 'trusted_by' section
        const trustedSectionData = data.filter((item: any) => item.section === "trusted_by");
        
        setLogos(trustedSectionData);
      } catch (error) {
        console.error("Error fetching Trusted By logos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrustedLogos();
  }, []);

  // Calculate if we have enough logos to safely loop the marquee animation (usually need > 4)
  const isEnoughToLoop = logos.length >= 4;

  return (
    <section className="w-full py-16 relative z-30">
      
      {/* 12-Column Grid Alignment */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* Floating Card: Spans exactly from Column 2 to Column 11 */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-white rounded-[15px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-10 px-6 md:px-12 border border-gray-100">
          
          <h2 className="text-center text-industrial-slate font-bold tracking-widest text-sm md:text-base uppercase mb-8">
            Trusted By Industry Leaders In Precision Machining
          </h2>

          {/* Continuous Marquee Slider */}
          <div className="w-full overflow-hidden">
            <style>
              {`
                /* This forces the Swiper to move at a continuous linear speed without pausing */
                .trusted-swiper .swiper-wrapper {
                  transition-timing-function: linear !important;
                }
              `}
            </style>
            
            {/* Only render Swiper if we are done loading and have data */}
            {!isLoading && logos.length > 0 && (
              <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                loop={isEnoughToLoop} // Dynamically loop only if we have enough items
                speed={4000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                allowTouchMove={true}
                className="trusted-swiper"
              >
                {logos.map((logo) => (
                  <SwiperSlide key={logo.id}>
                    {/* Render Image if content_type is 'image' */}
                    {logo.content_type === "image" && logo.content_value ? (
                      <div className="w-full h-20 flex items-center justify-center cursor-grab active:cursor-grabbing">
                        <img 
                          // Prepend the backend URL so it finds the public_uploads folder correctly
                          src={`http://localhost:8000/${logo.content_value}`} 
                          alt={logo.content_key} 
                          className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    ) : (
                      /* Render Text Box if content_type is 'text' or missing an image */
                      <div className="w-full h-20 bg-gray-200/70 rounded-md flex items-center justify-center text-gray-700 font-medium text-sm transition hover:bg-gray-300 cursor-grab active:cursor-grabbing">
                        {logo.content_value || logo.content_key}
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Optional Loading State */}
            {isLoading && (
              <div className="w-full h-20 flex items-center justify-center text-gray-400">
                Loading partners...
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}