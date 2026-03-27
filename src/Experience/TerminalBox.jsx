import React from "react";

const Crosshair = ({ className = "" }) => (
  <div className={`absolute pointer-events-none z-10 size-4 ${className}`}>
    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-red-500" />
    <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-red-500" />
  </div>
);

const EdgeLine = ({ type, inset = "0.75rem", className = "" }) => {
  if (type === "top" || type === "bottom") {
    return (
      <div
        className={`absolute h-px bg-red-500 ${className}`}
        style={{ left: inset, right: inset }}
      />
    );
  }
  if (type === "left" || type === "right") {
    return (
      <div
        className={`absolute w-px bg-red-500 ${className}`}
        style={{ top: inset, bottom: inset }}
      />
    );
  }
  return null;
};

export default function TerminalBox({
  children,
  className = "",
  borders = ["top", "bottom", "left", "right"],
  gap = "0.85rem",
  padding = "p-2 sm:p-6",
}) {
  const has = (border) => borders.includes(border);

  return (
    <div className={`relative ${className}`}>
      {(has("top") || has("left")) && (
        <Crosshair className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      )}
      {(has("top") || has("right")) && (
        <Crosshair className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
      )}
      {(has("bottom") || has("left")) && (
        <Crosshair className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
      )}
      {(has("bottom") || has("right")) && (
        <Crosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
      )}

      {has("top") && <EdgeLine type="top" inset={gap} className="top-0" />}
      {has("bottom") && (
        <EdgeLine type="bottom" inset={gap} className="bottom-0" />
      )}
      {has("left") && <EdgeLine type="left" inset={gap} className="left-0" />}
      {has("right") && (
        <EdgeLine type="right" inset={gap} className="right-0" />
      )}

      <div className={`relative z-0 ${padding} h-full flex flex-col min-h-0`}>
        {children}
      </div>
    </div>
  );
}
