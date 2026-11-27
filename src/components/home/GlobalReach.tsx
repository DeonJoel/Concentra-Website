"use client";

import { useEffect, useState } from "react";
import { Globe2 } from "lucide-react";

interface CmsContentBlock {
  id?: number | string;
  section: string;
  content_key: string;
  content_type?: string;
  content_value: string;
}

interface CountryItem {
  name: string;
  code: string; // 2-letter ISO code (e.g. "in", "de", "cz", "th")
  flag: string; // Native emoji fallback
  role?: string;
}

// Lookup map so even if CMS only sends a country name (e.g. "Czech Republic"),
// we automatically resolve its ISO flag code and emoji!
const COUNTRY_ISO_MAP: Record<string, { code: string; flag: string }> = {
  india: { code: "in", flag: "🇮🇳" },
  germany: { code: "de", flag: "🇩🇪" },
  "united states": { code: "us", flag: "🇺🇸" },
  usa: { code: "us", flag: "🇺🇸" },
  japan: { code: "jp", flag: "🇯🇵" },
  "united kingdom": { code: "gb", flag: "🇬🇧" },
  uk: { code: "gb", flag: "🇬🇧" },
  italy: { code: "it", flag: "🇮🇹" },
  france: { code: "fr", flag: "🇫🇷" },
  "south korea": { code: "kr", flag: "🇰🇷" },
  "czech republic": { code: "cz", flag: "🇨🇿" },
  czechia: { code: "cz", flag: "🇨🇿" },
  thailand: { code: "th", flag: "🇹🇭" },
  switzerland: { code: "ch", flag: "🇨🇭" },
  austria: { code: "at", flag: "🇦🇹" },
  netherlands: { code: "nl", flag: "🇳🇱" },
  sweden: { code: "se", flag: "🇸🇪" },
  canada: { code: "ca", flag: "🇨🇦" },
  singapore: { code: "sg", flag: "🇸🇬" },
  taiwan: { code: "tw", flag: "🇹🇼" },
  uae: { code: "ae", flag: "🇦🇪" },
  "united arab emirates": { code: "ae", flag: "🇦🇪" },
};

// Converts a 2-letter ISO code like "CZ" into its native Unicode flag emoji "🇨🇿"
function isoToFlagEmoji(isoCode: string): string {
  if (!isoCode || isoCode.length !== 2) return "🌐";
  return isoCode
    .toUpperCase()
    .replace(/./g, (char: string) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

const DEFAULT_COUNTRIES: CountryItem[] = [
  { name: "India", code: "in", flag: "🇮🇳", role: "Bengaluru HQ" },
  { name: "Germany", code: "de", flag: "🇩🇪" },
  { name: "United States", code: "us", flag: "🇺🇸" },
  { name: "Japan", code: "jp", flag: "🇯🇵" },
  { name: "United Kingdom", code: "gb", flag: "🇬🇧" },
  { name: "Italy", code: "it", flag: "🇮🇹" },
  { name: "France", code: "fr", flag: "🇫🇷" },
  { name: "Czech Republic", code: "cz", flag: "🇨🇿" },
  { name: "South Korea", code: "kr", flag: "🇰🇷" },
  { name: "Thailand", code: "th", flag: "🇹🇭" },
];

function FlagBadge({ country }: { country: CountryItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  // Renders crisp full-color flag on Windows, macOS, iOS, and Android alike;
  // gracefully falls back to the native flag emoji if offline or unknown code.
  if (country.code && !imgFailed) {
    return (
      <img
        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png 2x`}
        alt={`${country.name} flag`}
        onError={() => setImgFailed(true)}
        className="w-5 h-[14px] object-cover rounded-[2px] shadow-xs shrink-0 select-none"
      />
    );
  }

  return (
    <span className="text-base leading-none shrink-0" role="img" aria-label={country.name}>
      {country.flag || "🌐"}
    </span>
  );
}

export default function GlobalReach() {
  const [cmsData, setCmsData] = useState<CmsContentBlock[]>([]);

  useEffect(() => {
    async function fetchReachData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/home`);
        if (!response.ok) throw new Error("Failed to fetch CMS data");

        const data: CmsContentBlock[] = await response.json();
        const reachData = data.filter(
          (item: CmsContentBlock) => item.section === "global_reach"
        );
        setCmsData(reachData);
      } catch (error) {
        console.error("Error fetching Global Reach data:", error);
      }
    }

    fetchReachData();
  }, []);

  const getValue = (key: string, fallback: string): string => {
    const block = cmsData.find((c: CmsContentBlock) => c.content_key === key);
    return block?.content_value || fallback;
  };

  const heading = getValue("reach_heading", "GLOBAL FOOTPRINT");
  const subHeading = getValue(
    "reach_subheading",
    "Delivering Precision to Assembly Lines Worldwide."
  );
  const mapImage = getValue("map_image", "");

  // --- DYNAMIC COUNTRY PARSER (Supports 2 CMS formats + Default Fallback) ---
  const parseCountriesFromCms = (): CountryItem[] => {
    // Format A: Numbered CMS keys -> country_1_name, country_1_code, country_1_role
    const grouped: Record<number, { id: number; name: string; code: string; flag: string; role?: string }> = {};

    cmsData.forEach((item: CmsContentBlock) => {
      const match = item.content_key.match(/^country_(\d+)_(.+)$/);
      if (match) {
        const id = parseInt(match[1], 10);
        const prop = match[2];

        if (!grouped[id]) {
          grouped[id] = { id, name: "", code: "", flag: "" };
        }

        if (prop === "name") grouped[id].name = item.content_value.trim();
        if (prop === "code") grouped[id].code = item.content_value.trim().toLowerCase();
        if (prop === "flag") grouped[id].flag = item.content_value.trim();
        if (prop === "role") grouped[id].role = item.content_value.trim();
      }
    });

    const numberedCountries = Object.values(grouped)
      .filter((c) => Boolean(c.name))
      .sort((a, b) => a.id - b.id)
      .map((c): CountryItem => {
        const mapped = COUNTRY_ISO_MAP[c.name.toLowerCase()];
        const finalCode = c.code || mapped?.code || "";
        const finalFlag = c.flag || mapped?.flag || isoToFlagEmoji(finalCode);
        return {
          name: c.name,
          code: finalCode,
          flag: finalFlag,
          role: c.role,
        };
      });

    if (numberedCountries.length > 0) {
      return numberedCountries;
    }

    // Format B: Single comma-separated CMS key 'reach_countries'
    // Accepts: "India | IN | Bengaluru HQ, Czech Republic | CZ, Thailand" or "🇨🇿 Czech Republic, 🇹🇭 Thailand"
    const rawCountries = getValue("reach_countries", "");
    if (rawCountries.trim()) {
      return rawCountries
        .split(",")
        .map((entry: string) => entry.trim())
        .filter((entry: string) => Boolean(entry))
        .map((entry: string): CountryItem => {
          const pipeParts = entry.split("|").map((part: string) => part.trim());

          // Pipe format: Name | ISO | Optional Role
          if (pipeParts.length >= 2) {
            const rawName = pipeParts[0];
            const rawCode = pipeParts[1].toLowerCase();
            const rawRole = pipeParts[2] || undefined;
            const mapped = COUNTRY_ISO_MAP[rawName.toLowerCase()];
            const finalCode = rawCode || mapped?.code || "";
            return {
              name: rawName,
              code: finalCode,
              flag: mapped?.flag || isoToFlagEmoji(finalCode),
              role: rawRole,
            };
          }

          // Plain name or "Emoji Name" format
          const words = entry.split(" ");
          const startsWithEmoji = words.length > 1 && !/^[A-Za-z]+$/.test(words[0]);
          const cleanName = startsWithEmoji ? words.slice(1).join(" ").trim() : entry;
          const mapped = COUNTRY_ISO_MAP[cleanName.toLowerCase()];

          return {
            name: cleanName,
            code: mapped?.code || "",
            flag: startsWithEmoji ? words[0] : mapped?.flag || "🌐",
          };
        });
    }

    // Fallback when no CMS country keys are set yet
    return DEFAULT_COUNTRIES;
  };

  const countries = parseCountriesFromCms();

  const resolvedMapUrl = mapImage
    ? mapImage.startsWith("http")
      ? mapImage
      : `${process.env.NEXT_PUBLIC_API_URL}/${mapImage}`
    : "";

  return (
    <section className="w-full pt-16 md:pt-20 pb-8 bg-transparent relative z-30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified Map & Typography Canvas */}
        <div className="relative bg-[#1b1422] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          {/* Subtle technical coordinate grid in the background */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Ambient glow behind the map */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-concentra-purple/20 rounded-full blur-3xl pointer-events-none" />

          {/* 1. TOP HEADER OVERLAY */}
          <div className="relative z-20 px-6 pt-8 md:px-12 md:pt-12 lg:pb-0 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pointer-events-none">
            <div>
              <div className="flex items-center gap-3 text-concentra-lime text-[11px] font-extrabold tracking-[2px] uppercase mb-3">
                <span className="w-[27px] h-[2px] bg-concentra-lime inline-block"></span>
                {heading}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white max-w-xl tracking-tight">
                {subHeading}
              </h2>
            </div>

            {/* Hub Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-concentra-lime animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-white/85">
                Exporting from Bengaluru, India
              </span>
            </div>
          </div>

          {/* 2. LARGE INTEGRATED MAP CANVAS */}
          <div className="relative z-10 w-full px-2 sm:px-6 md:px-10 py-6 lg:-mt-6 lg:-mb-8 flex items-center justify-center min-h-[260px] sm:min-h-[380px] lg:min-h-[500px]">
            {resolvedMapUrl ? (
              <img
                src={resolvedMapUrl}
                alt="Concentra Global Export Network"
                className="w-full max-w-[1060px] h-auto max-h-[540px] object-contain select-none opacity-95 drop-shadow-[0_12px_40px_rgba(120,197,101,0.12)]"
              />
            ) : (
              <div className="w-full max-w-3xl aspect-[16/8] border border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center bg-white/[0.02] p-6 my-6">
                <Globe2 className="w-10 h-10 text-concentra-lime/70 mb-2" />
                <span className="text-white/70 font-bold text-sm text-center">
                  Global Export Map Canvas
                </span>
                <span className="text-xs text-white/40 mt-1 text-center">
                  Upload &apos;map_image&apos; in the CMS to display the full-bleed world map here.
                </span>
              </div>
            )}

            {/* OCEAN CALLOUT 1: South Pacific / Lower-Left Ocean Space (Desktop) */}
            <div className="hidden lg:flex flex-col absolute left-12 bottom-16 bg-[#1b1422]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 max-w-[230px]">
              <span className="text-[10px] font-extrabold tracking-[1.5px] text-concentra-lime uppercase mb-0.5">
                OEM Supply Ready
              </span>
              <p className="text-[12px] text-white/75 leading-snug">
                Export-grade packaging, CMM inspection reports &amp; global freight coordination.
              </p>
            </div>

            {/* OCEAN CALLOUT 2: Indian/Southern Ocean Space (Desktop) */}
            <div className="hidden lg:flex items-center gap-3 absolute right-12 bottom-16 bg-[#1b1422]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
              <strong className="text-2xl font-extrabold text-white leading-none">100%</strong>
              <span className="text-[11px] text-white/70 leading-tight">
                Pre-dispatch
                <br />
                dimensional verification
              </span>
            </div>
          </div>

          {/* 3. BOTTOM INTEGRATED COUNTRY + FLAG DOCK */}
          <div className="relative z-20 px-6 pb-8 pt-5 md:px-12 md:pb-10 bg-gradient-to-t from-[#140e1a] via-[#1b1422]/95 to-transparent border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-extrabold tracking-[1.8px] uppercase text-white/60">
                Active Export &amp; Partner Destinations
              </span>
              <span className="text-[11px] text-concentra-lime font-semibold">
                Ready for worldwide OEM &amp; Tier-1 supply
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {countries.map((country: CountryItem) => (
                <div
                  key={country.name}
                  className="inline-flex items-center gap-2.5 bg-white/[0.07] hover:bg-white/[0.13] border border-white/10 hover:border-concentra-lime/50 rounded-lg px-3.5 py-2 transition-colors"
                >
                  <FlagBadge country={country} />
                  <span className="text-[13px] font-bold text-white tracking-tight">
                    {country.name}
                  </span>
                  {country.role ? (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-concentra-lime/20 text-concentra-lime">
                      {country.role}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}