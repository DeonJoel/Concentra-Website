"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSlider() {
  // Shared gradient style to prevent the "crease" on dark images
  // Smoothly transitions all the way to 100% to eliminate hard stops
  const smoothGradient = {
    backgroundImage: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0) 100%)"
  };

  return (
    // Changed to h-screen to fill the entire viewport on load
    <div className="relative w-full h-screen min-h-[600px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {/* SLIDE 1: Factory / Shop Floor */}
        <SwiperSlide>
          <div className="relative w-full h-full flex items-center">
            {/* Wide Factory Image */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop')" }}
            ></div>
            
            {/* Smoothed Gradient Overlay */}
            <div 
              className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
              style={smoothGradient}
            ></div>

            {/* Content Grid */}
            <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
              <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full">
                <div>
                  <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
                    Precision Engineering & Manufacturing
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-industrial-slate">
                    Next-Generation Spindle Technology.
                  </h1>
                  <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium max-w-xl">
                    Delivering uncompromising quality, rapid re-manufacturing, and reliable engineering solutions to keep your production lines moving.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/company/facilities"
                      className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 w-fit shadow-md text-sm flex items-center justify-center"
                    >
                      View Manufacturing Facilities
                    </Link>
                    <Link 
                      href="/request-quote"
                      className="bg-transparent hover:bg-industrial-slate border-2 border-industrial-slate text-industrial-slate hover:text-white font-semibold py-3 px-8 rounded transition duration-300 w-fit text-sm flex items-center justify-center"
                    >
                      Request a Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2: Product Focus (Tool Clamping) */}
        <SwiperSlide>
          <div className="relative w-full h-full flex items-center">
            <div 
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')" }}
            ></div>
            
            <div 
              className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
              style={smoothGradient}
            ></div>

            <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
              <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full">
                <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
                  Uncompromising Quality
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-industrial-slate">
                  Engineered for Exacting Standards.
                </h1>
                <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium max-w-xl">
                  Explore our comprehensive range of HSK Tool Clamping Sets and precision machinery components built for ultimate durability.
                </p>
                <Link 
                  href="/products/tool-holding"
                  className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 w-fit shadow-md text-sm flex items-center justify-center"
                >
                  Explore Tool Holding
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3: Spindle Remanufacturing */}
        <SwiperSlide>
          <div className="relative w-full h-full flex items-center">
            <div 
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop')" }}
            ></div>
            
            <div 
              className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
              style={smoothGradient}
            ></div>

            <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
              <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full">
                <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
                  Service & Restoration
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-industrial-slate">
                  Expert Spindle Remanufacturing.
                </h1>
                <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium max-w-xl">
                  Restore your critical equipment to OEM specifications with our specialized diagnostics, balancing, and rebuilding services.
                </p>
                <Link 
                  href="/products/spindles"
                  className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 w-fit shadow-md text-sm flex items-center justify-center"
                >
                  View Spindle Services
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 4: Machining Services */}
        <SwiperSlide>
          <div className="relative w-full h-full flex items-center">
            <div 
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop')" }}
            ></div>
            
            <div 
              className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
              style={smoothGradient}
            ></div>

            <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full">
              <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full">
                <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
                  Advanced Capabilities
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-industrial-slate">
                  Comprehensive CNC Machining.
                </h1>
                <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium max-w-xl">
                  From high-volume horizontal turning to complex multi-axis milling, we deliver precision components on time, every time.
                </p>
                <Link 
                  href="/services"
                  className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 w-fit shadow-md text-sm flex items-center justify-center"
                >
                  Explore Machining Capabilities
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}