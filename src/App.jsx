import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Scene() {
  const modelGroupRef = useRef();

  // model slide from right
  useGSAP(() => {
    gsap.from(modelGroupRef.current.position, {
      x: 15, 
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3,
    });
  });

  return (
    <>
      <group ref={modelGroupRef} position={[5, -2, 0]}>
        
        <mesh position={[0, 3, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#cccccc" roughness={0.4} />
        </mesh>

        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[2.2, 1.4, 4, 32]} />
          <meshStandardMaterial color="#e5e5e5" roughness={0.8} />
        </mesh>
      </group>
      {/* ground */}
      <mesh position={[0, -18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#d4af37" roughness={1} /> 
      </mesh>
    </>
  );
}

export default function App() {
  const heroText = "Hello! I'm Harrison, and I'm currently studying computer science at UCI. I love sinking my time into developing full stack apps with other people.";
  
  const words = heroText.split(" ");

  useGSAP(() => {
    gsap.from('.hero-word', {
      y: '100vh',          
      opacity: 0,
      duration: 1.5,
      stagger: 0.03,
      ease: 'power3.out',
      delay: 0.5, 
    });
  });

  return (
    <div className="relative w-screen h-screen bg-[#6f0000] overflow-hidden text-white">
      <nav className="absolute top-0 w-full flex justify-between items-center px-12 py-8 z-20 text-lg">
        <a href="/" className="font-bold cursor-pointer hover:opacity-75 transition-opacity">
          harrison tran
        </a>
        <div className="flex gap-8 font-fraktion-mono">
          <a href="#experience" className="hover:text-red-300 transition-colors">experience</a>
          <a href="#resume" className="hover:text-red-300 transition-colors">resume</a>
          <a href="#contact" className="hover:text-red-300 transition-colors">contact</a>
        </div>
      </nav>

      <div className="absolute top-[45%] -translate-y-1/2 left-12 md:left-24 max-h-[50vh] max-w-[60vw] z-10">
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-[7vh] font-fraktion-sans font-bold leading-[1.3]">
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
          <Scene />
        </Canvas>
      </div>
      
    </div>
  );
}