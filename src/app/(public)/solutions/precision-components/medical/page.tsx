"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Target, ShieldCheck, Ruler } from "lucide-react";

// 1. Filter Categories
const categories = ["All Devices", "Orthopedic Implants", "Surgical Instruments", "Diagnostic Housings"];

const componentVariants = [
  {
    id: "med-ortho-01",
    name: "Titanium Bone Screw",
    category: "Orthopedic Implants",
    material: "Medical Grade Ti-6Al-4V ELI",
    tolerance: "±0.002 mm",
    certification: "ISO 13485",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2070&auto=format&fit=crop",
    link: "/request-quote"
  },
  {
    id: "med-surg-02",
    name: "Scalpel Handle",
    category: "Surgical Instruments",
    material: "Stainless Steel 17-4 PH",
    tolerance: "±0.005 mm",
    certification: "ISO 13485",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2070&auto=format&fit=crop",
    link: "/request-quote"
  }
];
// Update the <h1> to "Medical & Surgical" and the description paragraph.

export default function MedicalPage() {
  const [activeCategory, setActiveCategory] = useState("All Devices");

  const filteredProducts = activeCategory === "All Devices" 
    ? componentVariants 
    : componentVariants.filter(product => product.category === activeCategory);

  return (
    <main className="min-h-screen w-full bg-stone-50/50 pb-20">
      
      {/* HEADER BANNER */}
      <section className="w-full bg-industrial-slate pt-[140px] lg:pt-[100px] pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Link href="/solutions/precision-components" className="text-concentra-green hover:text-white transition-colors text-sm font-semibold flex items-center gap-1 mb-4 w-fit">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Precision Components
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Medical & Surgical
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              High-tolerance, complex geometries machined from titanium and high-temp alloys for mission-critical applications.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-concentra-purple/20 to-transparent z-0 blur-3xl"></div>
      </section>

      {/* MAIN LAYOUT: Sidebar + Content Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT SIDEBAR: FILTER MENU */}
          <div className="col-span-1 lg:col-span-3">
            <div className="lg:sticky lg:top-[120px]">
              <h3 className="hidden lg:block text-lg font-bold text-industrial-slate mb-4 pb-4 border-b border-gray-200">
                Filter by Material
              </h3>

              {/* MOBILE: Horizontal Scrollable Pills */}
              <div className="lg:hidden flex overflow-x-auto scrollbar-hide space-x-3 pb-2 -mx-4 px-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                      activeCategory === category
                        ? "bg-concentra-green border-concentra-green text-white shadow-md"
                        : "bg-white border-gray-200 text-slate-600 hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* DESKTOP: Vertical Stacked Menu */}
              <div className="hidden lg:flex flex-col space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-left w-full px-5 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-between group ${
                      activeCategory === category
                        ? "bg-concentra-green text-white shadow-md"
                        : "bg-transparent text-slate-600 hover:bg-white hover:shadow-sm hover:text-concentra-green border border-transparent hover:border-gray-100"
                    }`}
                  >
                    {category}
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === category ? "translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: PRODUCT GRID */}
          <div className="col-span-1 lg:col-span-9">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-industrial-slate">
                {activeCategory === "All Fixtures" ? "All Custom Jigs & Fixtures" : activeCategory}
              </h2>
              <span className="text-sm font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                {filteredProducts.length} Results
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link 
                  href={product.link} 
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                >
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-concentra-purple uppercase tracking-wider shadow-sm">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-industrial-slate mb-4 group-hover:text-concentra-green transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 flex-grow">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5" /> Material
                        </span>
                        <span className="text-sm font-bold text-slate-700">{product.material}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                          <Ruler className="w-3.5 h-3.5" /> Tolerance
                        </span>
                        <span className="text-sm font-bold text-slate-700">{product.tolerance}</span>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <span className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> Standard
                        </span>
                        <span className="text-sm font-bold text-slate-700">{product.certification}</span>
                      </div>
                    </div>
                    
                    <div className="w-full py-2.5 rounded-lg border-2 border-slate-100 text-industrial-slate font-bold text-sm text-center group-hover:border-concentra-green group-hover:text-concentra-green transition-colors mt-auto">
                      Request Quote
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}