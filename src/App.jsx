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
  const heroText =
    "Hello! I'm Harrison, and I'm currently studying computer science at UCI. I love sinking my time into developing full stack apps with other people.";
  const words = heroText.split(" ");
  const mainContainerRef = useRef(null);
  const textContainerRef = useRef(null);

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

  // word/scroll anim
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
      mainContainerRef.current,
      {
        backgroundColor: "#000000",
        ease: "none",
      },
      0
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
      0
    );
  }, [started]);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <div
        ref={mainContainerRef}
        className="relative w-full h-[250vh] sm:h-[200vh] text-white"
        style={{ backgroundColor: "#6f0000" }}
      >
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          <Navbar />

          <div
            ref={textContainerRef}
            className="absolute top-[45%] -translate-y-1/2 left-12 md:left-24 max-h-[50vh] max-w-[60vw] z-10"
          >
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-[7vh] font-fraktion-sans font-bold leading-normal">
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
              <directionalLight position={[0, 1, 5]} color="#ffcccc" intensity={0.8} />
              <Scene started={started} />
            </Canvas>
          </div>
        </div>

        <Experience />
      </div>
    </>
  );
}
