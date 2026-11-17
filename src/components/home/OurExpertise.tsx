"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; 

export default function OurExpertise() {
  const [cmsData, setCmsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Automatically fetch from the backend on load
  useEffect(() => {
    async function fetchExpertiseData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/home`);
        if (!response.ok) throw new Error("Failed to fetch CMS data");
        
        const data = await response.json();
        
        // Filter ONLY the items designated for the 'our_expertise' section
        const expertiseData = data.filter((item: any) => item.section === "our_expertise");
        
        setCmsData(expertiseData);
      } catch (error) {
        console.error("Error fetching Expertise data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchExpertiseData();
  }, []);

  // Helper function to extract text safely from the CMS array
  const getValue = (key: string, fallback: string) => {
    const block = cmsData.find(c => c.content_key === key);
    return block?.content_value || fallback;
  };

  // 1. Get Top Headings
  const heading = getValue("expertise_heading", "Our Expertise");
  const subHeading = getValue("expertise_subheading", "Precision Manufacturing & Re-manufacturing");

  // 2. DYNAMIC CARD PARSER
  const parsedCards = cmsData.reduce((acc: any[], item: any) => {
    const match = item.content_key.match(/^card_(\d+)_(.+)$/);
    if (match) {
      const cardId = parseInt(match[1], 10);
      const propName = match[2];

      let card = acc.find(c => c.id === cardId);
      
      if (!card) {
        card = { id: cardId, title: "", description: "", image: "", link: "#" };
        acc.push(card);
      }
      
      if (propName === "desc") {
        card.description = item.content_value;
      } else {
        card[propName] = item.content_value;
      }
    }
    return acc;
  }, []);

  const displayCards = parsedCards.sort((a, b) => a.id - b.id);

  return (
    <section className="w-full py-12 md:py-16 relative z-30">
      
      {/* MASTER CONTAINER: Center-Locked Max Width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-concentra-purple font-bold tracking-widest text-xs md:text-sm uppercase mb-2 drop-shadow-sm">
            {heading}
          </h2>
          <p className="text-industrial-slate font-bold text-lg md:text-xl">
            {subHeading}
          </p>
        </div>

        {/* CARDS CONTAINER */}
        {isLoading ? (
           <div className="w-full py-20 flex justify-center text-slate-400">Loading expertise...</div>
        ) : displayCards.length > 0 ? (
          
          // FIX: Replaced grid with flex, flex-wrap, and justify-center. 
          // This perfectly centers "orphan" cards if there are less than 3!
          <div className="flex flex-wrap justify-center items-stretch gap-6 lg:gap-8">
            
            {/* Map through our dynamically parsed cards */}
            {displayCards.map((item) => (
              <Link 
                href={item.link || "#"}
                key={item.id} 
                // WIDTH CALCULATION: 
                // Mobile: 100% width
                // Tablet: ~50% width minus gap
                // Desktop: ~33.3% width minus gap
                className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[420px] bg-white rounded-[15px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col p-6 transition-transform duration-300 hover:-translate-y-2 cursor-pointer h-[340px] md:h-[380px]"
              >
                <h3 className="text-industrial-slate font-bold text-center text-base md:text-lg mb-3">
                  {item.title}
                </h3>
                
                {/* 2-3 Line Description Area */}
                <p className="text-sm text-gray-600 text-center mb-4 line-clamp-3 leading-relaxed min-h-[60px]">
                  {item.description}
                </p>
                
                {/* Dynamic Image Area */}
                <div className="flex-grow w-full rounded-lg overflow-hidden flex items-center justify-center bg-gray-50/50 border border-gray-100 relative">
                  {item.image ? (
                    <img 
                      src={item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_API_URL}/${item.image}`} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs text-center px-4">
                      [ Image Missing ]
                    </span>
                  )}
                </div>

              </Link>
            ))}

          </div>
        ) : (
          <div className="w-full py-10 flex justify-center text-slate-400 border border-dashed rounded-xl">
            No expertise cards configured in CMS.
          </div>
        )}
      </div>
    </section>
  );
}