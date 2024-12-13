import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';
import { useCallback, useMemo } from 'react';
import { Vector3 } from 'three';
import useGift from '../../hooks/use-gift';
import useScreenWidth from '../../hooks/use-screen-width';
import LetterContent from '../common/LetterContent';
import styles from './Letter.module.css';

const scale = new Vector3(0.5, 0.5, 0.5);

interface LetterProps {
  visible: boolean;
}

const Letter: React.FC<LetterProps> = ({ visible }) => {
  const data = useGift();
  const screenWidth = useScreenWidth();
  const position = useMemo(() => {
    if (screenWidth >= 720) {
      return [0, 3, -25] as const;
    } else {
      return [0, 2.5, -20] as const;
    }
  }, [screenWidth]);
  const { controls } = useThree<{ controls: CameraControls }>();

  const disableControls = useCallback(() => {
    controls.enabled = false;
  }, [controls]);

  const enableControls = useCallback(() => {
    controls.enabled = true;
  }, [controls]);

  return (
    <Html
      transform
      position={position}
      style={{ userSelect: 'none' }}
      pointerEvents={visible ? 'auto' : 'none'}
      scale={scale}
    >
      <div
        className={styles.letter}
        style={{
          opacity: visible ? '1' : '0'
        }}
      >
        <LetterContent data={data} onInputDown={disableControls} onInputOut={enableControls} mode='3d' />
      </div>
    </Html>
  );
};

export default Letter;
