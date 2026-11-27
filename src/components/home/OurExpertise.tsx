"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OurExpertise() {
  const [cmsData, setCmsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchExpertiseData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/home`);
        if (!response.ok) throw new Error("Failed to fetch CMS data");

        const data = await response.json();
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

  const getValue = (key: string, fallback: string) => {
    const block = cmsData.find((c) => c.content_key === key);
    return block?.content_value || fallback;
  };

  const heading = getValue("expertise_heading", "Our Expertise");
  const subHeading = getValue(
    "expertise_subheading",
    "Precision Manufacturing & Re-manufacturing"
  );

  const parsedCards = cmsData.reduce((acc: any[], item: any) => {
    const match = item.content_key.match(/^card_(\d+)_(.+)$/);
    if (match) {
      const cardId = parseInt(match[1], 10);
      const propName = match[2];

      let card = acc.find((c) => c.id === cardId);

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
    <section className="w-full py-16 md:py-20 bg-transparent relative z-30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2.5 text-concentra-purple font-extrabold tracking-[2px] text-[11px] uppercase mb-2.5">
            <span className="w-5 h-[2px] bg-concentra-green inline-block"></span>
            {heading}
            <span className="w-5 h-[2px] bg-concentra-green inline-block"></span>
          </div>
          <p className="text-industrial-slate font-extrabold text-2xl md:text-3xl tracking-tight">
            {subHeading}
          </p>
        </div>

        {/* CARDS CONTAINER */}
        {isLoading ? (
          <div className="w-full py-20 flex justify-center text-ink-muted">
            Loading expertise...
          </div>
        ) : displayCards.length > 0 ? (
          <div className="flex flex-wrap justify-center items-stretch gap-6 lg:gap-8">
            {displayCards.map((item) => (
              <Link
                href={item.link || "#"}
                key={item.id}
                className="group w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[420px] bg-white rounded-2xl shadow-[0_8px_28px_rgba(33,22,39,0.06)] hover:shadow-[0_14px_34px_rgba(33,22,39,0.11)] border border-border-subtle flex flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer h-[350px] md:h-[390px]"
              >
                <h3 className="text-industrial-slate font-extrabold text-center text-base md:text-lg mb-2.5 group-hover:text-concentra-purple transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-ink-muted text-center mb-4 line-clamp-3 leading-relaxed min-h-[60px]">
                  {item.description}
                </p>

                <div className="flex-grow w-full rounded-xl overflow-hidden flex items-center justify-center bg-surface-muted border border-border-subtle relative">
                  {item.image ? (
                    <img
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `${process.env.NEXT_PUBLIC_API_URL}/${item.image}`
                      }
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-ink-muted text-xs text-center px-4">
                      [ Image Missing ]
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full py-10 flex justify-center text-ink-muted bg-white border border-dashed border-border-subtle rounded-2xl">
            No expertise cards configured in CMS.
          </div>
        )}
      </div>
    </section>
  );
}