import React, { useState } from "react";
import TerminalBox from "./TerminalBox";
import DetailPane from "./DetailPane";

export default function SplitSection({ titleLeft, titleRight, items }) {
  const [activeItem, setActiveItem] = useState(
    items && items.length > 0 ? items[0] : null
  );

  return (
    <div className="flex-1 flex gap-0 min-h-0">
      <TerminalBox
        borders={["top", "bottom", "left", "right"]}
        className="w-[30%] flex flex-col"
      >
        <h2 className="opacity-50 border-b-2 tracking-widest shrink-0 uppercase mb-2">
          {titleLeft}
        </h2>
        <div className="overflow-y-auto flex-1 no-scrollbar min-h-0 pr-4 relative">
          <div className="flex flex-col h-full pb-12">
            {items?.map((item) => {
              const isActive = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-red-500/30 last:border-none py-1"
                >
                  <div
                    onMouseEnter={() => setActiveItem(item)}
                    className={`cursor-pointer transition-all duration-200 flex items-center justify-between py-1 uppercase 
                      ${
                        isActive
                          ? "text-neutral-300"
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

                    <span className="text-[10px] opacity-50 tracking-widest shrink-0">
                      {item.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </TerminalBox>

      <TerminalBox
        borders={["top", "bottom", "right"]}
        className="w-[70%] flex flex-col"
      >
        <div className="flex justify-between items-center border-b-2 opacity-50 mb-4 tracking-widest shrink-0">
          <h2>{titleRight}</h2>
          {activeItem?.site && (
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
        <div className="overflow-y-auto flex-1 no-scrollbar min-h-0">
          <DetailPane item={activeItem} />
        </div>
      </TerminalBox>
    </div>
  );
}