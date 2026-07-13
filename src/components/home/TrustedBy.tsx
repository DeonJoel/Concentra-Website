"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 🚀 CMS PREPARATION: 
// This array acts as a mock database. When we connect Supabase, 
// we will replace this array with data fetched directly from your CMS dashboard.
const mockCMSLogos = [
  { id: 1, name: "Partner Logo 1" },
  { id: 2, name: "Partner Logo 2" },
  { id: 3, name: "Partner Logo 3" },
  { id: 4, name: "Partner Logo 4" },
  { id: 5, name: "Partner Logo 5" },
  { id: 6, name: "Partner Logo 6" },
];

export default function TrustedBy() {
  return (
    // We add a negative top margin (-mt-10 or similar in the parent) 
    // to make it "float" over the transition line if desired, 
    // but here we just apply standard padding to fit the grid.
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
              {/* Mapping through our mock CMS data */}
              {mockCMSLogos.map((logo) => (
                <SwiperSlide key={logo.id}>
                  {/* The Gray Placeholder Box */}
                  <div className="w-full h-20 bg-gray-200/70 rounded-md flex items-center justify-center text-gray-400 font-medium text-sm transition hover:bg-gray-300 cursor-grab active:cursor-grabbing">
                    {logo.name}
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