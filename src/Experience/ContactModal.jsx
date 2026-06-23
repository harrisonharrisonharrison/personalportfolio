import React from "react";
import TerminalBox from "./TerminalBox";

export default function ContactModal({ isOpen, onClose, isOverride }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 pointer-events-auto"
      onClick={handleBackdropClick}
    >
      <TerminalBox
        className="w-[90vw] max-w-md p-6 relative"
        borders={["top", "bottom", "left", "right"]}
        isOverride={isOverride}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-lg font-bold hover:opacity-70 transition-opacity"
        >
          ✕
        </button>

        <div className={`font-fraktion-mono text-xs sm:text-sm ${isOverride ? "text-white" : "text-red-500"}`}>
          <h2 className="text-lg sm:text-xl font-bold mb-6 font-fraktion-sans">CONTACT</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>GITHUB</span>
              <a
                href="https://github.com/harrisonharrisonharrison"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                VIEW
              </a>
            </div>

            <div className="flex justify-between">
              <span>LINKEDIN</span>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                VIEW
              </a>
            </div>

            <div className="flex justify-between">
              <span>PHONE</span>
              <span>+1 714.260.1097</span>
            </div>

            <div className="flex flex-col gap-1">
              <span>EMAIL</span>
              <span className="text-xs sm:text-sm">HARRISONTRAN357@GMAIL.COM</span>
            </div>
          </div>
        </div>
      </TerminalBox>
    </div>
  );
}
