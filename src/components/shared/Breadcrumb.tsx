"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, MoreHorizontal } from "lucide-react";

export default function Breadcrumb() {
  const paths = usePathname();
  
  // Split the URL and remove empty strings
  const pathNames = paths.split("/").filter((path) => path);

  // We determine visibility based on whether we are on the homepage or not
  const isVisible = pathNames.length > 0;

  return (
    /* Adjust to top-[72px] for mobile and lg:top-[80px] for desktop. Can be changed based on navbar height */
    <div className="sticky top-[72px] lg:top-[80px] z-40 w-full h-0 pointer-events-none">
      
      {/* Container aligned with your left grid line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 
          MOBILE PADDING & OVERFLOW:
          - max-w-full & overflow-x-auto: Prevents it from breaking the screen on tiny phones.
          - px-3 py-2 sm:px-5 sm:py-2.5: Smaller padding on mobile, standard on desktop.
          - no-scrollbar: Hides the ugly scrollbar while keeping swipe functionality.
        */}
        <nav 
          aria-label="breadcrumb" 
          className={`
            inline-flex items-center bg-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-b-[10px] 
            shadow-sm border border-t-0 border-slate-200 
            transition-all duration-500 ease-in-out transform origin-top
            max-w-full overflow-x-auto scrollbar-hide

            // Pushes the breadcrumb right on mobile to dodge the pill curve, resets on desktop
            ml-4 lg:ml-0
            
            ${isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"}
          `}
        >
          {/* 
            MOBILE TEXT SIZING:
            - text-xs sm:text-sm: Smaller text on phones.
            - whitespace-nowrap: Forces the breadcrumb to stay on a single line.
          */}
          <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-500 font-medium whitespace-nowrap">
            
            {/* 1. Home Link */}
            <li>
              <Link href="/" className="hover:text-concentra-green transition-colors">
                Home
              </Link>
            </li>

            {/* 2. The Collapsed State (The "...") */}
            {pathNames.length > 2 && (
              <>
                <li className="text-slate-400">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </li>
                <li>
                  <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-md hover:bg-slate-100 cursor-default text-slate-400">
                    <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                </li>
              </>
            )}

            {/* 3. The Dynamic Path Links */}
            {pathNames.map((link, index) => {
              if (pathNames.length > 2 && index < pathNames.length - 2) {
                return null;
              }

              const href = `/${pathNames.slice(0, index + 1).join("/")}`;
              const itemTitle = link[0].toUpperCase() + link.slice(1).replace(/-/g, " ");
              const isLast = index === pathNames.length - 1;

              return (
                <React.Fragment key={index}>
                  <li className="text-slate-400">
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </li>
                  <li>
                    {!isLast ? (
                      <Link href={href} className="hover:text-concentra-green transition-colors">
                        {itemTitle}
                      </Link>
                    ) : (
                      <span className="text-slate-900 font-semibold cursor-default">
                        {itemTitle}
                      </span>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}