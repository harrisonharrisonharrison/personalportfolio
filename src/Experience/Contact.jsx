import React, { useState, useEffect } from "react";
import TerminalBox from "./TerminalBox";

export default function Contact() {
  const [showJoke, setShowJoke] = useState(false);
  const [isPulsating, setIsPulsating] = useState(false);

  useEffect(() => {
    if (showJoke) {
      const timer = setTimeout(() => {
        setShowJoke(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showJoke]);

  useEffect(() => {
    const handleHighlight = () => {
      setIsPulsating(true);
      setTimeout(() => {
        setIsPulsating(false);
      }, 5000);
    };

    window.addEventListener("highlightContact", handleHighlight);
    return () => window.removeEventListener("highlightContact", handleHighlight);
  }, []);

  return (
    <TerminalBox borders={["top"]} padding="py-4" className="mt-2 shrink-0">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="w-full md:w-[23%] flex shrink-0">
          <span 
            className={`transition-colors duration-300 ${
              isPulsating ? "text-green-500 animate-pulse" : "text-white"
            }`}
          >
            CONTACT
          </span>
        </div>
        <div className="flex-1 flex gap-0">
          <div className="w-[40%]">
            <div className="grid grid-cols-2 gap-y-2">
              <a 
                href="https://github.com/harrisonharrisonharrison" 
                target="_blank" 
                rel="noreferrer"
                className="cursor-pointer hover:text-white transition-colors block"
              >
                GITHUB
              </a>
              
              <span 
                onClick={() => setShowJoke(true)}
                className={`transition-colors ${
                  showJoke ? "text-blue-500 font-bold" : "hover:text-white cursor-pointer"
                }`}
              >
                {showJoke ? "JUST KIDDING." : "HOME ADDRESS"}
              </span>
              
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noreferrer"
                className="cursor-pointer hover:text-white transition-colors block"
              >
                LINKEDIN
              </a>
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