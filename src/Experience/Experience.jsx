import React, { useState } from "react";

import { organizationsData } from "../assets/data/organizations";
import { projectsData } from "../assets/data/projects";

import SplitSection from "./SplitSection";
import Contact from "./Contact";
import About from "../About/About";
import Header from "./Header";
import FlickerReveal from "./Flicker"; // Import the new wrapper!

export default function Experience() {
  const [orgsMinimized, setOrgsMinimized] = useState(false);
  const [projMinimized, setProjMinimized] = useState(false);

  return (
    <section
      id="experience"
      className="bg-black text-red-500 px-8 pt-20 pb-2 min-h-screen md:h-screen md:overflow-hidden flex flex-col gap-6 font-fraktion-mono text-xs sm:text-sm"
    >
      <FlickerReveal delay={0}>
        <Header />
      </FlickerReveal>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        <FlickerReveal
          delay={200}
          className="w-full md:w-[23%] flex flex-col shrink-0 min-h-0"
        >
          <About />
        </FlickerReveal>

        <div
          className={`absolute flex justify-center w-full bottom-[20%] cursor-pointer transition-all duration-700 delay-200 ${
            orgsMinimized && projMinimized
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
          }`}
        >
          <button className="px-6 py-3 border border-red-500 bg-red-950/20 pointer-cursor text-red-500 hover:bg-red-500 hover:text-black transition-colors font-bold tracking-widest uppercase animate-pulse">
            [ SYSTEM OVERRIDE ]
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-6 min-h-0">
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
            />
          </FlickerReveal>
        </div>
      </div>

      <FlickerReveal delay={800}>
        <Contact />
      </FlickerReveal>
    </section>
  );
}
