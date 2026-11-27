"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, MoreHorizontal } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathNames = pathname.split("/").filter((path) => path);
  const isVisible = pathNames.length > 0;

  // All intermediate segments between Home and the final (current) segment
  const middleSegments = pathNames.slice(0, -1);
  const lastSegment = pathNames[pathNames.length - 1];

  // Tracks which intermediate segment is currently expanded.
  // Defaults to the immediate parent of the current page (middleSegments.length - 1).
  const [focusedMiddleIndex, setFocusedMiddleIndex] = useState<number>(0);

  // Reset to show the immediate parent whenever the URL changes
  useEffect(() => {
    setFocusedMiddleIndex(Math.max(0, pathNames.length - 2));
  }, [pathname, pathNames.length]);

  const formatTitle = (slug: string) => slug.replace(/-/g, " ");

  // Ensure index stays safely bounded during route transitions
  const safeIndex = Math.min(
    Math.max(0, focusedMiddleIndex),
    Math.max(0, middleSegments.length - 1)
  );

  const hasCollapsedLeft = middleSegments.length > 1 && safeIndex > 0;
  const hasCollapsedRight =
    middleSegments.length > 1 && safeIndex < middleSegments.length - 1;

  const activeMiddleSlug = middleSegments[safeIndex];
  const activeMiddleHref = `/${pathNames.slice(0, safeIndex + 1).join("/")}`;

  // Build helpful hover tooltips showing what lies inside each "..."
  const leftHiddenLabel = middleSegments
    .slice(0, safeIndex)
    .map(formatTitle)
    .join(" / ");
  const rightHiddenLabel = middleSegments
    .slice(safeIndex + 1)
    .map(formatTitle)
    .join(" / ");

  return (
    <div className="sticky top-[68px] lg:top-[80px] z-40 w-full h-0 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="breadcrumb"
          className={`
            inline-flex items-center bg-white/95 backdrop-blur-sm px-3.5 py-2 sm:px-4 sm:py-2
            border border-t-0 border-x border-b border-[#2a1731]/20 shadow-[0_8px_24px_rgba(33,22,39,0.08)]
            transition-all duration-300 ease-out transform origin-top
            max-w-full overflow-x-auto no-scrollbar
            ${
              isVisible
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-full opacity-0 pointer-events-none"
            }
          `}
        >
          <ol className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] font-bold tracking-[0.4px] uppercase text-ink-muted whitespace-nowrap">
            {/* 1. ALWAYS EXPANDED: Home */}
            <li>
              <Link
                href="/"
                className="hover:text-concentra-purple transition-colors"
              >
                Home
              </Link>
            </li>

            {/* 2. LEFT COLLAPSED BUTTON ("...") — Expands earlier parent segments */}
            {hasCollapsedLeft && (
              <>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5 text-ink-muted/60" />
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setFocusedMiddleIndex(safeIndex - 1)}
                    title={`Show ${leftHiddenLabel}`}
                    aria-label={`Expand ${leftHiddenLabel}`}
                    className="flex items-center justify-center px-1.5 py-0.5 bg-surface-muted hover:bg-concentra-purple hover:text-white border border-border-subtle text-industrial-slate transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </li>
              </>
            )}

            {/* 3. ACTIVE MIDDLE SEGMENT (1 visible intermediate link at a time) */}
            {middleSegments.length > 0 && activeMiddleSlug && (
              <>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5 text-ink-muted/60" />
                </li>
                <li>
                  <Link
                    href={activeMiddleHref}
                    className="hover:text-concentra-purple transition-colors"
                  >
                    {formatTitle(activeMiddleSlug)}
                  </Link>
                </li>
              </>
            )}

            {/* 4. RIGHT COLLAPSED BUTTON ("...") — Compresses current & expands deeper parent */}
            {hasCollapsedRight && (
              <>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5 text-ink-muted/60" />
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setFocusedMiddleIndex(safeIndex + 1)}
                    title={`Show ${rightHiddenLabel}`}
                    aria-label={`Expand ${rightHiddenLabel}`}
                    className="flex items-center justify-center px-1.5 py-0.5 bg-surface-muted hover:bg-concentra-purple hover:text-white border border-border-subtle text-industrial-slate transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </li>
              </>
            )}

            {/* 5. ALWAYS EXPANDED: Last / Current Location */}
            {lastSegment && (
              <>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5 text-ink-muted/60" />
                </li>
                <li>
                  <span className="text-concentra-purple font-extrabold cursor-default">
                    {formatTitle(lastSegment)}
                  </span>
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>
    </div>
  );
}