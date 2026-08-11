import React from "react";
import Link from "next/link";

export default function SpindlesPage() {
  return (
    <main className="min-h-screen w-full bg-transparent">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[70vh] min-h-[500px]">
        {/* Background Image (Industrial CNC focus) */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613588718956-c2e80382bf27?q=80&w=2070&auto=format&fit=crop')" }}
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
              Products / Spindles & Technology
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              Advanced Spindle Solutions for Precision Machining.
            </h1>
            <p className="text-base md:text-lg mb-8 text-industrial-slate/80 font-medium leading-relaxed">
              High-performance spindles engineered for uncompromising rotational accuracy and rigidity in General and Special Purpose Machine (SPM) applications.
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
                  Precision at the Heart of Your Machine.
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The spindle is the critical heartbeat of any CNC or production machine. At Concentra, we design, manufacture, and assemble high-frequency spindles that deliver exceptional surface finish quality and maximum material removal rates.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Whether you are building a new automation line or upgrading an existing machine tool, our spindle technology guarantees thermal stability, minimal vibration, and extended bearing life even under continuous heavy-duty cycles.
                </p>
                <ul className="space-y-3">
                  {['High-Speed & High-Torque Variants', 'Sub-micron Runout Accuracy', 'Superior Thermal Stability', 'Rigorous Dynamic Balancing'].map((item, i) => (
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
                  src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2070&auto=format&fit=crop" 
                  alt="Precision Machining and Spindle Technology" 
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
              <p className="text-concentra-purple font-semibold tracking-widest uppercase mb-2">Spindle Expertise</p>
              <h2 className="text-3xl font-bold text-industrial-slate">Engineering Excellence</h2>
            </div>

            {/* Inner Grid for the cards (3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Custom Manufacturing</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Built-to-order spindles tailored precisely to your unique load requirements, operational speeds, and mounting configurations for SPM applications.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#e6f4ea] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Testing & Balancing</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  In-house dynamic balancing and advanced vibration analysis ensure smooth operation, guaranteeing sub-micron runout and extended bearing lifespan.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-industrial-slate mb-3">Re-Manufacturing</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Comprehensive spindle repair and rebuilding services. We diagnose and restore your damaged spindles to strictly meet or exceed OEM specifications.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}