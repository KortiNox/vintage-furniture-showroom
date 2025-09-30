import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Table3Model(props) {
  const group = useRef();
  
  // Загружаем модель (поместите вашу модель в public папку)
  const { scene } = useGLTF('./table3.glb');

  return (
    <group ref={group} {...props}>
      <primitive 
        object={scene} 
        scale={2} // Настройте масштаб по необходимости
        position={[0, 0, 0]} // Настройте позицию
        rotation={[0, 0, 0]} // Настройте вращение
      />
    </group>
  );
}

// Предзагрузка для лучшей производительности
useGLTF.preload('./table3.glb');