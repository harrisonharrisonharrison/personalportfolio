import React, { useState, useEffect } from "react";

import { organizationsData } from "../assets/data/organizations";
import { projectsData } from "../assets/data/projects";

import SplitSection from "./SplitSection";
import Contact from "./Contact";
import About from "../About/About";
import Header from "./Header";
import FlickerReveal from "./Flicker";

export default function Experience({ isOverride, setIsOverride, isMobile }) {
  const [orgsMinimized, setOrgsMinimized] = useState(false);
  const [projMinimized, setProjMinimized] = useState(true);
  
  useEffect(() => {
    document.body.classList.toggle("override-active", isOverride);
    window.dispatchEvent(
      new CustomEvent("systemOverrideChanged", {
        detail: { isOverride },
      })
    );
  }, [isOverride]);

  return (
    <section
      id="experience"
      className={`${
        isOverride ? "bg-blue-900 text-white" : "bg-black text-red-500"
      } px-8 pt-20 pb-2 min-h-screen md:h-screen md:overflow-hidden flex flex-col gap-6 font-fraktion-mono text-xs sm:text-sm transition-colors duration-700`}
    >
      {!isMobile && (
        <FlickerReveal delay={0} className="hidden lg:block">
          <Header isOverride={isOverride} />
        </FlickerReveal>
      )}

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {!isMobile && (
          <FlickerReveal
            delay={200}
            className="w-full md:w-[23%] hidden lg:flex flex-col shrink-0 min-h-0"
          >
            <About isOverride={isOverride} />
          </FlickerReveal>
        )}

        <div
          className={`absolute flex justify-center w-full bottom-[20%] cursor-pointer transition-all duration-700 delay-200 z-10 ${
            orgsMinimized && projMinimized
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <button 
            onClick={() => setIsOverride(!isOverride)}
            className={`px-6 py-3 border pointer-cursor transition-colors font-bold tracking-widest uppercase animate-pulse ${
              isOverride 
                ? "border-white bg-white/20 text-white hover:bg-white hover:text-blue-900" 
                : "border-red-500 bg-red-950/20 text-red-500 hover:bg-red-500 hover:text-black"
            }`}
          >
            [ {isOverride ? "RESTORE SYSTEM" : "SYSTEM OVERRIDE"} ]
          </button>
        </div>

        <div className={`flex-1 flex flex-col gap-0 min-h-0 ${isMobile ? "w-full" : ""}`}>
          <FlickerReveal
            delay={400}
            className={`flex flex-col min-h-0 transition-all duration-500 ${
              !orgsMinimized ? "flex-1" : ""
            }`}
          >
            <SplitSection
              titleLeft="ORGANIZATIONS"
              titleRight="DETAIL"
              items={organizationsData}
              isMinimized={orgsMinimized}
              onToggleMinimize={() => setOrgsMinimized(!orgsMinimized)}
              isOverride={isOverride}
              bordersLeft={["top", "bottom", "left", "right"]}
              bordersRight={["top", "bottom", "right"]}
            />
          </FlickerReveal>

          <FlickerReveal
            delay={600}
            className={`flex flex-col min-h-0 transition-all duration-500 ${
              !projMinimized ? "flex-1" : ""
            }`}
          >
            <SplitSection
              titleLeft="PROJECTS"
              titleRight="DETAIL"
              items={projectsData}
              isMinimized={projMinimized}
              onToggleMinimize={() => setProjMinimized(!projMinimized)}
              isOverride={isOverride}
              bordersLeft={["bottom", "left", "right"]}
              bordersRight={["bottom", "right"]}
            />
          </FlickerReveal>
        </div>
      </div>
      {!isMobile && (  
        <FlickerReveal delay={800}>
          <Contact isOverride={isOverride} />
        </FlickerReveal>
      )}
    </section>
  );
}