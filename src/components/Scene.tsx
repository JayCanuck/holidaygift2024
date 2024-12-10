import { useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';
import { Suspense, useCallback, useState } from 'react';
import Envelope from './Envelope';
import Letter from './Letter';
import Snow from './Snow';

const Scene: React.FC = () => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

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
      <Snow />
      <Envelope open={envelopeOpen} onActivate={openEnvelopeHandler} onOpened={openLetterHandler} />
      <Letter visible={showLetter} onClose={closeHandler} />
      <ambientLight intensity={1} />
    </Suspense>
  );
};

export default Scene;
