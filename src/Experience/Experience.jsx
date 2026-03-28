import React, { useState } from "react";

import { organizationsData } from "../assets/organizations";
import { projectsData } from "../assets/projects";

import SplitSection from "./SplitSection";
import Contact from "./Contact";
import About from "./About";
import Header from "./Header";

export default function Experience() {
  const [orgsMinimized, setOrgsMinimized] = useState(false);
  const [projMinimized, setProjMinimized] = useState(false);

  return (
    <section
      id="experience"
      className="bg-black text-red-500 px-8 pt-20 pb-2 h-screen overflow-hidden flex flex-col gap-6 font-fraktion-mono text-xs sm:text-sm"
    >
      <Header />
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        <About />
        <div 
            className={`absolute flex justify-center w-full bottom-[20%] cursor-pointer transition-all duration-700 delay-200 ${
              orgsMinimized && projMinimized ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <button className="px-6 py-3 border border-red-500 bg-red-950/20 text-red-500 hover:bg-red-500 hover:text-black transition-colors font-bold tracking-widest uppercase animate-pulse">
              [ SYSTEM OVERRIDE ]
            </button>
        </div>
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          <SplitSection
            titleLeft="ORGANIZATIONS"
            titleRight="DETAIL"
            items={organizationsData}
            isMinimized={orgsMinimized}
            onToggleMinimize={() => setOrgsMinimized(!orgsMinimized)}
          />
          <SplitSection
            titleLeft="PROJECTS"
            titleRight="DETAIL"
            items={projectsData}
            isMinimized={projMinimized}
            onToggleMinimize={() => setProjMinimized(!projMinimized)}
          />
        </div>
      </div>
      <Contact />
    </section>
  );
}
