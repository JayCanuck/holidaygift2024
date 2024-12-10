import { useDetectGPU } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';
import { Suspense, useCallback, useState } from 'react';
import Envelope from './Envelope';
import Letter from './Letter';
import Snow from './Snow';

interface SceneProps {
  isLow: boolean;
}

const Scene: React.FC<SceneProps> = ({ isLow }) => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  console.log({ isLow });

  const openEnvelopeHandler = useCallback(() => {
    setEnvelopeOpen(true);
  }, [setEnvelopeOpen]);

  const closeHandler = useCallback(() => {
    setEnvelopeOpen(false);
    setShowLetter(false);
  }, [setEnvelopeOpen]);

  const openLetterHandler = useCallback(() => {
    setShowLetter(true);
  }, [setShowLetter]);

  return (
    <Suspense fallback={null}>
      <Snow isLow={isLow} />
      <Envelope open={envelopeOpen} onActivate={openEnvelopeHandler} onOpened={openLetterHandler} />
      <Letter visible={showLetter} onClose={closeHandler} isLow={isLow} />
      <ambientLight intensity={1} />
    </Suspense>
  );
};

export default Scene;
