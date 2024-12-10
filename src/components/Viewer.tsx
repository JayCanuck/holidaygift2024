import { CameraControls, Environment, OrbitControls, PerspectiveCamera, useDetectGPU } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import Scene from './Scene';

const Viewer: React.FC = () => {
  const gpuTier = useDetectGPU();
  console.log(gpuTier);
  const isLow = useMemo(() => Boolean(gpuTier.tier <= 1 || gpuTier.isMobile), [gpuTier]);
  const bg = useMemo(
    () => (isLow ? process.env.NEXT_PUBLIC_BACKGROUND_LOW : process.env.NEXT_PUBLIC_BACKGROUND),
    [isLow]
  );
  console.log(bg);
  return (
    <>
      <Canvas>
        <PerspectiveCamera fov={45} aspect={1.0} near={0.1} far={1000.0} makeDefault />
        <CameraControls
          truckSpeed={0}
          dollySpeed={0}
          azimuthRotateSpeed={0.5}
          polarRotateSpeed={0.5}
          enabled={!isLow}
          makeDefault
        />
        <Environment
          background // Enables the image as the background/skybox
          files={bg}
        />
        <Scene isLow={isLow} />
      </Canvas>
      {isLow && (
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            textAlign: 'center',
            fontSize: 'max(2vh, 26px)',
            padding: 'max(1vh, 10px) 0',
            backgroundColor: 'rgba(255,255,255, 0.8)'
          }}
        >
          This website is best viewed on desktop 😄
        </div>
      )}
    </>
  );
};

const WrappedViewer = () => (
  <Suspense fallback={null}>
    <Viewer />
  </Suspense>
);

export default WrappedViewer;
