import { CameraControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import PaperCrackle from '../common/PaperCrackle';
import Envelope from './Envelope';
import Letter from './Letter';
import Snow from './Snow';

const Scene: React.FC = () => {
  const crackle = useRef<HTMLAudioElement>(null);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const openEnvelopeHandler = useCallback(() => {
    setEnvelopeOpen(true);
    setTimeout(() => {
      if (!crackle.current?.muted) crackle.current?.play();
    }, 500);
  }, [setEnvelopeOpen]);

  const openLetterHandler = useCallback(() => {
    setShowLetter(true);
  }, [setShowLetter]);

  return (
    <>
      <PaperCrackle ref={crackle} />
      <Canvas>
        <PerspectiveCamera fov={45} aspect={1.0} near={0.1} far={1000.0} makeDefault />
        <CameraControls truckSpeed={0} dollySpeed={0} azimuthRotateSpeed={0.5} polarRotateSpeed={0.5} makeDefault />
        <Environment
          background // Enables the image as the background/skybox
          files={process.env.NEXT_PUBLIC_BACKGROUND}
        />
        <Suspense fallback={null}>
          <Snow />
          <Envelope open={envelopeOpen} onActivate={openEnvelopeHandler} onOpened={openLetterHandler} />
          <Letter visible={showLetter} />
          <ambientLight intensity={1} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Scene;
