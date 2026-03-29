import React from "react";

export default function Navbar() {
  const handleScrollToExperience = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScrollToHome = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScrollToContact = () => {
    const experienceSection = document.getElementById("experience");
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: "smooth" });
    }
    window.dispatchEvent(new Event("highlightContact"));
  };

  return (
    <nav className="absolute top-0 w-full flex justify-between items-center px-5 sm:px-12 py-8 z-20 text-xs sm:text-lg">
      <a
        className="font-bold cursor-pointer hover:opacity-75 transition-opacity"
        onClick={handleScrollToHome}
      >
        harrison tran
      </a>
      <div className="flex cursor-pointer gap-8 font-fraktion-mono">
        <a
          className="hover:text-red-300 transition-colors"
          onClick={handleScrollToExperience}
        >
          experience
        </a>
        <a href="#resume" className="cursor-pointer hover:text-red-300 transition-colors">
          resume
        </a>
        <a
          className="cursor-pointer hover:text-red-300 transition-colors"
          onClick={handleScrollToContact}
        >
          contact
        </a>
      </div>
    </nav>
  );
}
