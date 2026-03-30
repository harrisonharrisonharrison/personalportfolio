import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function HeadScene(props) {
  const { nodes, materials } = useGLTF("/models/head.glb");

  const groupRef = useRef();
  const headMeshRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();

  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  useEffect(() => {
    if (materials.Material_0) {
      materials.Material_0.emissive = new THREE.Color("#ffffff");
      materials.Material_0.emissiveIntensity = 0.04;
    }
  }, [materials]);

  useFrame((state, delta) => {
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;

    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.rotation.y = THREE.MathUtils.lerp(
        leftEyeRef.current.rotation.y,
        targetX,
        0.1,
      );
      leftEyeRef.current.rotation.x = THREE.MathUtils.lerp(
        leftEyeRef.current.rotation.x,
        -targetY,
        0.1,
      );

      rightEyeRef.current.rotation.y = THREE.MathUtils.lerp(
        rightEyeRef.current.rotation.y,
        targetX,
        0.1,
      );
      rightEyeRef.current.rotation.x = THREE.MathUtils.lerp(
        rightEyeRef.current.rotation.x,
        -targetY,
        0.1,
      );
    }

    if (groupRef.current) {
      const baseRotationY = -0.5;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetX / 3 + baseRotationY,
        0.05,
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY / 4,
        0.05,
      );
    }

    blinkTimer.current += delta;

    if (blinkTimer.current > 3 + Math.random() * 3) {
      isBlinking.current = true;
      blinkTimer.current = 0;
    }

    const head = headMeshRef.current;
    if (head && head.morphTargetDictionary) {
      const blinkIndex = head.morphTargetDictionary["Blink"];

      if (blinkIndex !== undefined && head.morphTargetInfluences) {
        let currentBlink = head.morphTargetInfluences[blinkIndex];

        if (isBlinking.current) {
          currentBlink += delta * 5;
          if (currentBlink >= 1) {
            currentBlink = 1;
            isBlinking.current = false;
          }
        } else {
          currentBlink -= delta * 5;
          if (currentBlink <= 0) currentBlink = 0;
        }

        head.morphTargetInfluences[blinkIndex] = currentBlink;
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[0, -0.5, 0]} {...props} dispose={null}>
      <pointLight position={[0, 0, 2]} intensity={10} distance={5} />
      <mesh
        ref={headMeshRef}
        name="HeadMesh"
        geometry={nodes.HeadMesh.geometry}
        material={materials.Material_0}
        morphTargetDictionary={nodes.HeadMesh.morphTargetDictionary}
        morphTargetInfluences={nodes.HeadMesh.morphTargetInfluences}
      />
      <mesh
        ref={rightEyeRef}
        geometry={nodes.RightEye.geometry}
        material={materials["Material.001"]}
        position={[-0.248, -0.016, 0.476]}
        scale={0.068}
      />
      <mesh
        ref={leftEyeRef}
        geometry={nodes.LeftEye.geometry}
        material={materials["Material.001"]}
        position={[0.255, -0.016, 0.479]}
        scale={0.068}
      />
    </group>
  );
}

useGLTF.preload("/head.glb");
