import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ started }) {
    const modelGroupRef = useRef();
    const groundRef = useRef();

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
        <mesh ref={groundRef} position={[0, -18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#d4af37" roughness={1} />
        </mesh>
      </>
    );
  }
  