import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Center, OrbitControls, useGLTF, useTexture } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ started }) {
  const modelGroupRef = useRef();
  const groundRef = useRef();

  const { scene: desertScene } = useGLTF("/models/desert.glb");
  const { scene: pedestalScene} = useGLTF("/models/pedestal.glb");

  const textures = useTexture({
    map: "/textures/stone.png",
  });

  useEffect(() => {
    Object.values(textures).forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(6, 2); 
    });
  }, [textures]);

  const texturedPedestalScene = useMemo(() => pedestalScene.clone(), [pedestalScene]);

  useEffect(() => {
    texturedPedestalScene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: textures.map,
          metalness: 0.1,
        });
      }
    });
  }, [texturedPedestalScene, textures]);

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
      {/* <OrbitControls />
      <gridHelper args={[100, 100]} position={[0, -18, 0]} />
      <axesHelper args={[50]} /> */}

      <group ref={modelGroupRef} position={[5, -2, 0]}>
        <mesh position={[0, 3, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>

        <Center position={[-0.4, -2.5, 0]}>
          <primitive object={texturedPedestalScene} rotation={[0, .15, -.05]} scale={[.5, .5, .5]} />
        </Center>
      </group>

      <group ref={groundRef} position={[0, -15, 0]}>
        <primitive object={desertScene} scale={[60, 50, 50]} />
      </group>
    </>
  );
}
useTexture.preload("/textures/stone.png");

useGLTF.preload("/models/pedestal.glb");
useGLTF.preload("/models/desert.glb");