import React from "react";
import Link from "next/link";
import { ArrowRight, Target, ShieldCheck } from "lucide-react";

export default function CompanyIntro() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative z-20">
      
      {/* MASTER CONTAINER: Center-Locked Max Width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: Stacks on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline & Badges */}
          <div className="flex flex-col">
            <p className="text-concentra-purple font-bold tracking-widest text-xs md:text-sm uppercase mb-4 drop-shadow-sm">
              Welcome to Concentra
            </p>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-industrial-slate leading-tight mb-8 lg:mb-10">
              Driving Industrial Innovation Through Precision Manufacturing.
            </h2>
            
            {/* Quick Trust Badges */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#e6f4ea] rounded-xl flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-concentra-green" />
                </div>
                <span className="text-sm md:text-base font-bold text-slate-700 leading-tight">
                  ISO 9001:2015 <br /> <span className="font-medium text-slate-500 text-xs">Certified Facility</span>
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center shadow-sm">
                  <Target className="w-6 h-6 text-concentra-purple" />
                </div>
                <span className="text-sm md:text-base font-bold text-slate-700 leading-tight">
                  Sub-Micron <br /> <span className="font-medium text-slate-500 text-xs">Machining Accuracy</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Company Narrative & Link */}
          <div className="flex flex-col justify-center lg:pl-8">
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 font-medium">
              Concentra is a premier engineering facility specialising in the design, manufacturing, and re-manufacturing of high-performance spindles and precision-machined components. 
            </p>
            
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              Equipped with state-of-the-art CNC technology and backed by decades of metallurgical expertise, we partner with industry leaders to deliver robust, scalable, and exacting solutions that keep global production lines moving with absolute reliability.
            </p>
            
            {/* Elegant text link with hover animation */}
            <Link 
              href="/company/about"
              className="inline-flex items-center gap-2 text-concentra-green font-bold hover:text-green-700 transition-colors group w-fit text-sm md:text-base"
            >
              <span className="border-b-2 border-transparent group-hover:border-concentra-green transition-colors pb-0.5">
                Discover Our History & Vision
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}