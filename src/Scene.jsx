import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGLTF } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ started }) {
  const modelGroupRef = useRef();
  const groundRef = useRef();

  // Load the desert model
  const { scene: desertScene } = useGLTF("/models/desert.glb");

  // model slide from right / scroll anim
  useGSAP(() => {
    if (!started) return;
    gsap.from(modelGroupRef.current.position, {
      x: 15,
      duration: 1.5,
      ease: "power3.out",
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body, 
        start: "top top",
        end: () => `+=${window.innerHeight}`, 
        scrub: 1,
      }
    });

    tl.to(modelGroupRef.current.position, { x: 15, ease: "power1.inOut" }, 0);
    tl.to(modelGroupRef.current.rotation, { z: -5, y: -2, ease: "power1.inOut" }, 0);

    tl.to(groundRef.current.position, { y: -100, ease: "power1.inOut" }, 0);
  }, [started]);
  
  return (
    <>
      {/* Restored floating sphere and cylinder */}
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

      {/* Replaced plane with the desert model */}
      <group ref={groundRef} position={[0, -15, 0]}>
        <primitive object={desertScene} scale={[60, 50, 50]} />
      </group>
    </>
  );
}

// Preload for performance
useGLTF.preload("/models/desert.glb");