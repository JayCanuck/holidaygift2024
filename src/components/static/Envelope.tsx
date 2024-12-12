/* eslint-disable @next/next/no-img-element */
import { useCallback } from 'react';
import styles from './Envelope.module.css';

interface EnvelopeProps {
  open: boolean;
  onOpened: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ open, onOpened }) => {
  const handleClick = useCallback(() => {
    if (!open) {
      onOpened();
    }
  }, [open, onOpened]);

  return (
    <img
      src={process.env.NEXT_PUBLIC_ENVELOPE_LOW}
      alt='Envelope'
      className={`${styles.envelope} ${!open ? styles.animated : ''}`.trim()}
      style={{ cursor: !open ? 'pointer' : 'auto' }}
      draggable='false'
      onClick={handleClick}
    />
  );
};

export default Envelope;
