"use client";

import { useState, useEffect } from "react";

export default function GridOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  // Press 'Shift + G' to toggle the grid on and off
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'g') {
        setIsVisible(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none w-full">
      {/* Figma Translation:
        - Stretch: w-full
        - Margin 80: px-[80px]
        - Gutter 32: gap-[32px]
      */}
      <div className="w-full h-full grid grid-cols-12 gap-[32px] px-[80px]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            /* Figma Translation: 5% Red Opacity */
            className="h-full w-full bg-red-500/10 border-x border-red-500/20" 
          />
        ))}
      </div>
    </div>
  );
}