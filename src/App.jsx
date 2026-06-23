import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LoadingScreen from "./Loading.jsx";
import Scene from "./Scene.jsx";
import Navbar from "./Navbar.jsx";

import Experience from "./Experience/Experience.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [started, setStarted] = useState(false);
  const [isOverride, setIsOverride] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1440);

  const heroText =
    "Hello! I'm Harrison, and I'm currently studying computer science at UCI. I love sinking my time into developing full stack apps with other people.";
  const words = heroText.split(" ");

  const mainContainerRef = useRef(null);
  const textContainerRef = useRef(null);
  const bgOverlayRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1440);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!started) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [started]);

  useGSAP(() => {
    if (!started) return;

    gsap.from(".hero-word", {
      y: "100vh",
      opacity: 0,
      duration: 1.5,
      stagger: 0.03,
      ease: "power3.out",
      delay: 0.5,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(
      bgOverlayRef.current,
      {
        opacity: 1,
        ease: "none",
      },
      0,
    );

    tl.to(
      ".hero-word",
      {
        x: "-100vw",
        rotation: -15,
        opacity: 0,
        stagger: 0.02,
        ease: "power1.inOut",
      },
      0,
    );
  }, [started]);

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white portrait:flex landscape:hidden md:!hidden p-8 text-center">
        <svg
          className="w-16 h-16 mb-4 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <h2 className="text-xl font-bold font-fraktion-sans tracking-widest uppercase">
          Please rotate your device
        </h2>
        <p className="mt-2 text-white/70">
          This experience is designed for landscape viewing.
        </p>
      </div>
      <LoadingScreen started={started} setStarted={setStarted} />
      <div
        ref={mainContainerRef}
        className={`relative w-full h-[250vh] sm:h-[200vh] text-white transition-colors duration-1000 ${
          isOverride
            ? "bg-linear-to-b from-cyan-500 via-blue-900 to-cyan-300"
            : "bg-linear-to-b from-[#570000]/30 to-[#000000]"
        }`}
      >
        <Navbar isMobile={isMobile} showContactModal={showContactModal} setShowContactModal={setShowContactModal} />

        <div
          ref={bgOverlayRef}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-colors duration-1000 z-0 opacity-0 ${
            isOverride ? "bg-blue-900" : "bg-black"
          }`}
        />

        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          <div
            ref={textContainerRef}
            className="absolute top-[40%] -translate-y-1/2 left-3 right-3 sm:left-6 sm:right-6 md:left-24 max-h-[50vh] max-w-[40vw] sm:max-w-[40vw] md:max-w-[55vw] lg:max-w-[60vw] z-10 pointer-events-none"
          >
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-[clamp(0.75rem,3vw,1.25rem)] sm:text-[clamp(0.875rem,3.5vw,1.5rem)] md:text-[clamp(1rem,4vw,1.75rem)] lg:text-[7vh] font-fraktion-sans font-bold leading-normal">
              {" "}
              {words.map((word, index) => (
                <div key={index} className="pt-2">
                  <span className="hero-word inline-block">{word}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <directionalLight
                position={[0, 1, 5]}
                color="#ffcccc"
                intensity={0.8}
              />
              <Scene started={started} isMobile={isMobile} />
            </Canvas>
          </div>
        </div>

        <div className="relative z-10">
          <Experience
            isOverride={isOverride}
            setIsOverride={setIsOverride}
            isMobile={isMobile}
          />
        </div>
      </div>
    </>
  );
}
