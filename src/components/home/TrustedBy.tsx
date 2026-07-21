"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 1. Define the props interface for the CMS data
interface TrustedByProps {
  heading: string;
  logos: any[];
}

export default function TrustedBy({ heading, logos }: TrustedByProps) {
  
  // 2. Safety fallback just in case the CMS is empty, preserving your 6 mock boxes
  const displayLogos = logos && logos.length > 0 ? logos : [
    { id: 'mock1', content_type: 'text', content_value: "Partner Logo 1" },
    { id: 'mock2', content_type: 'text', content_value: "Partner Logo 2" },
    { id: 'mock3', content_type: 'text', content_value: "Partner Logo 3" },
    { id: 'mock4', content_type: 'text', content_value: "Partner Logo 4" },
    { id: 'mock5', content_type: 'text', content_value: "Partner Logo 5" },
    { id: 'mock6', content_type: 'text', content_value: "Partner Logo 6" },
  ];

  return (
    <section className="w-full py-16 relative z-30">
      
      {/* 12-Column Grid Alignment */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* Floating Card: Spans exactly from Column 2 to Column 11 */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-white rounded-[15px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-10 px-6 md:px-12 border border-gray-100">
          
          <h2 className="text-center text-industrial-slate font-bold tracking-widest text-sm md:text-base uppercase mb-8">
            {heading || "Trusted By Industry Leaders In Precision Machining"}
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
            
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              loop={true}
              speed={4000} // Speed of the continuous scroll
              autoplay={{
                delay: 0, // 0 delay creates the seamless marquee effect
                disableOnInteraction: false, // Keeps scrolling even after user drags it
              }}
              allowTouchMove={true} // Enables the mouse-drag and mobile-touch swipe!
              className="trusted-swiper"
            >
              {/* Mapping through our LIVE CMS data */}
              {displayLogos.map((logo) => (
                <SwiperSlide key={logo.id}>
                  {/* The Gray Placeholder Box */}
                  <div className="w-full h-20 bg-gray-200/70 rounded-md flex items-center justify-center text-gray-400 font-medium text-sm transition hover:bg-gray-300 cursor-grab active:cursor-grabbing overflow-hidden p-2">
                    
                    {/* DYNAMIC RENDER: Image vs Text */}
                    {logo.content_type === "image" ? (
                      <img 
                        // If it's an image, point to the Python backend's public upload folder
                        src={logo.content_value.startsWith('http') ? logo.content_value : `http://localhost:8000/${logo.content_value}`} 
                        alt="Partner Logo" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      // If it's text, just display the text string
                      <span className="text-center truncate px-2">{logo.content_value}</span>
                    )}

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
}