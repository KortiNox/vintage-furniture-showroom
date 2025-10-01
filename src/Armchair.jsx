import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from './context/Customization';
import * as THREE from 'three';

// Константы для конфигурации
const SIZE_CONFIG = {
  xs: { scale: 0.8, yPosition: 0 },
  s: { scale: 0.9, yPosition: 0 },
  m: { scale: 1.0, yPosition: 0 },
  l: { scale: 1.1, yPosition: 0 },
  xl: { scale: 1.2, yPosition: 0 },
};

const WOOD_TEXTURES = {
  Wood: './wood_textures/Wood_022_SD/Wood_022_basecolor.jpg',
  Copper: './wood_textures/Wood_024_SD/Wood_024_basecolor.jpg',
  Gold: './wood_textures/Wood_022_SD/Wood_022_basecolor.jpg',
  Bone: './wood_textures/Wood_027_SD/Wood_027_basecolor.jpg',
};

const BACK_MATERIAL_COLORS = {
  Black: { color: '#2c2c2c', roughness: 0.9, metalness: 0.1 },
  White: { color: '#ffffff', roughness: 0.0, metalness: -2.05 },
  Green: { color: '#98FB98', roughness: 1.1, metalness: 0.1 },
};

export function Armchair(props) {
  const { armchairMaterial, armchairSize, armchairBackMaterial, setSelectedModel } =
    useCustomization();

  const group = useRef();
  const [error, setError] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  // Загружаем модель
  const { nodes, materials, scene } = useGLTF('./armchair2.glb');

  // Оптимизированная загрузка текстур для дерева
  const woodTexturePaths = useMemo(
    () =>
      Object.values(WOOD_TEXTURES).flatMap((path) => [
        path, // basecolor
        path.replace('basecolor', 'normal'),
        path.replace('basecolor', 'roughness'),
      ]),
    []
  );

  const woodTextures = useTexture(woodTexturePaths);

  // Группируем текстуры по материалам
  const groupedTextures = useMemo(() => {
    const textures = {};
    const woodTypes = Object.keys(WOOD_TEXTURES);

    woodTypes.forEach((type, index) => {
      const startIdx = index * 3;
      textures[type] = {
        map: woodTextures[startIdx],
        normalMap: woodTextures[startIdx + 1],
        roughnessMap: woodTextures[startIdx + 2],
      };
    });

    return textures;
  }, [woodTextures]);

  // Настройка текстур
  useEffect(() => {
    Object.values(groupedTextures).forEach((textureGroup) => {
      Object.values(textureGroup).forEach((texture) => {
        if (texture instanceof THREE.Texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(2, 2);
        }
      });
    });
  }, [groupedTextures]);

  // Мемоизированные материалы для ножек
  const legMaterialsConfig = useMemo(() => {
    const config = {
      Wood:
        materials.chair1?.clone() ||
        new THREE.MeshStandardMaterial({
          color: '#d4b896',
          roughness: 0.8,
          metalness: 0.2,
        }),
      Copper: new THREE.MeshStandardMaterial({
        map: groupedTextures.Copper?.map,
        normalMap: groupedTextures.Copper.normalMap,
        roughnessMap: groupedTextures.Copper?.roughnessMap,
        roughness: 0.7,
        metalness: 2.1,
      }),
      Gold: new THREE.MeshStandardMaterial({
        map: groupedTextures.Gold?.map,
        normalMap: groupedTextures.Gold?.normalMap,
        roughnessMap: groupedTextures.Gold?.roughnessMap,
        roughness: 0.6,
        metalness: 2.3,
      }),
      Bone: new THREE.MeshStandardMaterial({
        map: groupedTextures.Bone?.map,
        normalMap: groupedTextures.Bone?.normalMap,
        roughnessMap: groupedTextures.Bone?.roughnessMap,
        roughness: 0.9,
        metalness: 0.1,
      }),
    };

    Object.values(config).forEach((material) => {
      if (material) {
        material.side = THREE.FrontSide;
      }
    });

    return config;
  }, [materials.chair1, groupedTextures]);

  // Оптимизированное создание материалов для спинки
  const backMaterials = useMemo(() => {
    if (!materials.chair1) return {};

    const baseMaterial = materials.chair1;
    const materialsMap = {};

    Object.entries(BACK_MATERIAL_COLORS).forEach(([name, config]) => {
      const material = baseMaterial.clone();
      material.color.set(config.color);
      material.roughness = config.roughness;
      material.metalness = config.metalness;
      material.side = THREE.FrontSide;

      materialsMap[name] = material;
    });

    return materialsMap;
  }, [materials.chair1]);

  // Обработчик клика по модели
  const handleClick = (event) => {
    event.stopPropagation(); // Предотвращаем всплытие

    setIsSelected(!isSelected);

    // Сообщаем контексту о выбранной модели
    if (setSelectedModel) {
      if (!isSelected) {
        setSelectedModel({
          type: 'armchair',
          id: 'armchair-1',
          name: 'Vintage Armchair',
          configuration: {
            size: armchairSize,
            legsMaterial: armchairMaterial,
            backMaterial: armchairBackMaterial,
          },
        });
        console.log('✅ Кресло выбрано');
      } else {
        setSelectedModel(null);
        console.log('❌ Выбор кресла сброшен');
      }
    }
  };

  // Обработчик двойного клика (опционально)
  const handleDoubleClick = (event) => {
    event.stopPropagation();
    console.log('🎯 Двойной клик по креслу');
    // Можно добавить дополнительные действия при двойном клике
  };

  // Обработчик наведения (опционально)
  const handlePointerEnter = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    document.body.style.cursor = 'default';
  };

  // Единый эффект для применения материалов
  useEffect(() => {
    if (!group.current || Object.keys(backMaterials).length === 0) return;

    const legMaterial = legMaterialsConfig[armchairMaterial] || legMaterialsConfig.Wood;
    const backMaterial = backMaterials[armchairBackMaterial] || backMaterials.Black;

    let legsApplied = false;
    let backApplied = false;

    group.current.traverse((child) => {
      if (child.isMesh) {
        // Для НОЖЕК (chairlegs_low001_chair1_0001)
        if (child.name === 'chairlegs_low001_chair1_0001') {
          child.material = legMaterial;
          legsApplied = true;
        }
        // Для СПИНКИ (chairlegs_low001_chair1_0)
        else if (child.name === 'chairlegs_low001_chair1_0') {
          child.material = backMaterial;
          backApplied = true;
        }

        // Гарантируем правильные настройки теней
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Дебаг информация в development
    {
      console.log('🔄 Материалы применены:', {
        legs: { material: armchairMaterial, applied: legsApplied },
        back: { material: armchairBackMaterial, applied: backApplied },
      });
    }
  }, [armchairMaterial, armchairBackMaterial, legMaterialsConfig, backMaterials]);

  // Эффект для визуального выделения выбранной модели
  useEffect(() => {
    if (!group.current) return;

    group.current.traverse((child) => {
      if (child.isMesh) {
        // Добавляем или убираем выделение
        if (isSelected) {
          // Можно добавить визуальное выделение (например, контур)
          child.material.emissive = new THREE.Color(0x333333);
          child.material.emissiveIntensity = 0.1;
        } else {
          // Убираем выделение
          child.material.emissive = new THREE.Color(0x000000);
          child.material.emissiveIntensity = 0;
        }
      }
    });
  }, [isSelected]);

  // Обработка ошибок загрузки модели
  useEffect(() => {
    if (!scene) {
      setError('Модель кресла не загрузилась');
      console.error('❌ Ошибка загрузки модели armchair2.glb');
    } else {
      setError(null);
    }
  }, [scene]);

  // Fallback при ошибке
  if (error) {
    return (
      <group {...props}>
        <mesh
          castShadow
          receiveShadow
          onClick={handleClick}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <boxGeometry args={[1, 1.5, 1]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow onClick={handleClick}>
          <boxGeometry args={[1.2, 0.1, 1.2]} />
          <meshStandardMaterial color="#4ecdc4" roughness={0.6} />
        </mesh>
      </group>
    );
  }

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <group
        scale={SIZE_CONFIG[armchairSize].scale * 2}
        position={[0, SIZE_CONFIG[armchairSize].yPosition, 0]}
        rotation={[0, 0, 0]}
      >
        <primitive
          object={scene}
          castShadow
          receiveShadow
          onUpdate={(self) => {
            // Дополнительная настройка теней для всех мешей
            self.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                // Оптимизация для больших моделей
                if (child.geometry) {
                  child.geometry.computeVertexNormals();
                }
              }
            });
          }}
        />
      </group>
    </group>
  );
}

// Предзагрузка модели для лучшей производительности
useGLTF.preload('./armchair2.glb');
