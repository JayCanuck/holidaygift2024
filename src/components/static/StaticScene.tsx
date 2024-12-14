import { useCallback, useRef, useState } from 'react';
import Snowfall from 'react-snowfall';
import PaperCrackle from '../common/PaperCrackle';
import Center from './Center';
import Envelope from './Envelope';
import Letter from './Letter';
import Notice from './Notice';
import styles from './StaticScene.module.css';

interface StaticSceneProps {}

const StaticScene: React.FC<StaticSceneProps> = () => {
  const [open, setOpen] = useState(false);
  const crackle = useRef<HTMLAudioElement>(null);

  const openHandler = useCallback(() => {
    setTimeout(() => {
      setOpen(true);
    }, 500);
    crackle.current?.play();
  }, [setOpen]);

  return (
    <div className={styles.scene} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKGROUND_LOW})` }}>
      <Snowfall color='rgba(255,255,255, 0.5)' />
      <Center>
        <Envelope open={open} onOpened={openHandler} />
      </Center>
      <Letter visible={open} />
      {/*<Notice />*/}
      <PaperCrackle ref={crackle} />
    </div>
  );
};

export default StaticScene;
