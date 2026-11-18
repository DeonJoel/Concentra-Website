import React from "react";
import Link from "next/link";

export default function SpindlesPage() {
  // Data array for the 5 main spindle categories
  const spindleCategories = [
    {
      id: 'machining-center',
      title: 'Machining Center Series',
      desc: 'Heavy-duty spindles engineered for high material removal rates and superior rigidity in VMCs and HMCs.',
      img: 'https://www.setco.com/wp-content/uploads/2023/03/gear-icon-image.png.webp?q=80&w=2070&auto=format&fit=crop',
      link: '/solutions/spindles/machining-center'
    },
    {
      id: 'engraving-milling',
      title: 'Engraving & Milling Spindle',
      desc: 'High-speed, low-vibration motorized spindles for precision surface finishing and intricate engraving.',
      img: 'https://spindleexperts.com/wp-content/uploads/al_opt_content/IMAGE/spindleexperts.com/wp-content/uploads/2025/07/High-Frequency-Internal-grinding-Spindles-1024x683-1536.png.bv.webp?q=80&w=2070&auto=format&fit=crop',
      link: '/solutions/spindles/engraving-milling'
    },
    {
      id: 'dental-milling',
      title: 'Dental Milling Spindle',
      desc: 'Ultra-precise, compact spindles designed specifically for dental CAD/CAM milling machines and prosthetics.',
      img: 'https://www.haozhihs.net/upload/20220426/20220426113312.jpg?q=80&w=2070&auto=format&fit=crop',
      link: '/solutions/spindles/dental-milling'
    },
    {
      id: 'robot-parts',
      title: 'Core Functional Parts of Robots',
      desc: 'High-torque joint modules and compact spindle drives built for industrial automation and robotic arms.',
      img: 'https://d.veichi.com/image/index/product/rb200-r-3.jpg?q=80&w=2070&auto=format&fit=crop',
      link: '/solutions/spindles/robot-parts'
    },
    {
      id: 'motorized-drilling',
      title: 'Motorized Spindles for Drilling',
      desc: 'High-frequency drilling spindles offering exceptional axial stiffness for deep-hole and micro-drilling.',
      img: 'https://cpimg.tistatic.com/4599164/b/7/motorized-spindle.jpg?q=80&w=2070&auto=format&fit=crop',
      link: '/solutions/spindles/motorized-drilling'
    }
  ];

  return (
    <main className="min-h-screen w-full bg-stone-50/50">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[70vh] min-h-[500px]">
        {/* Background Image */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://www.microdynamicsfa.com/images/articles/cnc-spindle-types/0b5e89_a6bfd40537864f129d8d126fe39ae03e_mv2.webp?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        
        {/* Desktop Gradient Overlay */}
        <div 
          className="hidden lg:block absolute top-0 left-0 w-10/12 h-full z-10"
          style={{ backgroundImage: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 58%, rgba(255,255,255,0) 80%)" }}
        ></div>
        
        {/* Mobile Dark/Gradient Overlay to ensure text readability */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-full z-10 bg-white/80"></div>

        {/* Center-Locked Hero Content */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-[120px] lg:pt-[160px] pb-12">
          <div className="max-w-2xl lg:max-w-3xl">
            <p className="text-concentra-purple text-xs md:text-sm lg:text-base font-semibold tracking-widest uppercase mb-2 drop-shadow-sm">
              Products / Spindles & Technology
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              Advanced Spindle Solutions for Precision Machining.
            </h1>
            <p className="text-sm md:text-base lg:text-lg mb-8 text-industrial-slate/80 font-medium leading-relaxed">
              High-performance spindles engineered for uncompromising rotational accuracy and rigidity in General and Special Purpose Machine (SPM) applications.
            </p>
            <div className="flex gap-4">
              <Link href="/request-quote">
                <button className="bg-concentra-green hover:bg-green-600 text-white font-semibold py-3.5 px-8 rounded-lg transition duration-300 shadow-md text-sm">
                  Request a Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CATEGORIES DIRECTORY */}
      <section className="w-full py-20 relative z-30 -mt-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-slate mb-4">
              Explore Our Spindle Categories
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Select a core technology below to view purpose-built variants.
            </p>
          </div>

          {/* Grid layout for the 5 categories (3 top, 2 bottom centered using md:col-span logic) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {spindleCategories.map((category) => (
              <Link 
                key={category.id}
                href={category.link}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative w-full h-48 md:h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-industrial-slate/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={category.img} 
                    alt={category.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Text Section */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-industrial-slate mb-3 group-hover:text-concentra-purple transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                    {category.desc}
                  </p>
                  
                  {/* Fake "Button" Arrow for UI affordance */}
                  <div className="flex items-center text-sm font-bold text-concentra-green mt-auto">
                    View Series Details
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </section>

      {/* 3. MAIN CONTENT & OVERVIEW */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Side */}
            <div className="flex flex-col order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-industrial-slate mb-6">
                Precision at the Heart of Your Machine.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-base md:text-lg">
                The spindle is the critical heartbeat of any CNC or production machine. At Concentra, we design, manufacture, and assemble high-frequency spindles that deliver exceptional surface finish quality and maximum material removal rates.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8 text-base md:text-lg">
                Whether you are building a new automation line or upgrading an existing machine tool, our spindle technology guarantees thermal stability, minimal vibration, and extended bearing life even under continuous heavy-duty cycles.
              </p>
              <ul className="space-y-4">
                {['High-Speed & High-Torque Variants', 'Sub-micron Runout Accuracy', 'Superior Thermal Stability', 'Rigorous Dynamic Balancing'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-industrial-slate font-bold text-sm md:text-base">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Side */}
            <div className="relative h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2070&auto=format&fit=crop" 
                alt="Precision Machining and Spindle Technology" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. CAPABILITIES GRID (Bento Box Style) */}
      <section className="w-full py-20 lg:py-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <p className="text-concentra-purple font-semibold tracking-widest uppercase mb-2 text-sm">Spindle Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-slate">Engineering Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-industrial-slate mb-4">Custom Manufacturing</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Built-to-order spindles tailored precisely to your unique load requirements, operational speeds, and mounting configurations for SPM applications.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#e6f4ea] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-industrial-slate mb-4">Testing & Balancing</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                In-house dynamic balancing and advanced vibration analysis ensure smooth operation, guaranteeing sub-micron runout and extended bearing lifespan.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-industrial-slate mb-4">Re-Manufacturing</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Comprehensive spindle repair and rebuilding services. We diagnose and restore your damaged spindles to strictly meet or exceed OEM specifications.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}