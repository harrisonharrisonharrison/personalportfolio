import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const worldPos = new THREE.Vector3();

export default function HeadScene(props) {
  const { nodes, materials } = useGLTF("/models/head.glb");

  const groupRef = useRef();
  const headMeshRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();

  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  useEffect(() => {
    const headMat = materials["tripo_material_977df2c5-a0f7-485a-a642-e0a100e62825"];
    if (headMat) {
      headMat.emissive = new THREE.Color("#ffffff");
      headMat.emissiveIntensity = 0.04;
    }
  }, [materials]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.getWorldPosition(worldPos);
      worldPos.project(state.camera);
    }

    const deltaX = state.pointer.x - worldPos.x;
    const deltaY = state.pointer.y - worldPos.y;

    const targetX = (deltaX * Math.PI) / 4;
    const targetY = (deltaY * Math.PI) / 4;

    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.rotation.y = THREE.MathUtils.lerp(
        leftEyeRef.current.rotation.y,
        targetX,
        0.1
      );
      leftEyeRef.current.rotation.x = THREE.MathUtils.lerp(
        leftEyeRef.current.rotation.x,
        -targetY,
        0.1
      );

      rightEyeRef.current.rotation.y = THREE.MathUtils.lerp(
        rightEyeRef.current.rotation.y,
        targetX,
        0.1
      );
      rightEyeRef.current.rotation.x = THREE.MathUtils.lerp(
        rightEyeRef.current.rotation.x,
        -targetY,
        0.1
      );
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (targetX / 2) - 2,
        0.05
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY / 4,
        0.05
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
        castShadow
        receiveShadow
        geometry={nodes.HeadMesh.geometry}
        material={materials["tripo_material_977df2c5-a0f7-485a-a642-e0a100e62825"]}
        morphTargetDictionary={nodes.HeadMesh.morphTargetDictionary}
        morphTargetInfluences={nodes.HeadMesh.morphTargetInfluences}
        position={[0, 0, 0.009]}
      />

      <group position={[0.263, -0.001, 0.117]}>
        <group ref={rightEyeRef}>
          <group rotation={[-Math.PI, 1.539, -Math.PI]} scale={0.049}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Eye_Material001_0.geometry}
                material={materials["Material.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.EyeGlass_Material002_0.geometry}
                material={materials["Material.003"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={101.294}
              />
            </group>
          </group>
        </group>
      </group>

      <group position={[0.263, -0.001, -0.118]}>
        <group ref={leftEyeRef}>
          <group rotation={[-Math.PI, 1.539, -Math.PI]} scale={0.049}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Eye_Material001_0001.geometry}
                material={materials["Material.005"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.EyeGlass_Material002_0001.geometry}
                material={materials["Material.004"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={101.294}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/head.glb");