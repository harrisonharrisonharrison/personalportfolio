import React from "react";

import { organizationsData } from "../assets/organizations";
import { projectsData } from "../assets/projects";

import SplitSection from "./SplitSection";
import Contact from "./Contact";
import About from "./About";
import Header from "./Header";

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-black text-red-500 px-8 pt-20 pb-2 h-screen overflow-hidden flex flex-col gap-6 font-fraktion-mono text-xs sm:text-sm"
    >
      <Header />
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        <About />
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          <SplitSection
            titleLeft="ORGANIZATIONS"
            titleRight="DETAIL"
            items={organizationsData}
          />
          <SplitSection
            titleLeft="PROJECTS"
            titleRight="DETAIL"
            items={projectsData}
          />
        </div>
      </div>
      <Contact />
    </section>
  );
}
