import React from 'react';

function AboutSubSection({ title, children }) {
  return (
    <div className="flex flex-col mb-8 last:mb-0">
      <h2 className="border-b-2 border-red-500/30 pb-2 opacity-50 mb-4 tracking-widest shrink-0 uppercase">
        {title}
      </h2>
      
      <div className="space-y-4 pr-4">
        {children}
      </div>
    </div>
  );
}

export default AboutSubSection;