"use client";

export default function CtaBanner() {
  return (
    <section className="w-full py-16 relative z-30 mb-10">
      
      {/* 12-Column Grid Alignment */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* Green Background Card: Spans Column 2 to 11 */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-concentra-green rounded-[20px] shadow-xl p-8 py-12 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Header Section (Left on Desktop, Top on Mobile) */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-sm">
              Ready to upgrade your production capabilities?
            </h2>
          </div>

          {/* Button Section (Right on Desktop, Bottom & Stacked on Mobile) */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-end shrink-0">
            
            {/* 
              Mobile First UI: 
              'py-4 text-lg w-full' creates a large, thumb-friendly touch target on phones.
              'md:py-3 md:text-base md:w-auto' scales it back down for mouse clicks on desktop.
            */}
            <button className="bg-white text-concentra-green hover:bg-gray-100 font-bold py-4 px-8 md:py-3 md:px-8 rounded-xl transition duration-300 w-full sm:w-auto shadow-md text-lg md:text-base">
              Request a Quote
            </button>
            
            <button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-4 px-8 md:py-3 md:px-8 rounded-xl transition duration-300 w-full sm:w-auto text-lg md:text-base">
              Contact Us
            </button>
            
          </div>

        </div>
      </div>
    </section>
  );
}