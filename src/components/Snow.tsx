import { useAnimations, useGLTF } from '@react-three/drei';
import { useLayoutEffect, useMemo } from 'react';
import { Mesh } from 'three';

const Snow: React.FC = () => {
  const { scene: snowFull, animations: snowAnimations } = useGLTF('./falling-snow.glb');
  const snow = useMemo(() => {
    if (snowFull) {
      snowFull.traverse(child => {
        if ((child as Mesh).isMesh) {
          child.scale.set(0.3, 0.3, 0.3);
        }
      });
    }
    return snowFull;
  }, [snowFull]);
  const snow2 = useMemo(() => (snow ? snow.clone() : snow), [snow]);
  const { actions: snowActions } = useAnimations(snowAnimations, snow);
  const { actions: snowActions2 } = useAnimations(snowAnimations, snow2);

  useLayoutEffect(() => {
    snowActions['Animation']!.timeScale = 0.3;
    snowActions['Animation']!.reset().fadeIn(0.5).play();
  }, [snowActions]);

  useLayoutEffect(() => {
    snowActions2['Animation']!.timeScale = 0.3;
    snowActions2['Animation']!.reset().fadeIn(0.5).play();
  }, [snowActions2]);

  return (
    <>
      <primitive object={snow} position={[0, -2, -3]} />
      <primitive object={snow2} position={[0, -2, 3]} />
    </>
  );
};

export default Snow;
