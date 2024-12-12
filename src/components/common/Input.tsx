import { useCallback } from 'react';
import styles from './Input.module.css';

interface InputProps {
  value: string;
  onDown?: () => void;
  onOut?: () => void;
}
const Input: React.FC<InputProps> = ({ value, onDown, onOut }) => {
  const clickHandler = useCallback((ev: React.MouseEvent<HTMLInputElement>) => {
    const ele = ev.target as HTMLInputElement;
    // ele.select();
    if (navigator.clipboard) navigator.clipboard.writeText(ele.value);
  }, []);

  const down = () => {
    if (onDown) onDown();
  };

  const out = () => {
    if (onOut) onOut();
  };

  return (
    <input
      value={value}
      type='text'
      readOnly
      className={styles.code}
      onClick={clickHandler}
      onMouseDown={down}
      onTouchStart={down}
      onTouchEnd={out}
      onTouchCancel={out}
      onMouseLeave={out}
      onMouseUp={out}
    ></input>
  );
};

export default Input;
