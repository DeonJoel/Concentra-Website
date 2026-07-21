"use client";

// 1. Define the props interface
interface GlobalReachProps {
  heading?: string;
  subHeading?: string;
  description?: string;
  mapImage?: string;
}

// 2. Pass the props into the component with safety fallbacks
export default function GlobalReach({
  heading = "Global Reach",
  subHeading = "Delivering Precision to Assembly Lines Worldwide",
  description = "We proudly export our precision-engineered components to industry leaders worldwide.\n\nBacked by a robust global logistics network, we are fully equipped and eager to serve as a reliable supplier for assembly lines in any part of the world.",
  mapImage
}: GlobalReachProps) {
  return (
    <section className="w-full py-16 relative z-30">
      
      {/* 12-Column Grid Alignment */}
      <div className="w-full grid grid-cols-12 gap-[32px] px-6 lg:px-[80px]">
        
        {/* Dark Background Card: Spans Column 2 to 11 */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-industrial-slate rounded-[15px] shadow-2xl overflow-hidden p-6 md:p-12">
          
          {/* Header Section */}
          <div className="mb-10">
            <h2 className="text-concentra-green font-bold tracking-widest text-sm md:text-base uppercase mb-2">
              {heading}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight text-white">
              {subHeading}
            </h3>
          </div>

          {/* Content Grid: Handles Mobile Stacking vs Desktop Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            
            {/* TEXT AREA: Left on Desktop, Bottom on Mobile */}
            <div className="lg:col-span-5 bg-stone-200 rounded-xl p-8 md:p-10 flex flex-col justify-center order-2 lg:order-1 min-h-[300px] shadow-inner">
              {/* whitespace-pre-wrap ensures that line breaks from your CMS text area are respected */}
              <p className="text-industrial-slate font-medium text-lg leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>

            {/* MAP AREA: Right on Desktop, Top on Mobile */}
            <div className="lg:col-span-7 flex items-center justify-center order-1 lg:order-2 min-h-[300px] relative w-full">
              
              {/* DYNAMIC RENDER: Show Map Image if uploaded, otherwise show placeholder */}
              {mapImage ? (
                <img 
                  src={mapImage.startsWith('http') ? mapImage : `http://localhost:8000/${mapImage}`} 
                  alt="Global Reach Map" 
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center bg-white/5 p-6">
                  <span className="text-gray-400 font-medium text-center">
                    [ Map SVG Placeholder ]
                  </span>
                  <span className="text-xs text-gray-500 mt-2 text-center">
                    Upload an image for 'map_image' in the CMS to replace this box.
                  </span>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}