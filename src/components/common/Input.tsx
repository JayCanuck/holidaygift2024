import { useCallback, useMemo } from 'react';
import styles3D from '../3d/Input.module.css';
import stylesStatic from '../static/Input.module.css';

interface InputProps {
  value: string;
  onDown?: () => void;
  onOut?: () => void;
  mode: '3d' | 'static';
}
const Input: React.FC<InputProps> = ({ value, onDown, onOut, mode }) => {
  const styles = useMemo(() => (mode === '3d' ? styles3D : stylesStatic), [mode]);
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
