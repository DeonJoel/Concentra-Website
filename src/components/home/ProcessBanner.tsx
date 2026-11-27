"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileText, Compass, Cog, ShieldCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProcessStep {
  num: string;
  title: string;
  shortTag: string;
  description: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Understand",
    shortTag: "Drawing & Spec Review",
    description:
      "Share drawings, specifications, volumes and critical tolerances.",
    detail:
      "We map GD&T callouts, material grades, batch sizes, and spindle or assembly interfaces before quoting.",
    icon: FileText,
  },
  {
    num: "02",
    title: "Engineer",
    shortTag: "DFM & Process Planning",
    description:
      "Review manufacturability and determine the right machining approach.",
    detail:
      "Engineers plan datum strategy, workholding fixtures, multi-axis toolpaths, and dynamic balancing targets.",
    icon: Compass,
  },
  {
    num: "03",
    title: "Manufacture",
    shortTag: "In-House Execution",
    description:
      "Produce using our in-house machining, grinding and assembly facilities.",
    detail:
      "Executed across dedicated VMC, HMC, turning, precision grinding, and spindle assembly bays under one roof.",
    icon: Cog,
  },
  {
    num: "04",
    title: "Verify",
    shortTag: "Dimensional & Run-Off QA",
    description:
      "Inspect against agreed requirements before dispatch.",
    detail:
      "Every batch undergoes structured inspection and measurement verification prior to protective export packing.",
    icon: ShieldCheck,
  },
];

export default function ProcessBanner() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const elements = stepRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the step closest to the upper-middle viewport focus band
        let bestEntry: IntersectionObserverEntry | null = null;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (
            !bestEntry ||
            entry.intersectionRatio > bestEntry.intersectionRatio
          ) {
            bestEntry = entry;
          }
        }

        if (bestEntry) {
          const idxAttr = bestEntry.target.getAttribute("data-step-index");
          if (idxAttr !== null) {
            setActiveIndex(Number(idxAttr));
          }
        }
      },
      {
        // Triggers naturally as each step passes through the center of the screen
        rootMargin: "-25% 0px -35% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const currentStep = PROCESS_STEPS[activeIndex] ?? PROCESS_STEPS[0];
  const CurrentIcon = currentStep.icon;
  const progressPercent = ((activeIndex + 1) / PROCESS_STEPS.length) * 100;

  return (
    <section
      id="process"
      className="w-full py-16 md:py-24 bg-white border-t border-border-subtle relative z-30"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: Sticky Stage Monitor (Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-[104px]">
            <div className="flex items-center gap-3 text-concentra-purple text-[11px] font-extrabold tracking-[2px] uppercase mb-4">
              <span className="w-[27px] h-[2px] bg-concentra-green inline-block" />
              HOW WE WORK
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-industrial-slate leading-[1.18] tracking-tight mb-4">
              From your drawing
              <br />
              to a{" "}
              <em className="not-italic text-concentra-purple">
                dependable part.
              </em>
            </h2>

            <p className="text-sm text-ink-muted leading-relaxed mb-7 max-w-md">
              Scroll through each stage or select a step to see how every
              component moves from specification to verified delivery.
            </p>

            {/* Step Selector Tabs + Progress Track */}
            <div className="bg-surface-muted border border-border-subtle rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-ink-muted mb-2.5">
                <span>
                  Stage {currentStep.num} / 0{PROCESS_STEPS.length}
                </span>
                <span className="text-concentra-purple">
                  {currentStep.shortTag}
                </span>
              </div>

              {/* Smooth CSS Progress Bar */}
              <div className="w-full h-1.5 bg-border-subtle rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-concentra-purple transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Active Stage Preview Card */}
              <div className="bg-white border border-border-subtle rounded-xl p-4 sm:p-5 transition-all duration-300">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f4ecf7] text-concentra-purple flex items-center justify-center shrink-0">
                      <CurrentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold tracking-[1.5px] uppercase text-concentra-green block">
                        Step {currentStep.num}
                      </span>
                      <h3 className="text-lg font-extrabold text-industrial-slate leading-tight">
                        {currentStep.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-2xl font-extrabold text-border-subtle select-none">
                    {currentStep.num}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {currentStep.detail}
                </p>
              </div>

              {/* Clickable Step Pills for Quick Jumping */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => {
                        setActiveIndex(idx);
                        stepRefs.current[idx]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className={`py-2 px-2 rounded-lg text-left border transition-all duration-200 ${
                        isActive
                          ? "bg-industrial-slate text-white border-industrial-slate shadow-xs"
                          : "bg-white text-ink-muted border-border-subtle hover:border-concentra-purple/50 hover:text-industrial-slate"
                      }`}
                    >
                      <span
                        className={`block text-[10px] font-extrabold ${
                          isActive ? "text-concentra-lime" : "text-concentra-purple"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span className="block text-[11px] font-bold truncate">
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Scroll-Passing Process Stages */}
          <div className="lg:col-span-7 relative">
            {/* Subtle vertical guide line */}
            <div
              className="hidden sm:block absolute left-6 top-6 bottom-6 w-px bg-border-subtle"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-5">
              {PROCESS_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeIndex;
                const isCompleted = index < activeIndex;

                return (
                  <div
                    key={step.num}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    data-step-index={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative sm:pl-16 cursor-pointer transition-all duration-300 ${
                      isActive ? "translate-x-0 lg:translate-x-1" : "opacity-85 hover:opacity-100"
                    }`}
                  >
                    {/* Step Node Marker along the vertical rail */}
                    <div
                      className={`hidden sm:flex absolute left-2.5 top-7 w-7 h-7 rounded-full items-center justify-center text-[11px] font-extrabold border transition-colors duration-300 z-10 ${
                        isActive
                          ? "bg-concentra-purple text-white border-concentra-purple ring-4 ring-[#f4ecf7]"
                          : isCompleted
                            ? "bg-concentra-green text-white border-concentra-green"
                            : "bg-white text-ink-muted border-border-subtle"
                      }`}
                    >
                      {step.num}
                    </div>

                    {/* Step Card */}
                    <div
                      className={`rounded-2xl p-6 sm:p-7 border transition-all duration-300 ${
                        isActive
                          ? "bg-surface-muted border-concentra-purple/40 shadow-[0_10px_28px_rgba(33,22,39,0.07)]"
                          : "bg-white border-border-subtle hover:border-border-subtle/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2.5">
                        <div className="flex items-center gap-3">
                          <span
                            className={`sm:hidden text-xs font-extrabold px-2 py-0.5 rounded ${
                              isActive
                                ? "bg-concentra-purple text-white"
                                : "bg-surface-muted text-concentra-purple"
                            }`}
                          >
                            {step.num}
                          </span>
                          <h3
                            className={`text-xl font-extrabold transition-colors duration-200 ${
                              isActive
                                ? "text-concentra-purple"
                                : "text-industrial-slate"
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>

                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors duration-200 shrink-0 ${
                            isActive
                              ? "bg-white text-concentra-purple border-concentra-purple/25"
                              : "bg-surface-muted text-ink-muted border-border-subtle"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-industrial-slate/90 mb-1.5">
                        {step.description}
                      </p>

                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle Bottom Prompt */}
            <div className="sm:pl-16 mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-border-subtle">
              <p className="text-xs text-ink-muted">
                Ready to start Step 01 with your part drawing or spindle requirement?
              </p>
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-concentra-purple hover:text-industrial-slate transition-colors w-fit"
              >
                Request a Quote <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}