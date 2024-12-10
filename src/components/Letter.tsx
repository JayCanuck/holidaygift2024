/* eslint-disable @next/next/no-img-element */
import { Html, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useQuery } from '@tanstack/react-query';
import CameraControls from 'camera-controls';
import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Input from './Input';
import styles from './Letter.module.css';

const defaultMessage = (games: unknown[] = []) =>
  `Here's a little gift to brighten your day, ${games.length} mystery Steam games.  Who knows what they could be? Redeem and see.`;

interface Game {
  name: string;
  code: string;
}

interface GiftReponse {
  name?: string;
  message?: string;
  games: Game[];
}

interface LetterProps {
  visible: boolean;
  onClose: () => void;
}

const Letter: React.FC<LetterProps> = ({ visible, onClose }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const position = useMemo(() => {
    if (screenWidth >= 720) {
      return [0, 3, -25] as const;
    } else {
      return [0, 2.5, -20] as const;
    }
  }, [screenWidth]);
  const { controls } = useThree<{ controls: CameraControls }>();
  const [idParam] = useQueryState('id');
  const id = useMemo(() => (idParam === '0' ? '00000000-0000-0000-0000-000000000000' : idParam), [idParam]);
  const { data } = useQuery({
    queryKey: [],
    queryFn: () => fetch(`/api/games?id=${id || ''}`).then(res => res.json() as Promise<GiftReponse>),
    initialData: { games: [] },
    enabled: Boolean(id)
  });
  const clickHandler = useCallback(() => {
    onClose();
  }, [onClose]);

  const disableControls = useCallback(() => {
    controls.enabled = false;
  }, [controls]);

  const enableControls = useCallback(() => {
    controls.enabled = true;
  }, [controls]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Html transform position={position} style={{ userSelect: 'none' }}>
      <div
        className={styles.letter}
        style={{
          display: visible ? 'block' : 'none',
          opacity: visible ? '1' : '0'
        }}
        onMouseDown={disableControls}
        onTouchStart={disableControls}
        onMouseUp={enableControls}
        onTouchEnd={enableControls}
      >
        <img src={process.env.NEXT_PUBLIC_LETTER} className={styles.background} alt='letter background' />
        <div className={styles.content}>
          {/*<div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }} />
            <div>
              <button onClick={clickHandler}>X</button>
            </div>
          </div>*/}
          {data.name && <div className={styles.recipient}>{data.name},</div>}
          <div className={styles.message}>{data.message || defaultMessage(data.games)}</div>
          {data.games && data.games.length > 0 && (
            <div className={styles.center}>
              <div className={styles.games}>
                {data.games.map((game, i) => (
                  <Input key={`game-${i}`} value={game.code} />
                ))}
              </div>
            </div>
          )}
          <div className={styles.message}>Hope you have a great holidays and a happy new year!</div>
          <div className={styles.signature}>-Jay</div>
        </div>
      </div>
    </Html>
  );
};

export default Letter;
