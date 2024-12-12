import { useDetectGPU } from '@react-three/drei';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { Suspense, useMemo } from 'react';
import Scene from './3d/Scene';
import Music from './common/Music';
import StaticScene from './static/StaticScene';

const Viewer: React.FC = () => {
  const [lowParam] = useQueryState('low', parseAsBoolean);
  const gpuTier = useDetectGPU();
  const isLow = useMemo(
    () => Boolean(lowParam || gpuTier.tier <= 1 || gpuTier.isMobile),
    [gpuTier.isMobile, gpuTier.tier, lowParam]
  );
  console.log(gpuTier);

  return (
    <>
      {isLow ? (
        <div>
          <StaticScene />
        </div>
      ) : (
        <Scene />
      )}
      <Music />
    </>
  );
};

const WrappedViewer = () => (
  <Suspense fallback={null}>
    <Viewer />
  </Suspense>
);

export default WrappedViewer;