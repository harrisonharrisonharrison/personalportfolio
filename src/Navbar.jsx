import React, { useEffect, useState } from "react";
import ContactModal from "./Experience/ContactModal";

export default function Navbar({ isMobile, showContactModal, setShowContactModal }) {
  const [isOverride, setIsOverride] = useState(false);

  useEffect(() => {
    const handleOverride = (event) => {
      setIsOverride(event.detail?.isOverride ?? false);
    };

    window.addEventListener("systemOverrideChanged", handleOverride);
    return () => window.removeEventListener("systemOverrideChanged", handleOverride);
  }, []);

  const linkClass = `transition-colors ${isOverride ? "text-white hover:text-lime-300" : "hover:text-red-300"}`;

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

  const handleContactClick = () => {
    if (isMobile) {
      setShowContactModal(true);
    } else {
      const experienceSection = document.getElementById("experience");
      if (experienceSection) {
        experienceSection.scrollIntoView({ behavior: "smooth" });
      }
      window.dispatchEvent(new Event("highlightContact"));
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-5 sm:px-12 py-8 z-[9999] text-xs sm:text-lg pointer-events-auto">
        <a
          className={`font-bold cursor-pointer hover:opacity-75 transition-opacity ${isOverride ? "text-white" : ""}`}
          onClick={handleScrollToHome}
        >
          harrison tran
        </a>
        <div className="flex cursor-pointer gap-8 font-fraktion-mono">
          <a className={linkClass} onClick={handleScrollToExperience}>
            experience
          </a>
          
          <a 
            href="/harrison-tran-resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={linkClass}
          >
            resume
          </a>

          <a className={linkClass} onClick={handleContactClick}>
            contact
          </a>
        </div>
      </nav>

      {isMobile && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          isOverride={isOverride}
        />
      )}
    </>
  );
}