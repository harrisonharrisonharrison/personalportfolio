import React from "react";
import TerminalBox from "./TerminalBox";

export default function About() {
  return (
    <TerminalBox className="w-full md:w-[23%] flex flex-col shrink-0">
      <h2 className="opacity-50 mb-4 tracking-widest shrink-0">ABOUT</h2>
      <div className="overflow-y-auto flex-1 no-scrollbar space-y-4 min-h-0">
        <p>[ ABOUT ME TEXT ]</p>
        <p>[ SKILLS LIST ]</p>
        <p>[ HOBBIES LIST ]</p>
      </div>
    </TerminalBox>
  );
}
