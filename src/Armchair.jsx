import React, { useRef, useEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from './context/Customization';
import * as THREE from 'three';

export function Armchair(props) {
  const { armchairMaterial, armchairSize } = useCustomization();
  const group = useRef();

  // Загружаем модель
  const { nodes, materials, scene } = useGLTF('./armchair.glb');

  // Конфигурация размеров для кресла
  const sizeConfig = {
    xs: { scale: 0.8, yPosition: 0 },
    s: { scale: 0.9, yPosition: 0 },
    m: { scale: 1.0, yPosition: 0 },
    l: { scale: 1.1, yPosition: 0 },
    xl: { scale: 1.2, yPosition: 0 },
  };

  // Текстуры с правильной настройкой
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

  // Создаем материалы с текстурами
  const materialsConfig = {
    Oak: materials.chair1 || new THREE.MeshStandardMaterial({ color: '#d4b896' }),
    Teak: new THREE.MeshStandardMaterial({
      map: wood1.map,
      normalMap: wood1.normalMap,
      roughnessMap: wood1.roughnessMap,
      aoMap: wood1.aoMap,
    }),
    Mahogany: new THREE.MeshStandardMaterial({
      map: wood2.map,
      normalMap: wood2.normalMap,
      roughnessMap: wood2.roughnessMap,
      aoMap: wood2.aoMap,
    }),
    Pine: new THREE.MeshStandardMaterial({
      map: wood3.map,
      normalMap: wood3.normalMap,
      roughnessMap: wood3.roughnessMap,
      aoMap: wood3.aoMap,
    }),
  };

  //*
  useEffect(() => {
    if (group.current) {
      console.log('=== ДЕБАГ: Все меши в модели кресла ===');
      group.current.traverse((child) => {
        if (child.isMesh) {
          console.log(
            'Меш:',
            child.name,
            'Позиция Y:',
            child.position.y.toFixed(2),
            'Размер:',
            child.scale.x.toFixed(2),
            child.scale.y.toFixed(2),
            child.scale.z.toFixed(2),
          );
        }
      });
    }
  }, []);
  //

  // Обновляем материалы при изменении armchairMaterial
  useEffect(() => {
    if (group.current) {
      const currentMaterial = materialsConfig[armchairMaterial] || materialsConfig.Oak;

      // Рекурсивно обходим все меши в группе и применяем материал
      group.current.traverse((child) => {
        if (child.isMesh) {
          // Клонируем материал чтобы избежать ссылочных проблем
          child.material = currentMaterial.clone();
        }
      });
    }
  }, [armchairMaterial]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        scale={sizeConfig[armchairSize].scale * 2}
        position={[0, sizeConfig[armchairSize].yPosition, 0]}
        rotation={[0, 0, 0]}
      >
        <primitive object={scene} castShadow receiveShadow />
      </group>
    </group>
  );
}
//
//
//ok/
