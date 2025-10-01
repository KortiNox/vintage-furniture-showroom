import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function LampModel(props) {
  const group = useRef();
  const { scene } = useGLTF('./lamp.glb');

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) child.material.needsUpdate = true;
        }
      });
    }
  }, [scene]);

  return (
    <group ref={group} {...props}>
      <primitive object={scene} scale={2} position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </group>
  );
}

useGLTF.preload('./lamp.glb');


