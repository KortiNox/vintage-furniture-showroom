import React, { useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from './context/Customization';

export function Model2(props) {
  const { outerMaterial, innerMaterial, handlesMaterial, doorSize } = useCustomization();
  const group = useRef();

  // Загружаем вашу модель
  const { nodes, materials } = useGLTF('./door3.glb');

  // Конфигурация размеров
  const sizeConfig = {
    xs: { scale: 1, yPosition: 0.2 },
    s: { scale: 1.1, yPosition: 0.3 },
    m: { scale: 1.2, yPosition: 0.45 },
    l: { scale: 1.4, yPosition: 0.7 },
    xl: { scale: 1.5, yPosition: 0.85 },
  };

  // Текстуры
  const wood1 = useTexture({
    map: './wood_textures/Wood_022_SD/Wood_022_basecolor.jpg',
    displacementMap: './wood_textures/Wood_022_SD/Wood_022_height.png',
    aoMap: './wood_textures/Wood_022_SD/Wood_022_ambientOcclusion.jpg',
    normalMap: './wood_textures/Wood_022_SD/Wood_022_normal.jpg',
    roughnessMap: './wood_textures/Wood_022_SD/Wood_022_roughness.jpg',
  });

  const wood2 = useTexture({
    map: './wood_textures/Wood_024_SD/Wood_024_basecolor.jpg',
    displacementMap: './wood_textures/Wood_024_SD/Wood_024_height.jpg',
    aoMap: './wood_textures/Wood_024_SD/Wood_024_ambientOcclusion.jpg',
    normalMap: './wood_textures/Wood_024_SD/Wood_024_normal.jpg',
    roughnessMap: './wood_textures/Wood_024_SD/Wood_024_roughness.jpg',
  });

  const wood3 = useTexture({
    map: './wood_textures/Wood_027_SD/Wood_027_basecolor.jpg',
    displacementMap: './wood_textures/Wood_027_SD/Wood_027_height.png',
    aoMap: './wood_textures/Wood_027_SD/Wood_027_ambientOcclusion.jpg',
    normalMap: './wood_textures/Wood_027_SD/Wood_027_normal.jpg',
    roughnessMap: './wood_textures/Wood_027_SD/Wood_027_roughness.jpg',
  });

  const gold = useTexture('./textures/gold.jpg');

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Масштабируем модель в зависимости от выбранного размера */}
      <group
        scale={sizeConfig[doorSize].scale * 0.05}
        position={[0, sizeConfig[doorSize].yPosition, 0]}
        rotation={[0, -Math.PI / 12, 0]}
      >
        {/* Рама (frame) */}
        <mesh castShadow receiveShadow geometry={nodes.frameMat_0.geometry}>
          {outerMaterial === 'Oak' && <meshStandardMaterial {...materials['material.002']} />}
          {outerMaterial === 'Teak' && <meshStandardMaterial {...wood1} />}
          {outerMaterial === 'Mahogany' && <meshStandardMaterial {...wood2} />}
          {outerMaterial === 'Pine' && <meshStandardMaterial {...wood3} />}
        </mesh>

        {/* Дверь (Door) с её позицией из модели */}
        <group position={[20.017, -0.09, -0.269]}>
          <mesh castShadow receiveShadow geometry={nodes.DoorMat_0.geometry}>
            {outerMaterial === 'Oak' && (
              <meshStandardMaterial
                {...materials['material.001']}
                metalness={1.2}
                roughness={1.9}
              />
            )}
            {outerMaterial === 'Teak' && <meshStandardMaterial {...wood1} />}
            {outerMaterial === 'Mahogany' && <meshStandardMaterial {...wood2} />}
            {outerMaterial === 'Pine' && <meshStandardMaterial {...wood3} />}
          </mesh>
        </group>
      </group>
    </group>
  );
}
