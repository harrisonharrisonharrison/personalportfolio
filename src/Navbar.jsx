export default function Navbar(){
    return (
        <nav className="absolute top-0 w-full flex justify-between items-center px-12 py-8 z-20 text-lg">
          <a
            href="/"
            className="font-bold cursor-pointer hover:opacity-75 transition-opacity"
          >
            harrison tran
          </a>
          <div className="flex gap-8 font-fraktion-mono">
            <a
              href="#experience"
              className="hover:text-red-300 transition-colors"
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
    )
}