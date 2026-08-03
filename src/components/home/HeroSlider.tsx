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
        const response = await fetch("http://localhost:8000/api/content/home");
        if (!response.ok) throw new Error("Failed to fetch CMS data");
        
        const data = await response.json();
        
        // Isolate only the hero slider data
        const sliderData = data.filter((item: any) => item.section === "hero_slider");
        
        // Group the flat keys (slide_1_title, slide_1_image) into distinct slide objects
        const groupedSlides: Record<number, any> = {};
        
        sliderData.forEach((item: any) => {
          // Extract the number and the property name using regex (e.g., "slide_1_title" -> "1", "title")
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

        // Convert the grouped object back to an array and sort by ID so slide 1 comes before slide 2
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

  // Helper to format image paths
  const getImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `http://localhost:8000/${url}`;
  };

  return (
    <div className="relative w-full h-screen min-h-[600px]">
      
      {isLoading ? (
        // Simple loading state to prevent flash of unstyled content
        <div className="w-full h-full bg-stone-100 animate-pulse flex items-center justify-center">
          <span className="text-industrial-slate font-medium">Loading Experience...</span>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={slides.length > 1} // Only loop if there is more than 1 slide
          className="w-full h-full"
        >
          
          {slides.length > 0 ? (
            // DYNAMIC RENDERING: Map through CMS slides
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

                  {/* Content Grid (Confined to cols 2-6) */}
                  <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
                    <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full">
                      
                      <div>
                        {slide.subtitle && (
                          <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
                            {slide.subtitle}
                          </p>
                        )}
                        
                        {slide.title && (
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-industrial-slate">
                            {slide.title}
                          </h1>
                        )}
                        
                        {slide.description && (
                          <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium max-w-xl whitespace-pre-wrap">
                            {slide.description}
                          </p>
                        )}
                        
                        {/* DYNAMIC BUTTON LOGIC: Adjusts layout based on how many buttons exist */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          
                          {/* Button 1 (Solid Green Style) */}
                          {slide.btn1_text && slide.btn1_link && (
                            <Link 
                              href={slide.btn1_link}
                              className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 w-fit shadow-md text-sm flex items-center justify-center"
                            >
                              {slide.btn1_text}
                            </Link>
                          )}
                          
                          {/* Button 2 (Transparent Outline Style) */}
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
            // FALLBACK: In case CMS is totally empty, show a blank placeholder slide
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