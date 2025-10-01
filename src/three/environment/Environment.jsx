import { Environment as DreiEnvironment } from '@react-three/drei';

export function Environment() {
  return (
    <DreiEnvironment
      files="/textures/old_hall_1k.exr"
      background
      environmentIntensity={0.8}
      scale={2.1}
      height={-22}
      blur={0}
      azimuth={45}
      bgIntensity={0.5}
      ground={{ height: 30, radius: 120, scale: 150 }}
    />
  );
}

export default Environment;

