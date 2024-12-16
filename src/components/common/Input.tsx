import { enqueueSnackbar } from 'notistack';
import { useCallback, useMemo } from 'react';
import styles3D from '../3d/Input.module.css';
import stylesStatic from '../static/Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onDown?: () => void;
  onOut?: () => void;
  mode: '3d' | 'static';
}
const Input: React.FC<InputProps> = ({ value, onDown, onOut, mode, ...rest }) => {
  const styles = useMemo(() => (mode === '3d' ? styles3D : stylesStatic), [mode]);
  const clickHandler = useCallback(async (ev: React.MouseEvent<HTMLInputElement>) => {
    const ele = ev.target as HTMLInputElement;
    const hasSelection = ele.selectionStart !== ele.selectionEnd;

    if (!hasSelection && navigator.clipboard) {
      await navigator.clipboard.writeText(ele.value);
      const message =
        ele.dataset.number !== undefined
          ? `Game code #${ele.dataset.number} copied to clipboard`
          : 'Game code copied to clipboard';
      enqueueSnackbar({ message, autoHideDuration: 3000, preventDuplicate: true });
    }
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
      {...rest}
    ></input>
  );
};

export default Input;
