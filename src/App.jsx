import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LoadingScreen from "./Loading.jsx";
import Scene from "./Scene.jsx";
import Navbar from "./Navbar.jsx";

export default function App() {
  const [started, setStarted] = useState(false);
  const heroText =
    "Hello! I'm Harrison, and I'm currently studying computer science at UCI. I love sinking my time into developing full stack apps with other people.";
  const words = heroText.split(" ");

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
  }, [started]);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <div className="relative w-screen h-screen bg-[#6f0000] overflow-hidden text-white">
        <Navbar />

        <div className="absolute top-[45%] -translate-y-1/2 left-12 md:left-24 max-h-[50vh] max-w-[60vw] z-10">
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
            <Scene started={started}/>
          </Canvas>
        </div>
      </div>
    </>
  );
}
