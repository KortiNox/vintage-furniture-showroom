import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { Armchair } from '@/three/models/Armchair';
import { LampModel } from '@/three/models/Lamp';
import { Table1Model } from '@/three/models/Table1';
import { Table2Model } from '@/three/models/Table2';
import { Table3Model } from '@/three/models/Table3';
import Environment from '@/three/environment/Environment';
import Lights from '@/three/environment/Lights';
import Controls from '@/three/environment/Controls';

function Scene() {
  return (
    <Canvas shadows camera={{ position: [5, 5, 15], fov: 85 }}>
      <Environment />
      <Lights />

      {/* ОСНОВНАЯ ПЛОСКОСТЬ ДЛЯ ТЕНЕЙ С SHADOW MATERIAL */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={0.1} transparent color="#000000" />
      </mesh>

      {/* ДЕКОРАТИВНЫЙ ПОЛ (опционально, для лучшего визуала) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.001, 0]} // Чуть ниже плоскости теней
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* ДОПОЛНИТЕЛЬНЫЕ КОНТАКТНЫЕ ТЕНИ для мягкости */}
      <ContactShadows
        resolution={1024}
        position={[0, -0.99, 0]}
        opacity={0.2}
        scale={20}
        blur={2}
        far={1.5}
        color="#000000"
        т
      />

      <Controls />

      {/* Модели с тенями - УБЕДИТЕСЬ что все имеют castShadow и receiveShadow */}
      <Armchair castShadow receiveShadow />
      <LampModel castShadow receiveShadow />
      <Table1Model castShadow receiveShadow />
      <Table2Model castShadow receiveShadow />
      <Table3Model castShadow receiveShadow />
    </Canvas>
  );
}

export default Scene;
