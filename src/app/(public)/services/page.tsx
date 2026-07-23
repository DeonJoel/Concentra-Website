import React from "react";
import Link from "next/link";

// --- Services Data ---
const services = [
  { title: "CNC Vertical Machining", href: "/services/vertical-machining", description: "Twin pallet VMC handling milled components up to 1250x550x700mm." },
  { title: "CNC Horizontal Machining", href: "/services/horizontal-machining", description: "Heavy-duty HMCs capable of handling parts up to 2000x1250x1250mm." },
  { title: "CNC Turning", href: "/services/turning", description: "Precision turning centers handling parts up to dia 400mm x 1500mm." },
  { title: "CNC Precision Grinding", href: "/services/grinding", description: "Temperature-controlled outer, internal & thread grinding." },
  { title: "Cast Iron Machining", href: "/services/cast-iron", description: "Specialized roughing and finishing operations for heavy cast iron blocks." },
  { title: "Spindle Balancing & Testing", href: "/services/balancing", description: "In-house rigorous balancing and testing facilities." },
];

export default function ServicesOverviewPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50/50 py-20">
      
      {/* 12-Column Grid Container */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* Content strictly between Column 2 and 11 */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          
          {/* Header Section */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-industrial-slate mb-4">
              Our Services
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              State-of-the-art machining and manufacturing services designed to deliver uncompromising precision and reliability for your most critical components.
            </p>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service) => (
              <Link 
                key={service.title} 
                href={service.href}
                className="group block bg-white p-8 lg:p-10 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-purple-200 hover:bg-[#F8EBFF]/30"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-concentra-purple mb-3 transition-colors group-hover:text-purple-900">
                      {service.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Subtle 'Explore' link */}
                  <div className="mt-6 flex items-center text-concentra-green font-semibold text-sm opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Explore Service 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}