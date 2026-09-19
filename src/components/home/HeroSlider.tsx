"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface SlideData {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  btn1_text: string;
  btn1_link: string;
  btn2_text: string;
  btn2_link: string;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const smoothGradient = {
    backgroundImage: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0) 100%)"
  };

  useEffect(() => {
    async function fetchSliderData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/home`);
        if (!response.ok) throw new Error("Failed to fetch CMS data");
        
        const data = await response.json();
        
        const sliderData = data.filter((item: any) => item.section === "hero_slider");
        const groupedSlides: Record<number, any> = {};
        
        sliderData.forEach((item: any) => {
          const match = item.content_key.match(/^slide_(\d+)_(.+)$/);
          if (match) {
            const slideId = parseInt(match[1], 10);
            const prop = match[2];
            
            if (!groupedSlides[slideId]) {
              groupedSlides[slideId] = { id: slideId };
            }
            groupedSlides[slideId][prop] = item.content_value;
          }
        });

        const slidesArray = Object.values(groupedSlides).sort((a: any, b: any) => a.id - b.id);
        setSlides(slidesArray);
        
      } catch (error) {
        console.error("Error fetching Hero Slider data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSliderData();
  }, []);

  const getImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
  };

  return (
    /* FIXED: Changed h-screen to h-[100dvh] to respect mobile browser UI and navigation bars */
    <div className="relative w-full h-[100dvh] min-h-[600px] bg-industrial-slate">
      
      {isLoading ? (
        <div className="w-full h-full bg-stone-100 animate-pulse flex items-center justify-center">
          <span className="text-industrial-slate font-medium">Loading Experience...</span>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={slides.length > 1}
          className="w-full h-full"
        >
          
          {slides.length > 0 ? (
            slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                
                <div className="relative w-full h-full flex flex-col justify-end lg:justify-center">
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('${getImageUrl(slide.image)}')` }}
                  ></div>
                  
                  <div 
                    className="hidden lg:block absolute top-0 left-0 w-10/12 h-full z-10"
                    style={smoothGradient}
                  ></div>

                  <div className="relative z-20 w-full max-w-7xl mx-auto lg:px-8 h-full flex flex-col justify-end lg:justify-center pointer-events-none">
                    
                    {/* 
                      FIXED: Added pb-[calc(2rem+env(safe-area-inset-bottom))] 
                      This ensures the card always pads itself above the physical home button/navigation bar!
                    */}
                    <div className="bg-white lg:bg-transparent w-full lg:max-w-3xl rounded-tr-[3rem] lg:rounded-none px-6 pt-10 pb-[calc(2rem+env(safe-area-inset-bottom))] lg:p-0 pointer-events-auto">
                      
                      {slide.subtitle && (
                        <p className="text-concentra-purple text-xs md:text-sm lg:text-base font-bold tracking-widest uppercase mb-2 drop-shadow-sm">
                          {slide.subtitle}
                        </p>
                      )}
                      
                      {slide.title && (
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-industrial-slate">
                          {slide.title}
                        </h1>
                      )}
                      
                      {slide.description && (
                        <p className="text-sm md:text-base lg:text-lg mb-8 text-industrial-slate/80 font-medium whitespace-pre-wrap">
                          {slide.description}
                        </p>
                      )}
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        
                        {slide.btn1_text && slide.btn1_link && (
                          <Link 
                            href={slide.btn1_link}
                            className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3.5 px-8 rounded-lg transition duration-300 w-full sm:w-fit shadow-md text-sm flex items-center justify-center"
                          >
                            {slide.btn1_text}
                          </Link>
                        )}
                        
                        {slide.btn2_text && slide.btn2_link && (
                          <Link 
                            href={slide.btn2_link}
                            className="bg-transparent hover:bg-stone-50 border-2 border-industrial-slate text-industrial-slate font-semibold py-3.5 px-8 rounded-lg transition duration-300 w-full sm:w-fit text-sm flex items-center justify-center"
                          >
                            {slide.btn2_text}
                          </Link>
                        )}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-2xl text-gray-500 font-bold mb-2">No Slides Found</h1>
                <p className="text-gray-400">Add slides with section key "hero_slider" in CMS.</p>
              </div>
            </SwiperSlide>
          )}

        </Swiper>
      )}
    </div>
  );
}