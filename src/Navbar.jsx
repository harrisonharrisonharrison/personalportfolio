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

  return (
    <nav className="absolute top-0 w-full flex justify-between items-center px-5 sm:px-12 py-8 z-20 text-xs sm:text-lg">
      <a
        className="font-bold cursor-pointer hover:opacity-75 transition-opacity"
        onClick={handleScrollToHome}
      >
        harrison tran
      </a>
      <div className="flex gap-8 font-fraktion-mono">
        <a
          className="hover:text-red-300 transition-colors"
          onClick={handleScrollToExperience}
        >
          experience
        </a>
        <a href="#resume" className="hover:text-red-300 transition-colors">
          resume
        </a>
        <a href="#contact" className="hover:text-red-300 transition-colors">
          contact
        </a>
      </div>
    </nav>
  );
}
