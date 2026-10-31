import React from "react";
import Link from "next/link";

export default function PrecisionComponentsPage() {
  // Broad categories for Precision Components
  const componentCategories = [
    {
      id: 'aerospace-defense',
      title: 'Aerospace & Defense',
      desc: 'High-tolerance, complex geometries machined from titanium and high-temp alloys for mission-critical applications.',
      img: 'https://images.unsplash.com/photo-1580983546535-375498877395?q=80&w=2070&auto=format&fit=crop',
      link: '/products/precision-components/aerospace'
    },
    {
      id: 'automotive-parts',
      title: 'Automotive Components',
      desc: 'Precision-turned transmission and engine components built for high-volume scalability and exacting consistency.',
      img: 'https://images.unsplash.com/photo-1533422902779-facfac161439?q=80&w=2070&auto=format&fit=crop',
      link: '/products/precision-components/automotive'
    },
    {
      id: 'valves-pumps',
      title: 'Industrial Valves & Pumps',
      desc: 'Heavy-duty fluid control components requiring perfect concentricity, surface finish, and pressure ratings.',
      img: 'https://images.unsplash.com/photo-1622322384777-a8dfc8888b56?q=80&w=2070&auto=format&fit=crop',
      link: '/products/precision-components/valves-pumps'
    },
    {
      id: 'medical-devices',
      title: 'Medical & Surgical',
      desc: 'Micro-machined components utilizing stainless steel and medical-grade plastics for sterile environments.',
      img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2070&auto=format&fit=crop',
      link: '/products/precision-components/medical'
    },
    {
      id: 'custom-fixtures',
      title: 'Custom Jigs & Fixtures',
      desc: 'Purpose-built workholding and assembly fixtures engineered to streamline your internal manufacturing processes.',
      img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2070&auto=format&fit=crop',
      link: '/products/precision-components/custom-fixtures'
    }
  ];

  return (
    <main className="min-h-screen w-full bg-stone-50/50">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[70vh] min-h-[500px]">
        {/* Background Image */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop')" }}
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
              Products / Precision Components
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-industrial-slate">
              High-Accuracy Parts Machined to Exact Specifications.
            </h1>
            <p className="text-sm md:text-base lg:text-lg mb-8 text-industrial-slate/80 font-medium leading-relaxed">
              Leveraging state-of-the-art CNC technology to deliver complex, high-tolerance components for the most demanding industrial applications.
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
              Explore Component Categories
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
              Select an industry or application below to view purpose-built component series and manufacturing specifications.
            </p>
          </div>

          {/* Grid layout for the 5 categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {componentCategories.map((category) => (
              <Link 
                key={category.id}
                href={category.link}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-300 hover:-translate-y-1"
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
                  
                  {/* Fake "Button" Arrow */}
                  <div className="flex items-center text-sm font-bold text-concentra-green mt-auto">
                    View Component Details
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
                Engineered for Reliability and Performance.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-base md:text-lg">
                At Concentra, we specialize in the manufacturing of precision-machined components that form the backbone of critical machinery. From intricate aerospace fixtures to heavy-duty industrial valves, our components are machined with uncompromising accuracy.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8 text-base md:text-lg">
                Our facility is equipped with multi-axis CNC turning and milling centers capable of maintaining tolerances down to the micron level, ensuring every part fits seamlessly into your assembly line.
              </p>
              <ul className="space-y-4">
                {['Tolerances up to ±0.002mm', 'Multi-axis CNC Milling & Turning', 'Advanced CMM Inspection', 'Wide variety of material processing'].map((item, i) => (
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
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" 
                alt="Precision Machined Component" 
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
            <p className="text-concentra-purple font-semibold tracking-widest uppercase mb-2 text-sm">Our Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-slate">Materials & Specifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-industrial-slate mb-4">Material Versatility</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Expertise in machining Cast Iron, Aluminum, Stainless Steel, Brass, Copper, and exotic alloys for specialized requirements.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#e6f4ea] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-concentra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-industrial-slate mb-4">Rigorous QA</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                100% inspection processes utilizing Zeiss CMMs, Mitutoyo gauges, and strict adherence to ISO 9001:2015 standards.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#F8EBFF] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-concentra-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-industrial-slate mb-4">Scalable Production</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                From low-volume specialty prototypes to high-volume continuous production runs, our shop floor adapts to your timeline.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}