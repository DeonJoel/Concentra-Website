import React from "react";
import Link from "next/link";

export default function CuttingToolsPage() {
  return (
    <main className="min-h-screen w-full bg-transparent">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[65vh] min-h-[500px]">
        {/* Background Image (CNC Cutting/Milling focus) */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        
        {/* Figma Gradient Overlay */}
        <div 
          className="absolute top-0 left-0 w-full lg:w-10/12 h-full z-10 bg-white/90 lg:bg-transparent"
          style={{ 
            backgroundImage: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 58%, rgba(255,255,255,0) 80%)" 
          }}
        ></div>

        {/* Hero Content aligned to Grid */}
        <div className="relative z-20 w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px] h-full pt-15">
          {/* Text constrained: Starts at column 2, spans 6 columns */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-6 flex flex-col justify-center h-full pt-10">
            <p className="text-concentra-purple text-sm md:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
              Products / Cutting Tools
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              Durable and Precise Tools for Complex Machining.
            </h1>
            <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium leading-relaxed">
              Engineered for extended tool life, superior surface finishes, and maximum material removal rates in demanding industrial environments.
            </p>
            <div className="flex gap-4">
              <Link href="/request-quote">
                <button className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition duration-300 shadow-md text-sm">
                  Request a Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT & OVERVIEW */}
      <section className="w-full py-20 lg:py-28">
        <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
          
          {/* Main Container: Starts at Col 2, Spans exactly 10 Columns */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Side */}
              <div className="flex flex-col">
                <h2 className="text-3xl lg:text-4xl font-bold text-industrial-slate mb-6">
                  High-Performance Tooling for Maximum Efficiency.
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The efficiency of your CNC operations relies heavily on the quality of your cutting tools. Concentra provides a comprehensive range of standard and custom profile tools designed to withstand high thermal and mechanical stress.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Whether you are machining tough aerospace alloys or conducting high-speed continuous milling on cast iron blocks, our solid carbide and advanced coated tools deliver consistent, micron-level accuracy.
                </p>
                <ul className="space-y-3">
                  {['Solid Carbide & High-Speed Steel (HSS)', 'Custom Profile & Step Drills', 'Advanced Wear-Resistant Coatings', 'Optimized Chip Evacuation Geometries'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-industrial-slate font-medium">
                      <svg className="w-5 h-5 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Side */}
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop" 
                  alt="Precision cutting tool and milling process" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES GRID (Bento Box Style) */}
      <section className="w-full pb-24 lg:pb-32">
        <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
          
          {/* Main Container: Starts at Col 2, Spans exactly 10 Columns */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            
            <div className="text-center mb-12">
              <p className="text-concentra-purple font-semibold tracking-widest uppercase mb-2">Tooling Expertise</p>
              <h2 className="text-3xl font-bold text-industrial-slate">Our Cutting Edge</h2>
            </div>

            {/* Inner Grid for the cards (3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Custom Tool Design</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Tailor-made cutting solutions designed specifically for your unique geometries, reducing the number of passes required and saving valuable cycle time.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#e6f4ea] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Advanced Materials</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Sourced from premium-grade substrates and finished with advanced coatings (TiN, TiAlN) to drastically improve wear resistance and thermal endurance.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Precision Re-Grinding</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Extend the lifecycle of your investments. Our expert sharpening and re-grinding services restore your dull cutting tools to pristine, OEM-level performance.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}