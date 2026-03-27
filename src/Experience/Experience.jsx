import React from "react";
import TerminalBox from "./TerminalBox";

function SplitSection({ titleLeft, titleRight, showSite }) {
  return (
    <div className="flex-1 flex gap-0 min-h-0">
      <TerminalBox
        borders={["top", "bottom", "left", "right"]}
        className="w-[40%] flex flex-col"
      >
        <h2 className="opacity-50 mb-4 tracking-widest shrink-0">
          {titleLeft}
        </h2>
        <div className="overflow-y-auto flex-1 no-scrollbar min-h-0">
          <div className="space-y-4">
            <p>[ LIST ITEM 1 ]</p>
            <p>[ LIST ITEM 2 ]</p>
            <p>[ LIST ITEM 3 ]</p>
          </div>
        </div>
      </TerminalBox>

      <TerminalBox
        borders={["top", "bottom", "right"]}
        className="w-[60%] flex flex-col"
      >
        <div className="flex justify-between opacity-50 mb-4 tracking-widest shrink-0">
          <h2>{titleRight}</h2>
          {showSite && (
            <span className="cursor-pointer hover:text-white transition-colors shrink-0">
              SITE ↗
            </span>
          )}
        </div>
        <div className="overflow-y-auto flex-1 no-scrollbar min-h-0">
          <p>[ DETAIL CONTENT GOES HERE ]</p>
        </div>
      </TerminalBox>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-black text-red-500 px-8 pt-20 pb-2 h-screen overflow-hidden flex flex-col gap-6 font-fraktion-mono uppercase text-xs sm:text-sm"
    >
      <TerminalBox padding="py-2" className="text-center text-xl font-bold font-fraktion-sans tracking-widest">
        YOU ARE VISITOR #103.
      </TerminalBox>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        <TerminalBox className="w-full md:w-[23%] flex flex-col shrink-0">
          <h2 className="opacity-50 mb-4 tracking-widest shrink-0">ABOUT</h2>
          <div className="overflow-y-auto flex-1 no-scrollbar space-y-4 min-h-0">
            <p>[ ABOUT ME TEXT ]</p>
            <p>[ SKILLS LIST ]</p>
            <p>[ HOBBIES LIST ]</p>
          </div>
        </TerminalBox>

        <div className="flex-1 flex flex-col gap-6 min-h-0">
          <SplitSection
            titleLeft="ORGANIZATIONS"
            titleRight="DETAIL"
            showSite={true}
          />

          <SplitSection
            titleLeft="PROJECTS"
            titleRight="DETAIL"
            showSite={true}
          />
        </div>
      </div>

      <TerminalBox borders={["top"]} padding="py-4" className="mt-2 shrink-0">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="w-full md:w-[23%] flex shrink-0">
            <span className="text-green-500">CONTACT</span>
          </div>
          <div className="flex-1 flex gap-0">
            <div className="w-[40%]">
              <div className="grid grid-cols-2 gap-y-2">
                <span className="cursor-pointer hover:text-white transition-colors">
                  GITHUB
                </span>
                <span>HOME ADDRESS</span>
                <span className="cursor-pointer hover:text-white transition-colors">
                  LINKEDIN
                </span>
              </div>
            </div>
            <div className="w-[60%] flex flex-col items-center justify-center">
              <div className="flex flex-col gap-2">
                <span>P: +1 714.260.1097</span>
                <span>E: HARRISONTRAN357@GMAIL.COM</span>
              </div>
            </div>
          </div>
        </div>
      </TerminalBox>
    </section>
  );
}
