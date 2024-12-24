import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import MuteButton from './MuteButton';

const Music: React.FC = () => {
  const ref = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  const handleMute = useCallback((value: boolean) => {
    window.localStorage.setItem('mute', JSON.stringify(value));

    document.querySelectorAll('audio').forEach(ele => {
      ele.muted = value;
    });

    setMuted(value);
  }, []);

  useEffect(() => {
    try {
      const value = window.localStorage.getItem('mute');
      if (value) {
        const parsed = JSON.parse(value);
        setMuted(parsed);
        document.querySelectorAll('audio').forEach(ele => {
          ele.muted = parsed;
        });
      }
    } catch (e) {
      console.error('failed to load mute state from localstorage', e);
    }

    const handleClick = () => {
      if (ref.current && !ref.current?.muted) {
        ref.current.play();
        ref.current.volume = 0.8;
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, []);

  const handleVolumeChange = (ev: SyntheticEvent<HTMLAudioElement>) => {
    if (!ev.currentTarget.muted && ev.currentTarget.paused) {
      ev.currentTarget.play();
      ev.currentTarget.volume = 0.8;
    }
  };

  return (
    <>
      <audio ref={ref} preload='auto' loop src='/holiday-homecoming.mp3' onVolumeChange={handleVolumeChange} />
      <MuteButton muted={muted} onChange={handleMute} />
    </>
  );
};

export default Music;
