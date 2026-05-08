import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import TerminalBox from "../Experience/TerminalBox";

export default function HoverSkill({ mainSkill, subSkills, isOverride }) {
  const [isHovered, setIsHovered] = useState(false);
  const [renderData, setRenderData] = useState({
    offset: 0,
    startX: 0,
    startY: 0,
  });

  const textRef = useRef(null);

  const handleMouseEnter = () => {
    console.log("Hovered:", mainSkill);
    let x = 0;
    let y = 0;

    if (textRef.current) {
      // @ts-ignore
      const rect = textRef.current.getBoundingClientRect();
      x = rect.right;
      y = rect.top + rect.height / 2;
    }

    const sign = Math.random() < 0.5 ? -1 : 1;
    const offset = sign * (Math.random() * 30 + 10);

    setRenderData({ offset, startX: x, startY: y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false)
    console.log("Unhovered:", mainSkill);
};

  const lineWidth = 100;
  const svgHeight = 200;
  const gap = 8;

  return (
    <div
      className="relative flex items-center gap-2 group w-fit cursor-pointer font-fraktion-sans"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleMouseLeave}
    >
      <span className={`text-xs sm:text-xl leading-none transition-colors ${isOverride ? "text-white" : "text-red-500"}`}>
        {">"}
      </span>

      <span
        ref={textRef}
        className={`text-xs sm:text-base leading-none transition-colors tracking-wide ${isOverride ? "text-white" : "text-neutral-200"}`}
      >
        {mainSkill}
      </span>

      {isHovered &&
        createPortal(
          <>
            <svg
              className="fixed overflow-visible pointer-events-none z-100"
              width={lineWidth}
              height={svgHeight}
              style={{
                left: renderData.startX + gap,
                top: renderData.startY - svgHeight / 2,
              }}
            >
              <path
                d={`M0 ${svgHeight / 2} L${lineWidth} ${
                  svgHeight / 2 + renderData.offset
                }`}
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4,4"
                className={`${isOverride ? "text-lime-400/50" : "text-red-500/50"} animate-line-drawing`}
              />
            </svg>

            <div
              className="fixed z-100 animate-pop-in pointer-events-none"
              style={{
                top: renderData.startY + renderData.offset,
                left: renderData.startX + gap + lineWidth + 4,
                transform: "translateY(-50%)",
              }}
            >
              <TerminalBox
                borders={["top", "bottom", "left", "right"]}
                padding="p-3"
                className={`w-40 sm:w-48 ${isOverride ? "bg-sky-500/10" : "bg-black/95 backdrop-blur-sm"}`}
                isOverride={isOverride}
              >
                <div className="flex flex-col gap-1.5">
                  {subSkills.map((subSkill) => (
                    <div
                      key={subSkill}
                      className="flex items-center gap-2 uppercase"
                    >
                      <span className={`text-lg leading-none opacity-50 ${isOverride ? "text-white" : ""}`}>{">"}</span>
                      <span className={`text-xs sm:text-sm ${isOverride ? "text-white" : "text-red-500"}`}>
                        {subSkill}
                      </span>
                    </div>
                  ))}
                </div>
              </TerminalBox>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
