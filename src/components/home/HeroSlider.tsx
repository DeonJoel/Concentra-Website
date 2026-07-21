"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// 1. Define the interface for a single Slide
interface SlideData {
  id: number;
  heading: string;
  subHeading: string;
  image: string;
}

interface HeroSliderProps {
  slides: SlideData[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  
  // Safety fallback if the CMS is completely empty
  const displaySlides = slides && slides.length > 0 ? slides : [
    {
      id: 1,
      heading: "Next-Generation Spindle Technology & Precision Machining.",
      subHeading: "Delivering uncompromising quality and reliable engineering solutions.",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  // Helper to format the image URL so it points to Python's upload folder
  const getBgImageUrl = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop';
    return url.startsWith('http') ? url : `http://localhost:8000/${url}`;
  };

  return (
    <div className="relative w-full h-[80vh] min-h-[600px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {/* 2. Map through the dynamic slides array! */}
        {displaySlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              
              {/* DYNAMIC BACKGROUND IMAGE */}
              <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
                style={{ backgroundImage: `url('${getBgImageUrl(slide.image)}')` }}
              ></div>
              
              {/* Gradient Overlay */}
              <div 
                className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
                style={{ backgroundImage: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.8) 58%, rgba(255,255,255,0) 80%)" }}
              ></div>

              <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
                <div className="col-span-12 lg:col-start-2 lg:col-span-5 flex flex-col justify-center h-full">
                  <div>
                    <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
                      Precision Engineering & Manufacturing
                    </p>
                    
                    {/* DYNAMIC TEXT */}
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-4 text-industrial-slate">
                      {slide.heading}
                    </h1>
                    <p className="text-base md:text-lg mb-6 text-industrial-slate/80 font-medium">
                      {slide.subHeading}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-6 rounded transition duration-300 w-fit shadow-md text-sm">
                        View Manufacturing Facilities
                      </button>
                      <button className="bg-transparent hover:bg-industrial-slate border-2 border-industrial-slate text-industrial-slate hover:text-white font-semibold py-3 px-6 rounded transition duration-300 w-fit text-sm">
                        Request a Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}