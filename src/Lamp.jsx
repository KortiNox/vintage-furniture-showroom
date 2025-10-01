import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function LampModel(props) {
  const group = useRef();

  // Загружаем модель
  const { scene } = useGLTF('./lamp.glb');

  // Добавляем тени ко всем мешам модели после загрузки
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Опционально: улучшаем качество рендера теней для материала
          if (child.material) {
            child.material.needsUpdate = true;
          }
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

// Предзагрузка для лучшей производительности
useGLTF.preload('./lamp.glb');
