import { OrbitControls } from '@react-three/drei';

export function Controls() {
  return (
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
  );
}

export default Controls;

