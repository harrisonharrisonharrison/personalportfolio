import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Scene({ started }) {
    const modelGroupRef = useRef();
  
    // model slide from right
    useGSAP(() => {
      if (!started) return;
      gsap.from(modelGroupRef.current.position, {
        x: 15,
        duration: 1.5,
        ease: "power3.out",
      });
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
        <mesh position={[0, -18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#d4af37" roughness={1} />
        </mesh>
      </>
    );
  }
  