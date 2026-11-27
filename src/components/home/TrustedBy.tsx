"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface PartnerLogo {
  id: number | string;
  section: string;
  content_key: string;
  content_type?: string;
  content_value: string;
}

export default function TrustedBy() {
  const [logos, setLogos] = useState<PartnerLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrustedLogos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/home`);
        if (!response.ok) throw new Error("Failed to fetch CMS data");

        const data: PartnerLogo[] = await response.json();
        const trustedSectionData = data.filter(
          (item: PartnerLogo) => item.section === "trusted_by"
        );
        setLogos(trustedSectionData);
      } catch (error) {
        console.error("Error fetching Trusted By logos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrustedLogos();
  }, []);

  const getLogoUrl = (val: string): string =>
    val.startsWith("http") ? val : `${process.env.NEXT_PUBLIC_API_URL}/${val}`;

  // Desktop loop threshold
  const isEnoughToLoopDesktop = logos.length >= 4;

  // Split ALL logos across 2 or 3 moving rows on mobile so zero companies are hidden.
  // Uses 3 rows when you have 7+ logos, 2 rows for 3–6 logos, and 1 row for 1–2 logos.
  const mobileRowCount = logos.length >= 7 ? 3 : logos.length >= 3 ? 2 : 1;

  const mobileRows: PartnerLogo[][] = Array.from({ length: mobileRowCount }, (_, rowIndex) => {
    const rowItems = logos.filter((_, itemIndex) => itemIndex % mobileRowCount === rowIndex);

    // Swiper needs at least ~4 slides in a row to loop smoothly at slidesPerView={2.15}.
    // If a split row only has 2 or 3 items, duplicate them with unique keys so the marquee never stalls.
    if (rowItems.length > 0 && rowItems.length < 4) {
      return [
        ...rowItems,
        ...rowItems.map((item) => ({ ...item, id: `${item.id}-dup1` })),
        ...(rowItems.length === 1
          ? [
              { ...rowItems[0], id: `${rowItems[0].id}-dup2` },
              { ...rowItems[0], id: `${rowItems[0].id}-dup3` },
            ]
          : []),
      ];
    }

    return rowItems;
  });

  return (
    <section className="w-full py-10 md:py-12 bg-transparent relative z-30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Crisp White Floating Card against Muted Band */}
        <div className="bg-white rounded-2xl shadow-[0_6px_24px_rgba(33,22,39,0.05)] py-8 px-5 md:py-9 md:px-12 border border-border-subtle">
          <h2 className="text-center text-ink-muted font-extrabold tracking-[2px] text-[11px] md:text-xs uppercase mb-6 md:mb-8">
            Trusted By Industry Leaders In Precision Machining
          </h2>

          <style>
            {`
              .trusted-swiper .swiper-wrapper {
                transition-timing-function: linear !important;
              }
            `}
          </style>

          {isLoading ? (
            <div className="w-full h-20 flex items-center justify-center text-ink-muted text-sm">
              Loading partners...
            </div>
          ) : logos.length > 0 ? (
            <>
              {/* MOBILE VIEW: 2 to 3 Moving Marquee Rows (Shows ALL companies) */}
              <div className="flex flex-col gap-3 md:hidden w-full overflow-hidden">
                {mobileRows.map((rowLogos, rowIndex) => (
                  <Swiper
                    key={`mobile-row-${rowIndex}`}
                    modules={[Autoplay]}
                    spaceBetween={12}
                    slidesPerView={2.15}
                    loop={rowLogos.length >= 4}
                    speed={3600 + rowIndex * 400}
                    autoplay={{
                      delay: 0,
                      disableOnInteraction: false,
                      reverseDirection: rowIndex % 2 === 1, // Alternates scroll direction per row
                    }}
                    allowTouchMove={true}
                    className="trusted-swiper w-full"
                  >
                    {rowLogos.map((logo: PartnerLogo) => (
                      <SwiperSlide key={logo.id}>
                        <div className="h-16 px-3 rounded-xl bg-surface-muted/70 border border-border-subtle/80 flex items-center justify-center">
                          {logo.content_type === "image" && logo.content_value ? (
                            <img
                              src={getLogoUrl(logo.content_value)}
                              alt={logo.content_key}
                              className="max-h-10 max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-industrial-slate font-bold text-xs text-center line-clamp-2">
                              {logo.content_value || logo.content_key}
                            </span>
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ))}
              </div>

              {/* TABLET & DESKTOP VIEW: Single Continuous Linear Marquee */}
              <div className="hidden md:block w-full overflow-hidden">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={36}
                  slidesPerView={3}
                  breakpoints={{
                    1024: { slidesPerView: 4 },
                  }}
                  loop={isEnoughToLoopDesktop}
                  speed={4000}
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                  }}
                  allowTouchMove={true}
                  className="trusted-swiper"
                >
                  {logos.map((logo: PartnerLogo) => (
                    <SwiperSlide key={logo.id}>
                      {logo.content_type === "image" && logo.content_value ? (
                        <div className="w-full h-20 flex items-center justify-center cursor-grab active:cursor-grabbing px-2">
                          <img
                            src={getLogoUrl(logo.content_value)}
                            alt={logo.content_key}
                            className="max-h-14 max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-20 bg-surface-muted rounded-xl border border-border-subtle flex items-center justify-center text-industrial-slate font-bold text-sm cursor-grab active:cursor-grabbing px-3 text-center">
                          {logo.content_value || logo.content_key}
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}