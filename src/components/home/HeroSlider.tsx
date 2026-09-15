"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Interface for our dynamically grouped slides
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

  // Shared gradient style to prevent the "crease" on dark images
  const smoothGradient = {
    backgroundImage: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0) 100%)"
  };

  useEffect(() => {
    async function fetchSliderData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/home`);
        if (!response.ok) throw new Error("Failed to fetch CMS data");
        
        const data = await response.json();
        
        // Isolate only the hero slider data
        const sliderData = data.filter((item: any) => item.section === "hero_slider");
        
        // Group the flat keys into distinct slide objects
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
    <div className="relative w-full h-screen min-h-[600px]">
      
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
                <div className="relative w-full h-full flex items-center">
                  
                  {/* Wide Background Image */}
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('${getImageUrl(slide.image)}')` }}
                  ></div>
                  
                  {/* Smoothed Gradient Overlay */}
                  <div 
                    className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
                    style={smoothGradient}
                  ></div>

                  {/* Content Grid */}
                  <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
                    
                    {/* HARD BUMPER APPLIED HERE: pt-[120px] on mobile/tablet, pt-[160px] on desktop */}
                    <div className="col-span-12 lg:col-start-2 lg:col-span-7 flex flex-col justify-center h-full pt-[120px] lg:pt-[160px] pb-12">
                      
                      <div>
                        {slide.subtitle && (
                          <p className="text-concentra-purple text-xs md:text-sm lg:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
                            {slide.subtitle}
                          </p>
                        )}
                        
                        {/* Scaled Typography: 3xl (Mobile) -> 4xl (Tablet) -> 5xl (Desktop) -> 6xl (Large Screens) */}
                        {slide.title && (
                          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-industrial-slate">
                            {slide.title}
                          </h1>
                        )}
                        
                        {/* Scaled Description: Shrinks slightly on mobile to prevent excessive height */}
                        {slide.description && (
                          <p className="text-sm md:text-base lg:text-lg mb-8 text-industrial-slate/80 font-medium max-w-xl whitespace-pre-wrap">
                            {slide.description}
                          </p>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          
                          {slide.btn1_text && slide.btn1_link && (
                            <Link 
                              href={slide.btn1_link}
                              className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 w-fit shadow-md text-sm flex items-center justify-center"
                            >
                              {slide.btn1_text}
                            </Link>
                          )}
                          
                          {slide.btn2_text && slide.btn2_link && (
                            <Link 
                              href={slide.btn2_link}
                              className="bg-transparent hover:bg-industrial-slate border-2 border-industrial-slate text-industrial-slate hover:text-white font-semibold py-3 px-8 rounded transition duration-300 w-fit text-sm flex items-center justify-center"
                            >
                              {slide.btn2_text}
                            </Link>
                          )}
                          
                        </div>
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