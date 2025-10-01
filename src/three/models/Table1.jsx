import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function Table1Model(props) {
  const group = useRef();
  const { scene } = useGLTF('./table1.glb');

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
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

useGLTF.preload('./table1.glb');


