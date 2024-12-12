import styles from './Notice.module.css';

const Notice: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.notice}>This website is best viewed on desktop 😄</div>
  </div>
);

export default Notice;
