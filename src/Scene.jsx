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

            {/* ЗАПОЛНЯЮЩИЙ СВЕТ СЗАДИ - Directional Light */}
            <directionalLight
        position={[-5, 5, -10]} // Позиция сзади и слева
        intensity={5.3} // Низкая интенсивность для мягкого заполнения
        color="e8d930" // Легкий голубой оттенок для атмосферности
        castShadow={false} // Обычно заполняющий свет не отбрасывает тени
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

      
      {/* <Model2 castShadow receiveShadow /> */}
      <Armchair castShadow receiveShadow />
      <LampModel castShadow receiveShadow/> 
      <Table1Model castShadow receiveShadow /> 
      <Table2Model/>
      <Table3Model/>
      {/* Пол */}
      {/* Статичный пол */}
    </Canvas>
  );
}

export default Scene;
