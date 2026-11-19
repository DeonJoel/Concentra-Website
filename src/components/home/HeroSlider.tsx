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

  // Exact gradients from the new design specification
  const desktopGradient = {
    background: "linear-gradient(90deg, rgba(29, 17, 37, 0.97) 0%, rgba(29, 17, 37, 0.87) 44%, rgba(29, 17, 37, 0.24) 100%)"
  };
  const mobileGradient = {
    background: "linear-gradient(90deg, rgba(29, 20, 37, 0.96) 0%, rgba(29, 20, 37, 0.75) 100%)"
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
    <div className="relative w-full h-[100dvh] min-h-[690px] bg-[#201d26] text-white overflow-hidden">
      
      {/* VERTICAL SIDE BRANDING (Visible on Desktop) */}
      <div 
        className="hidden lg:block absolute right-[18px] bottom-[28px] z-30 pointer-events-none" 
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="text-[9px] tracking-[3px] text-white/60 uppercase">
          Concentra Precision Technologies
        </span>
      </div>

      {isLoading ? (
        <div className="w-full h-full bg-[#1c1222] animate-pulse flex items-center justify-center">
          <span className="text-white/50 font-medium tracking-widest text-sm uppercase">Loading...</span>
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
                
                <div className="relative w-full h-full flex flex-col justify-center">
                  
                  {/* BACKGROUND IMAGE WITH SATURATION FILTER */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center z-0 saturate-[0.7]"
                    style={{ backgroundImage: `url('${getImageUrl(slide.image)}')` }}
                  ></div>
                  
                  {/* DESKTOP GRADIENT */}
                  <div 
                    className="hidden lg:block absolute inset-0 z-10"
                    style={desktopGradient}
                  ></div>

                  {/* MOBILE GRADIENT */}
                  <div 
                    className="block lg:hidden absolute inset-0 z-10"
                    style={mobileGradient}
                  ></div>

                  {/* CONTENT CONTAINER */}
                  <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-16 lg:pt-[85px] pb-[45px]">
                    
                    {/* EYEBROW */}
                    {slide.subtitle && (
                      <div className="flex items-center gap-3 text-[#d6b9d3] text-[11px] font-extrabold tracking-[2px] uppercase mb-5">
                        <span className="w-[27px] h-[2px] bg-concentra-green inline-block"></span>
                        {slide.subtitle}
                      </div>
                    )}
                    
                    {/* 
                      DYNAMIC TITLE WITH HTML INJECTION 
                      This allows CMS content like: "Precision in<br>every detail.<br><em>Confidence</em> in<br>every component." 
                      The [&>em] targets the <em> tags and applies the brand green automatically.
                    */}
                    {slide.title && (
                      <h1 
                        className="text-[clamp(42px,5.1vw,70px)] leading-[1.13] font-extrabold tracking-[-2px] mb-6 [&>em]:text-concentra-green [&>em]:not-italic max-w-3xl"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      />
                    )}
                    
                    {/* DESCRIPTION */}
                    {slide.description && (
                      <p className="max-w-[530px] text-[#e0dbe2] text-[14px] lg:text-[15px] leading-[1.85] mb-7">
                        {slide.description}
                      </p>
                    )}
                    
                    {/* BUTTON ACTIONS */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      {slide.btn1_text && slide.btn1_link && (
                        <Link 
                          href={slide.btn1_link}
                          className="inline-flex items-center justify-between gap-[35px] px-[22px] py-[17px] text-[12px] font-extrabold transition-all hover:-translate-y-0.5 bg-concentra-green text-[#1b2c1b]"
                        >
                          {slide.btn1_text} <span>↗</span>
                        </Link>
                      )}
                      
                      {slide.btn2_text && slide.btn2_link && (
                        <Link 
                          href={slide.btn2_link}
                          className="inline-flex items-center justify-between gap-[35px] px-[22px] py-[17px] text-[12px] font-extrabold transition-all hover:-translate-y-0.5 border border-white/30 text-white hover:bg-white/10"
                        >
                          {slide.btn2_text} <span>↗</span>
                        </Link>
                      )}
                    </div>

                    {/* HERO PROOF STATS (Matches the new design perfectly) */}
                    <div className="flex flex-wrap gap-5 md:gap-[55px] border-t border-white/20 mt-[40px] md:mt-[55px] pt-[25px]">
                      <span className="flex flex-col gap-[5px]">
                        <b className="text-[23px] md:text-[28px] font-extrabold leading-none">30+</b>
                        <small className="text-[10px] text-[#c6bbc9] max-w-[110px] leading-tight">Years of engineering heritage</small>
                      </span>
                      <span className="flex flex-col gap-[5px]">
                        <b className="text-[23px] md:text-[28px] font-extrabold leading-none">35,000</b>
                        <small className="text-[10px] text-[#c6bbc9] max-w-[110px] leading-tight">Sq. ft. shop floor</small>
                      </span>
                      <span className="flex flex-col gap-[5px]">
                        <b className="text-[23px] md:text-[28px] font-extrabold leading-none">ISO</b>
                        <small className="text-[10px] text-[#c6bbc9] max-w-[110px] leading-tight">9001:2015 certified</small>
                      </span>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#201d26]">
                <h1 className="text-2xl text-white/50 font-bold mb-2">No Slides Found</h1>
                <p className="text-white/30 text-sm">Add slides with section key "hero_slider" in CMS.</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      )}
    </div>
  );
}