import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from '@/state/customizationStore';
import * as THREE from 'three';

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

  const { nodes, materials, scene } = useGLTF('./armchair2.glb');

  const woodTexturePaths = useMemo(
    () =>
      Object.values(WOOD_TEXTURES).flatMap((path) => [
        path,
        path.replace('basecolor', 'normal'),
        path.replace('basecolor', 'roughness'),
      ]),
    []
  );

  const woodTextures = useTexture(woodTexturePaths);

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

  const handleClick = (event) => {
    event.stopPropagation();
    setIsSelected(!isSelected);
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
      } else {
        setSelectedModel(null);
      }
    }
  };

  const handleDoubleClick = (event) => {
    event.stopPropagation();
  };

  const handlePointerEnter = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    document.body.style.cursor = 'default';
  };

  useEffect(() => {
    if (!group.current || Object.keys(backMaterials).length === 0) return;

    const legMaterial = legMaterialsConfig[armchairMaterial] || legMaterialsConfig.Wood;
    const backMaterial = backMaterials[armchairBackMaterial] || backMaterials.Black;

    group.current.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'chairlegs_low001_chair1_0001') {
          child.material = legMaterial;
        } else if (child.name === 'chairlegs_low001_chair1_0') {
          child.material = backMaterial;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [armchairMaterial, armchairBackMaterial, legMaterialsConfig, backMaterials]);

  useEffect(() => {
    if (!group.current) return;
    group.current.traverse((child) => {
      if (child.isMesh) {
        if (isSelected) {
          child.material.emissive = new THREE.Color(0x333333);
          child.material.emissiveIntensity = 0.1;
        } else {
          child.material.emissive = new THREE.Color(0x000000);
          child.material.emissiveIntensity = 0;
        }
      }
    });
  }, [isSelected]);

  useEffect(() => {
    if (!scene) {
      setError('Модель кресла не загрузилась');
    } else {
      setError(null);
    }
  }, [scene]);

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
            self.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
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

useGLTF.preload('./armchair2.glb');


