import React from 'react';

function AboutSubSection({ title, children }) {
  return (
    <div className="flex flex-col mb-2 last:mb-0 min-h-0 overflow-clip">
      <h2 className="border-b-2 border-red-500/30 pb-2 opacity-50 mb-4 tracking-widest shrink-0 uppercase">
        {title}
      </h2>
      
      <div className="relative flex-1 min-h-0">

        <div className="overflow-y-auto h-full no-scrollbar space-y-4 pr-4 pb-8">
          {children}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-15 bg-linear-to-t from-black/80 to-transparent pointer-events-none z-10" />
      </div>
      
    </div>
  );
}

export default AboutSubSection;