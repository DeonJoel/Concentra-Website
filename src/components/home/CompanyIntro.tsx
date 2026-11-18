import React from "react";
import Link from "next/link";
import { ArrowRight, Target, ShieldCheck, Factory } from "lucide-react";

export default function CompanyIntro() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative z-20">
      
      {/* MASTER CONTAINER: Center-Locked Max Width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: Image on left, text on right for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Factory Image */}
          <div className="relative h-[350px] md:h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
            {/* The provided factory image */}
            <img
              src="/banner1.jpg"
              alt="Concentra Factory Facility"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Floating Info Badge over the image */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3">
               <div className="w-10 h-10 bg-[#F8EBFF] rounded-xl flex items-center justify-center shrink-0">
                 <Factory className="w-5 h-5 text-concentra-purple" />
               </div>
               <span className="text-sm font-bold text-industrial-slate leading-tight">
                 State-of-the-Art <br /> <span className="font-medium text-slate-500 text-xs">Manufacturing Plant</span>
               </span>
            </div>
          </div>

          {/* Right Column: Extended Company Narrative & Badges */}
          <div className="flex flex-col justify-center">
            <p className="text-concentra-purple font-bold tracking-widest text-xs md:text-sm uppercase mb-4 drop-shadow-sm">
              Welcome to Concentra
            </p>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-industrial-slate leading-tight mb-6">
              Driving Industrial Innovation Through Precision Manufacturing.
            </h2>
            
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-4 font-medium">
              Concentra is a premier engineering facility specialising in the design, manufacturing, and re-manufacturing of high-performance spindles and precision-machined components. 
            </p>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              Equipped with state-of-the-art CNC technology and backed by decades of metallurgical expertise, we partner with industry leaders to deliver robust, scalable, and exacting solutions that keep global production lines moving with absolute reliability.
            </p>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
              Our expansive, modern manufacturing plant houses advanced multi-axis machining centers, climate-controlled inspection labs, and dedicated assembly zones. By maintaining strict in-house control over the entire production lifecycle, we guarantee uncompromising quality from raw material selection to final delivery.
            </p>
            
            {/* Quick Trust Badges */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-10">
              <div className="flex items-center gap-3 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-[#e6f4ea] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-concentra-green" />
                </div>
                <span className="text-sm font-bold text-slate-700 leading-tight">
                  ISO 9001:2015 <br /> <span className="font-medium text-slate-500 text-xs">Certified Facility</span>
                </span>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Target className="w-6 h-6 text-concentra-purple" />
                </div>
                <span className="text-sm font-bold text-slate-700 leading-tight">
                  Sub-Micron <br /> <span className="font-medium text-slate-500 text-xs">Machining Accuracy</span>
                </span>
              </div>
            </div>

            {/* Elegant text link with hover animation */}
            <Link 
              href="/company/about"
              className="inline-flex items-center gap-2 text-concentra-green font-bold hover:text-green-700 transition-colors group w-fit text-sm md:text-base"
            >
              <span className="border-b-2 border-transparent group-hover:border-concentra-green transition-colors pb-0.5">
                Discover Our History & Facility
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}