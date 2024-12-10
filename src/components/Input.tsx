import { useCallback } from 'react';
import styles from './Input.module.css';

interface InputProps {
  value: string;
}
const Input: React.FC<InputProps> = ({ value }) => {
  const clickHandler = useCallback((ev: React.MouseEvent<HTMLInputElement>) => {
    const ele = ev.target as HTMLInputElement;
    ele.select();
    navigator.clipboard.writeText(ele.value);
  }, []);

  return <input value={value} type='text' readOnly className={styles.code} onClick={clickHandler}></input>;
};

export default Input;
