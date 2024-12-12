import styles from './Center.module.css';

const Center: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => (
  <div className={`${styles.center} ${className || ''}`.trim()} {...rest} />
);

export default Center;
