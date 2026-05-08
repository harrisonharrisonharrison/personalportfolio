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
  Supabase: "text-[#3ECF8E] border-[#3ECF8E]",
  Docker: "text-[#2496ED] border-[#2496ED]",
  "C#": "text-[#512BD4] border-[#512BD4]",
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

export default function DetailPane({ item, isOverride }) {
  if (!item)
    return (
      <div className="opacity-50 text-sm h-full flex items-center justify-center">
        [ HOVER AN ITEM TO VIEW DETAILS ]
      </div>
    );

  const formattedAbstract = item.abstract.split("\n").map((paragraph, idx) => (
    <p
      key={idx}
      className={`mb-4 last:mb-0 text-xs sm:text-base leading-relaxed tracking-wide font-fraktion-sans ${
        isOverride ? "text-white" : ""
      }`}
    >
      {paragraph}
    </p>
  ));

  return (
    <div className="w-full h-full flex flex-col min-h-0 relative">
      <div className={`flex-1 overflow-y-auto pr-4 pb-12 ${
        isOverride ? "custom-scrollbar-green" : "custom-scrollbar"
      }`}>
        
        {/* --- MAIN SECTION --- */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          
          {/* Left Column: Picture & Badges */}
          <div className="w-full md:w-[35%] lg:w-[30%] flex flex-col gap-4 shrink-0">
            <div className={`w-full aspect-square overflow-hidden bg-red-950/20 ${isOverride ? "border border-white/50" : "border border-red-500/50"}`}>
              <img
                key={item.picture}
                src={item.picture}
                alt={item.name}
                className="object-contain w-full h-full opacity-80"
              />
            </div>
            
            <div className="flex flex-row flex-wrap gap-2">
              {item.tags?.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Right Column: Abstract */}
          <div className={`flex-1 max-h-[300px] overflow-y-auto pr-4 ${
            isOverride ? "custom-scrollbar-green" : "custom-scrollbar"
          }`}>
            {formattedAbstract}
          </div>
          
        </div>

        {/* --- GALLERY SECTION --- */}
        {item.gallery && item.gallery.length > 0 && (
          <div className={`flex flex-col gap-4 border-t border-red-500/30 pt-6 ${isOverride ? "border-white/30" : ""}`}>
            <h3 className={`text-red-500 text-xs sm:text-sm tracking-widest opacity-80 ${isOverride ? "text-white" : ""}`}>
              [ GALLERY ]
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {item.gallery.map((photoUrl, idx) => (
                <div 
                  key={`${item.name}-gallery-${idx}`} 
                  className={`w-full overflow-hidden bg-red-950/20 ${isOverride ? "border border-white/40" : "border border-red-500/40"}`}
                >
                  <img
                    key={photoUrl} 
                    src={photoUrl}
                    alt={`${item.name} gallery image ${idx + 1}`}
                    className="object-cover w-full h-full opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
      {/* Bottom Fade Gradient */}
      {!isOverride && (
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black from-1% to-transparent pointer-events-none z-10" />
      )}
    </div>
  );
}