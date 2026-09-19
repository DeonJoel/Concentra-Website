"use client";

import { useEffect, useState } from "react";

export default function GlobalReach() {
  const [cmsData, setCmsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Automatically fetch from the backend on load
  useEffect(() => {
    async function fetchReachData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/home`);
        if (!response.ok) throw new Error("Failed to fetch CMS data");
        
        const data = await response.json();
        const reachData = data.filter((item: any) => item.section === "global_reach");
        setCmsData(reachData);
      } catch (error) {
        console.error("Error fetching Global Reach data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReachData();
  }, []);

  // Helper function to extract text/images safely
  const getValue = (key: string, fallback: string) => {
    const block = cmsData.find(c => c.content_key === key);
    return block?.content_value || fallback;
  };

  const heading = getValue("reach_heading", "Global Reach");
  const subHeading = getValue("reach_subheading", "Delivering Precision to Assembly Lines Worldwide");
  const description = getValue(
    "reach_description", 
    "We proudly export our precision-engineered components to industry leaders worldwide.\n\nBacked by a robust global logistics network, we are fully equipped and eager to serve as a reliable supplier for assembly lines in any part of the world."
  );
  
  // The mapImage will grab the URL from the database
  const mapImage = getValue("map_image", "");

  return (
    <section className="w-full py-12 md:py-16 relative z-30">
      
      {/* MASTER CONTAINER: Center-Locked Max Width replacing the 12-col grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Background Card */}
        <div className="bg-industrial-slate rounded-[15px] shadow-2xl overflow-hidden p-8 md:p-12 lg:p-16">
          
          {/* Header Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-concentra-green font-bold tracking-widest text-xs md:text-sm uppercase mb-3">
              {heading}
            </h2>
            {/* Constrained max-width so the title wraps nicely and remains readable */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white max-w-3xl">
              {subHeading}
            </h3>
          </div>

          {/* Content Grid: Handles Mobile Stacking vs Desktop Side-by-Side */}
          {/* Added items-center so the text box and map align perfectly in the middle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
            
            {/* TEXT AREA: Left on Desktop, Bottom on Mobile */}
            <div className="lg:col-span-5 bg-stone-100 rounded-2xl p-8 md:p-10 flex flex-col justify-center order-2 lg:order-1 shadow-lg">
              {/* whitespace-pre-wrap ensures that line breaks from your CMS text area are respected */}
              <p className="text-industrial-slate font-medium text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>

            {/* MAP AREA: Right on Desktop, Top on Mobile */}
            <div className="lg:col-span-7 flex items-center justify-center order-1 lg:order-2 w-full">
              
              {/* DYNAMIC RENDER: Show Map Image if uploaded, otherwise show placeholder */}
              {mapImage ? (
                <img 
                  src={mapImage.startsWith('http') ? mapImage : `${process.env.NEXT_PUBLIC_API_URL}/${mapImage}`} 
                  alt="Global Reach Map" 
                  className="w-full h-auto max-h-[450px] object-contain drop-shadow-md"
                />
              ) : (
                <div className="w-full aspect-video border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center bg-white/5 p-6">
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