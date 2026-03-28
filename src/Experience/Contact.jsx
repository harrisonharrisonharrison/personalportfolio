import React from "react";
import TerminalBox from "./TerminalBox";

export default function Contact() {
  return (
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
  );
}
