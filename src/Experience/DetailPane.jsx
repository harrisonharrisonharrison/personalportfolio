import React from "react";

const badgeColors = {
  React: "text-[#61DAFB] border-[#61DAFB]",
  ExpressJS: "text-yellow-400 border-yellow-400",
  "AWS S3": "text-[#FF9900] border-[#FF9900]",
  PostgreSQL: "text-[#336791] border-[#336791]",
  Firebase: "text-[#FFCA28] border-[#FFCA28]",
  Swift: "text-[#F05138] border-[#F05138]",
  CoreData: "text-white border-white",
  Figma: "text-[#F24E1E] border-[#F24E1E]",
  GDScript: "text-[#478CBF] border-[#478CBF]",
  Blender: "text-[#EA7600] border-[#EA7600]",
  Audacity: "text-[#0000CC] border-[#0000CC]",
  Godot: "text-[#478CBF] border-[#478CBF]",
};

function Badge({ children }) {
  const colorClass = badgeColors[children] || "text-red-500 border-red-500";

  return (
    <span
      className={`border rounded-full px-3 text-[10px] sm:text-xs shrink-0 whitespace-nowrap ${colorClass}`}
    >
      {children}
    </span>
  );
}

export default function DetailPane({ item }) {
  if (!item)
    return (
      <div className="opacity-50 text-sm h-full flex items-center justify-center">
        [ HOVER AN ITEM TO VIEW DETAILS ]
      </div>
    );
  const formattedAbstract = item.abstract.split("\n").map((paragraph, idx) => (
    <p
      key={idx}
      className="mb-4 last:mb-0 text-xs sm:text-base leading-relaxed tracking-wide font-fraktion-sans"
    >
      {paragraph}
    </p>
  ));

  return (
    <div className="w-full h-full flex flex-col min-h-0 relative">
      <div className="flex-1 overflow-y-auto no-scrollbar pr-4 pb-12">
        {item.imageShape === "wide" && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[30%] flex flex-col gap-4 shrink-0">
              <div className="w-full aspect-video border border-red-500/50 overflow-hidden bg-red-950/20">
                <img
                  src={item.picture}
                  alt={item.name}
                  className="object-contain w-full h-full opacity-80"
                />
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="flex-1">{formattedAbstract}</div>
          </div>
        )}

        {item.imageShape === "vertical" && (
          <div className="flex flex-row gap-4 h-full">
            <div className="w-[20%] aspect-[9/16] border border-red-500/50 shrink-0 overflow-hidden bg-red-950/20">
              <img
                src={item.picture}
                alt={item.name}
                className="object-contain w-full h-full opacity-80"
              />
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              {item.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="flex-1">{formattedAbstract}</div>
          </div>
        )}

        {item.imageShape === "square" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-6">
              <div className="w-1/4 aspect-square border border-red-500/50 shrink-0 overflow-hidden bg-red-950/20">
                <img
                  src={item.picture}
                  alt={item.name}
                  className="object-contain w-full h-full opacity-80"
                />
              </div>
              <div className="flex-1">{formattedAbstract}</div>
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-black from-1% to-transparent pointer-events-none z-10" />
    </div>
  );
}
