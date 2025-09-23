import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from './context/Customization';
import * as THREE from 'three';

export function Armchair(props) {
  const { armchairMaterial, armchairSize, armchairBackMaterial } = useCustomization();
  const group = useRef();
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Загружаем модель
  const { nodes, materials, scene } = useGLTF('./armchair2.glb');

  // Конфигурация размеров для кресла
  const sizeConfig = {
    xs: { scale: 0.8, yPosition: 0 },
    s: { scale: 0.9, yPosition: 0 },
    m: { scale: 1.0, yPosition: 0 },
    l: { scale: 1.1, yPosition: 0 },
    xl: { scale: 1.2, yPosition: 0 },
  };

  // Текстуры для ножек
  const wood1 = useTexture({
    map: './wood_textures/Wood_022_SD/Wood_022_basecolor.jpg',
    normalMap: './wood_textures/Wood_022_SD/Wood_022_normal.jpg',
    roughnessMap: './wood_textures/Wood_022_SD/Wood_022_roughness.jpg',
  });

  const wood2 = useTexture({
    map: './wood_textures/Wood_024_SD/Wood_024_basecolor.jpg',
    normalMap: './wood_textures/Wood_024_SD/Wood_024_normal.jpg',
    roughnessMap: './wood_textures/Wood_024_SD/Wood_024_roughness.jpg',
  });

  const wood3 = useTexture({
    map: './wood_textures/Wood_027_SD/Wood_027_basecolor.jpg',
    normalMap: './wood_textures/Wood_027_SD/Wood_027_normal.jpg',
    roughnessMap: './wood_textures/Wood_027_SD/Wood_027_roughness.jpg',
  });

  // Настройка текстур
  useEffect(() => {
    [wood1, wood2, wood3].forEach((wood) => {
      Object.values(wood).forEach((texture) => {
        if (texture instanceof THREE.Texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(2, 2);
        }
      });
    });
  }, [wood1, wood2, wood3]);

  // Материалы для НОЖЕК
  const legMaterialsConfig = {
    Oak:
      materials.chair1 ||
      new THREE.MeshStandardMaterial({
        color: '#d4b896',
        roughness: 0.8,
        metalness: 0.2,
      }),
    Teak: new THREE.MeshStandardMaterial({
      map: wood1.map,
      normalMap: wood1.normalMap,
      roughnessMap: wood1.roughnessMap,
      roughness: 0.7,
      metalness: 0.1,
    }),
    Mahogany: new THREE.MeshStandardMaterial({
      map: wood2.map,
      normalMap: wood2.normalMap,
      roughnessMap: wood2.roughnessMap,
      roughness: 0.6,
      metalness: 0.3,
    }),
    Pine: new THREE.MeshStandardMaterial({
      map: wood3.map,
      normalMap: wood3.normalMap,
      roughnessMap: wood3.roughnessMap,
      roughness: 0.9,
      metalness: 0.1,
    }),
  };

  // Материалы для СПИНКИ - создаем заранее
  const [backMaterials, setBackMaterials] = useState({});

  // Создаем материалы для спинки при загрузке модели
  useEffect(() => {
    if (materials.chair1 && Object.keys(backMaterials).length === 0) {
      console.log('🔄 Создаем материалы для спинки на основе:', materials.chair1);

      const baseMaterial = materials.chair1;

      const newBackMaterials = {
        Black: baseMaterial.clone(),
        White: baseMaterial.clone(),
        Gray: baseMaterial.clone(),
        Brown: baseMaterial.clone(),
        Beige: baseMaterial.clone(),
      };

      // Настраиваем цвета для каждого материала
      newBackMaterials.White.color.set('#ffffff');
      newBackMaterials.White.roughness = 0.0;
      newBackMaterials.White.metalness = -2.05;

      newBackMaterials.Gray.color.set('#ff0000');
      newBackMaterials.Gray.roughness = 0.7;
      newBackMaterials.Gray.metalness = 2.0;

      newBackMaterials.Brown.color.set('#8B4513');
      newBackMaterials.Brown.roughness = 0.6;
      newBackMaterials.Brown.metalness = 0.2;

      newBackMaterials.Beige.color.set('#F5F5DC');
      newBackMaterials.Beige.roughness = 0.8;
      newBackMaterials.Beige.metalness = 0.1;

      // Черный оставляем как есть (оригинальный)
      newBackMaterials.Black.color.set('#2c2c2c');
      newBackMaterials.Black.roughness = 0.9;
      newBackMaterials.Black.metalness = 0.1;

      setBackMaterials(newBackMaterials);
      console.log('✅ Материалы спинки созданы:', newBackMaterials);
    }
  }, [materials.chair1, backMaterials]);

  // Дебаг информации
  useEffect(() => {
    if (group.current && !isModelLoaded) {
      console.log('=== ДЕБАГ: Все меши в модели кресла ===');
      group.current.traverse((child) => {
        if (child.isMesh) {
          console.log('🔹 Меш:', child.name, '| Материал:', child.material?.name);
        }
      });
      setIsModelLoaded(true);
    }
  }, [isModelLoaded]);

  // Управление материалами
  useEffect(() => {
    if (group.current && isModelLoaded && Object.keys(backMaterials).length > 0) {
      console.log(
        '🔄 Обновление материалов. Ножки:',
        armchairMaterial,
        'Спинка:',
        armchairBackMaterial,
      );

      const legMaterial = legMaterialsConfig[armchairMaterial] || legMaterialsConfig.Oak;
      const backMaterial = backMaterials[armchairBackMaterial] || backMaterials.Black;

      group.current.traverse((child) => {
        if (child.isMesh) {
          // Для НОЖЕК (chairlegs_low001_chair1_0001)
          if (child.name === 'chairlegs_low001_chair1_0001') {
            console.log('✅ Применяем материал к НОЖКАМ:', child.name);
            child.material = legMaterial;
          }
          // Для СПИНКИ (chairlegs_low001_chair1_0)
          else if (child.name === 'chairlegs_low001_chair1_0') {
            console.log(
              '🪑 Применяем материал к СПИНКЕ:',
              child.name,
              'Цвет:',
              backMaterial.color.getStyle(),
            );
            child.material = backMaterial;
          }
        }
      });
    }
  }, [armchairMaterial, armchairBackMaterial, isModelLoaded, backMaterials]);

  // Применяем начальные материалы после загрузки модели
  useEffect(() => {
    if (scene && !isModelLoaded) {
      const timer = setTimeout(() => {
        setIsModelLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [scene, isModelLoaded]);

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

useGLTF.preload('./armchair2.glb');
