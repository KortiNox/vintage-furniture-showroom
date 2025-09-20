import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { Model2 } from './Model2';
import { Armchair } from './Armchair';

function Scene() {
  return (
    <Canvas shadows camera={{ position: [5, 5, 45], fov: 85 }}>
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
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Тени */}
      <ContactShadows
        resolution={1024}
        position={[0, -0.8, 0]}
        opacity={0.5}
        scale={15}
        blur={1.5}
        far={1}
        color="#202020"
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

      {/* Модель двери - убрали дублирующие трансформации */}
      {/* <Model2 castShadow receiveShadow /> */}
      <Armchair castShadow receiveShadow />
      {/* Пол */}
      {/* Статичный пол */}
    </Canvas>
  );
}

export default Scene;
