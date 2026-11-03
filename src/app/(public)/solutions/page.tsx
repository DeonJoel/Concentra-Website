import React from "react";
import Link from "next/link";

// --- Product Data ---
const products = [
  { 
    title: "Precision Components", 
    href: "/solutions/precision-components", 
    description: "High-accuracy parts machined to exact specifications and tolerances." 
  },
  { 
    title: "Spindles & Technology", 
    href: "/solutions/spindles", 
    description: "Advanced spindles for General and Special Purpose Machine (SPM) applications." 
  },
  { 
    title: "Inspection Gauges & Mandrels", 
    href: "/solutions/gauges", 
    description: "Highly reliable measurement tools for strict quality assurance." 
  },
];

export default function ProductsOverviewPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50/50 py-20">
      
      {/* 12-Column Grid Container */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* Content strictly between Column 2 and 11 */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          
          {/* Header Section */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-industrial-slate mb-4">
              Our Products
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Explore our comprehensive range of precision-engineered solutions designed to meet the exacting standards of modern manufacturing.
            </p>
          </div>

          {/* Product Cards Grid (Matches image_ce98c0.png layout but scaled up) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {products.map((product) => (
              <Link 
                key={product.title} 
                href={product.href}
                className="group block bg-white p-8 lg:p-10 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-purple-200 hover:bg-[#F8EBFF]/30"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-concentra-purple mb-3 transition-colors group-hover:text-purple-900">
                      {product.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                      {product.description}
                    </p>
                  </div>
                  
                  {/* Subtle 'Explore' link that appears on hover to guide the user */}
                  <div className="mt-6 flex items-center text-concentra-green font-semibold text-sm opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Explore Product 
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