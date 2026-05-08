import React, { useState } from "react";
import TerminalBox from "./TerminalBox";
import DetailPane from "./DetailPane";

export default function SplitSection({
  titleLeft,
  titleRight,
  items,
  isMinimized,
  onToggleMinimize,
  isOverride
}) {
  const [activeItem, setActiveItem] = useState(
    items && items.length > 0 ? items[0] : null
  );

  return (
    <div
      className={`flex gap-0 w-full transition-all duration-500 ease-in-out ${
        isMinimized ? "shrink-0" : "flex-1 min-h-0 h-full"
      }`}
    >
      <TerminalBox
        borders={["top", "bottom", "left", "right"]}
        className={`w-[30%] flex flex-col transition-all duration-500 ${
          isMinimized ? "" : "h-full"
        }`}
        isOverride={isOverride}
      >
        <div
          className={`flex justify-between items-center border-b-2 opacity-50 shrink-0 uppercase transition-all ${
            isMinimized
              ? ""
              : `border-b-2 ${isOverride ? "border-white/20" : "border-red-500/30"} pb-2 mb-2`
          }`}
        >
          <h2 className={`tracking-widest ${isOverride ? "text-white" : ""}`}>{titleLeft}</h2>
          <button
            onClick={onToggleMinimize}
            className="hover:text-yellow-400 text-white transition-colors cursor-pointer p-1"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 14h4v4m0-4l-5 5m15-5h-4v4m0-4l5 5M4 10h4V6m0 4l-5-5m15 5h-4V6m0 4l5-5"
                />
              </svg>
            )}
          </button>
        </div>
        {!isMinimized && (
          <div className={`overflow-y-auto flex-1 min-h-0 pr-4 relative ${isOverride ? "custom-scrollbar-green" : "custom-scrollbar"}`}>
            <div className="flex flex-col h-full pb-12">
              {items?.map((item) => {
                const isActive = activeItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`border-b ${isOverride ? "border-white/20" : "border-red-500/30"} last:border-none py-1`}
                  >
                    <div
                      onMouseEnter={() => setActiveItem(item)}
                      className={`cursor-pointer transition-all duration-200 flex items-center justify-between py-1 uppercase ${
                        isActive
                          ? isOverride
                            ? "text-white"
                            : "text-neutral-300"
                          : isOverride
                          ? "text-white hover:text-lime-300"
                          : "text-red-500 hover:text-red-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-lg leading-none ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          [
                        </span>
                        <span>{item.name}</span>
                        <span
                          className={`text-lg leading-none ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          ]
                        </span>
                      </div>

                      <span className={`text-[10px] opacity-50 tracking-widest shrink-0 ${isOverride ? "text-white/70" : ""}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </TerminalBox>
      <TerminalBox
        borders={["top", "bottom", "right"]}
        className={`w-[70%] flex flex-col transition-all duration-500 ${
          isMinimized ? "" : "h-full"
        }`}
        isOverride={isOverride}
      >
        <div className={`flex justify-between items-center border-b-2 opacity-50 mb-4 tracking-widest shrink-0 ${isOverride ? "border-white/20" : ""}`}>
          <h2 className={isOverride ? "text-white" : ""}>{titleRight}</h2>
          {!isMinimized && activeItem?.site && (
            <a
              href={activeItem.site}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer hover:text-white transition-colors shrink-0"
            >
              SITE ↗
            </a>
          )}
        </div>
        {!isMinimized && (
          <div className="overflow-y-auto flex-1 no-scrollbar min-h-0">
            <DetailPane item={activeItem} isOverride={isOverride} />
          </div>
        )}
      </TerminalBox>
    </div>
  );
}