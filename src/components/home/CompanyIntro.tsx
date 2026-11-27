import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function CompanyIntro() {
  return (
    <section className="w-full bg-white border-y border-border-subtle relative z-20">
      
      {/* --- TOP SECTION: Intro Grid --- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Responsive Grid: Image on left, text on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[85px] items-center">
          
          {/* Left Column: Factory Image & Floating Note */}
          <div className="relative w-full group">
            {/* Image Container */}
            <div className="h-[350px] md:h-[470px] w-full overflow-hidden">
              <img
                src="/banner1.jpg"
                alt="Concentra manufacturing facility"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Floating Note Badge */}
            <div className="absolute -bottom-[28px] -right-[10px] md:-right-[25px] bg-concentra-purple text-white px-[27px] py-[22px] flex items-center gap-[15px] shadow-xl z-10">
               <strong className="text-[38px] font-extrabold leading-none tracking-tight">
                 1995
               </strong>
               <span className="text-[11px] leading-[1.5] font-medium">
                 The year our<br />journey began.
               </span>
            </div>
          </div>

          {/* Right Column: Copy & Checklist */}
          <div className="flex flex-col justify-center mt-12 lg:mt-0">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-3 text-concentra-purple text-[11px] font-extrabold tracking-[2px] uppercase mb-5">
              <span className="w-[27px] h-[2px] bg-concentra-green inline-block"></span>
              WHO WE ARE
            </div>
            
            {/* Main Headline */}
            <h2 className="text-[clamp(31px,3.4vw,45px)] leading-[1.23] font-extrabold text-industrial-slate mb-[22px] tracking-[-1px]">
              Built on expertise.<br />
              <em className="text-concentra-purple not-italic">Driven by precision.</em>
            </h2>
            
            {/* Lead Paragraph */}
            <p className="text-[17px] font-bold leading-[1.65] text-industrial-slate mb-4">
              Engineering excellence isn't a claim. It's a commitment reflected in every component we manufacture.
            </p>
            
            {/* Secondary Paragraph */}
            <p className="text-[14px] leading-[1.9] text-[#716b77] mb-6">
              Established in 1995 in Bengaluru, Concentra Precision Technologies Pvt. Ltd. manufactures complex, high-precision components and assemblies. Our skilled engineers and machinists are supported by comprehensive in-house machining capabilities and dedicated metrology equipment.
            </p>
            
            {/* Check Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[17px] my-[26px]">
              <span className="flex items-center gap-2 text-[12px] font-bold text-industrial-slate">
                <Check className="w-4 h-4 text-concentra-green shrink-0 stroke-[3]" /> Integrated machining facilities
              </span>
              <span className="flex items-center gap-2 text-[12px] font-bold text-industrial-slate">
                <Check className="w-4 h-4 text-concentra-green shrink-0 stroke-[3]" /> Skilled engineering workforce
              </span>
              <span className="flex items-center gap-2 text-[12px] font-bold text-industrial-slate">
                <Check className="w-4 h-4 text-concentra-green shrink-0 stroke-[3]" /> Precision measurement & inspection
              </span>
              <span className="flex items-center gap-2 text-[12px] font-bold text-industrial-slate">
                <Check className="w-4 h-4 text-concentra-green shrink-0 stroke-[3]" /> Complex component expertise
              </span>
            </div>

            {/* Link */}
            <Link 
              href="/company/about"
              className="inline-flex items-center gap-1.5 text-concentra-purple font-extrabold text-[13px] border-b border-concentra-purple pb-[7px] w-fit hover:text-[#70376c] hover:border-[#70376c] transition-colors"
            >
              Discover our capabilities <span className="text-[15px] leading-none">↗</span>
            </Link>

          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: Numbers Strip --- */}
      <div className="w-full bg-[#2a1731] py-[42px] text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
            
            {/* Stat 1 */}
            <div className="md:border-r md:border-white/15 px-2 md:pl-0 md:pr-[35px]">
              <strong className="block text-[34px] font-extrabold leading-none mb-1">
                1995
              </strong>
              <span className="text-[11px] text-[#d5cbd6]">Established</span>
            </div>

            {/* Stat 2 */}
            <div className="md:border-r md:border-white/15 px-2 md:px-[35px]">
              <strong className="block text-[34px] font-extrabold leading-none mb-1">
                86,000<span className="text-[14px] font-normal"> sq. ft.</span>
              </strong>
              <span className="text-[11px] text-[#d5cbd6]">Facility land area</span>
            </div>

            {/* Stat 3 */}
            <div className="md:border-r md:border-white/15 px-2 md:px-[35px]">
              <strong className="block text-[34px] font-extrabold leading-none mb-1">
                35,000<span className="text-[14px] font-normal"> sq. ft.</span>
              </strong>
              <span className="text-[11px] text-[#d5cbd6]">Shop floor</span>
            </div>

            {/* Stat 4 */}
            <div className="px-2 md:pl-[35px] md:border-0">
              <strong className="block text-[34px] font-extrabold leading-none mb-1">
                3
              </strong>
              <span className="text-[11px] text-[#d5cbd6]">Dedicated manufacturing shops</span>
            </div>

          </div>

        </div>
      </div>
      
    </section>
  );
}