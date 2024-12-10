import { CameraControls, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

const Viewer: React.FC = () => {
  return (
    <Canvas>
      <PerspectiveCamera fov={45} aspect={1.0} near={0.1} far={1000.0} makeDefault />
      <CameraControls truckSpeed={0} dollySpeed={0} azimuthRotateSpeed={0.5} polarRotateSpeed={0.5} makeDefault />
      <Environment
        background // Enables the image as the background/skybox
        files={process.env.NEXT_PUBLIC_BACKGROUND}
      />
      <Scene />
    </Canvas>
  );
};

export default Viewer;
