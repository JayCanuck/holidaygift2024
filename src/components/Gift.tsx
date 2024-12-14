import { useDetectGPU } from '@react-three/drei';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { Suspense, useMemo } from 'react';
import Scene from './3d/Scene';
import Music from './common/Music';
import StaticScene from './static/StaticScene';

const Viewer: React.FC = () => {
  const [lowParam] = useQueryState('low', parseAsBoolean);
  const [highParam] = useQueryState('high', parseAsBoolean);
  const gpuTier = useDetectGPU();
  const isLow = useMemo(
    () => Boolean((lowParam || gpuTier.tier <= 1 || gpuTier.isMobile) && !highParam),
    [gpuTier.isMobile, gpuTier.tier, highParam, lowParam]
  );
  console.log('GPU', gpuTier);

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
