"use client";
import React from "react";

export default function ProcessBanner() {
  return (
    <section className="w-full py-16 relative z-30 mb-10 bg-transparent">
      
      {/* MASTER CONTAINER: Center-Locked Max Width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* THE FLOATING WINDOW: Purple background with rounded corners and shadow */}
        <div className="w-full bg-concentra-purple rounded-[20px] shadow-2xl p-8 md:p-12 lg:p-16 text-white overflow-hidden relative">
          
          {/* Subtle Background Glow for depth */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          {/* HEADER SECTION */}
          <div className="relative z-10 mb-10 lg:mb-[45px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 text-[#d6b9d3] text-[11px] font-extrabold tracking-[2px] uppercase mb-5">
              <span className="w-[27px] h-[2px] bg-concentra-green inline-block"></span>
              HOW WE WORK
            </div>
            
            {/* Main Title */}
            <h2 className="text-[clamp(31px,4vw,39px)] leading-[1.2] font-extrabold tracking-[-1.5px] m-0">
              From your drawing<br className="hidden sm:block" />
              to a dependable part.
            </h2>
          </div>

          {/* PROCESS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[25px] relative z-10">
            
            {/* Step 01 */}
            <div className="border-t border-[#ffffff65] pt-[20px]">
              <span className="text-[24px] text-concentra-green font-extrabold block mb-1">
                01
              </span>
              <h3 className="font-extrabold text-[17px] mb-2">
                Understand
              </h3>
              <p className="text-[12px] leading-[1.8] text-[#f2e6f1]">
                Share drawings, specifications, volumes and critical tolerances.
              </p>
            </div>

            {/* Step 02 */}
            <div className="border-t border-[#ffffff65] pt-[20px]">
              <span className="text-[24px] text-concentra-green font-extrabold block mb-1">
                02
              </span>
              <h3 className="font-extrabold text-[17px] mb-2">
                Engineer
              </h3>
              <p className="text-[12px] leading-[1.8] text-[#f2e6f1]">
                Review manufacturability and determine the right machining approach.
              </p>
            </div>

            {/* Step 03 */}
            <div className="border-t border-[#ffffff65] pt-[20px]">
              <span className="text-[24px] text-concentra-green font-extrabold block mb-1">
                03
              </span>
              <h3 className="font-extrabold text-[17px] mb-2">
                Manufacture
              </h3>
              <p className="text-[12px] leading-[1.8] text-[#f2e6f1]">
                Produce using our in-house machining, grinding and assembly facilities.
              </p>
            </div>

            {/* Step 04 */}
            <div className="border-t border-[#ffffff65] pt-[20px]">
              <span className="text-[24px] text-concentra-green font-extrabold block mb-1">
                04
              </span>
              <h3 className="font-extrabold text-[17px] mb-2">
                Verify
              </h3>
              <p className="text-[12px] leading-[1.8] text-[#f2e6f1]">
                Inspect against agreed requirements before dispatch.
              </p>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}