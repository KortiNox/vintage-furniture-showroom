import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { Armchair } from './Armchair';
import { LampModel } from './Lamp';
import { Table1Model } from './Table1';
import { Table2Model } from './Table2';
import { Table3Model } from './Table3';

function Scene() {
  return (
    <Canvas shadows camera={{ position: [5, 5, 15], fov: 85 }}>
      {/* Environment как фон */}
      <Environment
        files="/textures/old_hall_1k.exr"
        background
        environmentIntensity={0.8}
        scale={2.1}
        height={-22}
        blur={0}
        azimuth={45}
        bgIntensity={0.5}
        ground={{
          height: 30,
          radius: 120,
          scale: 150,
        }}
      />

      {/* Освещение */}
      <ambientLight intensity={0.3} />

      {/* ОСНОВНОЙ НАПРАВЛЕННЫЙ СВЕТ - главный для теней */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001} // Помогает убрать артефакты теней
      />

      {/* Дополнительный направленный свет */}

      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* ЗАПОЛНЯЮЩИЙ СВЕТ СЗАДИ */}
      <directionalLight
        position={[-5, 5, -10]}
        intensity={0.1}
        color="#e8d930"
        castShadow={false}
      />

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

      {/* Элементы управления */}
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2 - 0.1}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={13}
        maxDistance={50}
      />

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
