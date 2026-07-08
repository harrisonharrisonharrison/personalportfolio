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
        className="w-[90vw] max-w-[540px] p-6 sm:p-8 relative"
        borders={["top", "bottom", "left", "right"]}
        isOverride={isOverride}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-lg font-bold text-white hover:text-red-500 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <div
          className={`font-fraktion-mono text-xs sm:text-sm ${isOverride ? "text-white" : "text-red-500"}`}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-8 font-fraktion-sans text-white">
            CONTACT
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>GITHUB</span>
              <a
                href="https://github.com/harrisonharrisonharrison"
                target="_blank"
                rel="noreferrer"
                className="text-white underline decoration-white/50 underline-offset-4 hover:opacity-70 transition-opacity"
              >
                VIEW
              </a>
            </div>

            <div className="flex items-center justify-between">
              <span>LINKEDIN</span>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white underline decoration-white/50 underline-offset-4 hover:opacity-70 transition-opacity"
              >
                VIEW
              </a>
            </div>

            <div className="flex items-center justify-between">
              <span>PHONE</span>
              <a
                href="tel:+17142601097"
                className="text-white underline decoration-white/50 underline-offset-4 hover:opacity-70 transition-opacity"
              >
                +1 714.260.1097
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
              <span>EMAIL</span>
              <a
                href="mailto:HARRISONTRAN357@GMAIL.COM"
                className="text-white underline decoration-white/50 underline-offset-4 hover:opacity-70 transition-opacity break-all sm:break-normal"
              >
                HARRISONTRAN357@GMAIL.COM
              </a>
            </div>
          </div>
        </div>
      </TerminalBox>
    </div>
  );
}
