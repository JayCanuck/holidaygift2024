import useGift from '../../hooks/use-gift';
import LetterContent from '../common/LetterContent';
import Center from './Center';
import styles from './Letter.module.css';

interface LetterProps {
  visible: boolean;
}

const Letter: React.FC<LetterProps> = ({ visible }) => {
  const data = useGift();
  return (
    <Center className={styles.wrapper} style={{ zIndex: visible ? '1' : '-1' }}>
      <div className={styles.letter} style={{ opacity: visible ? '1' : '0' }}>
        <LetterContent data={data} />
      </div>
    </Center>
  );
};

export default Letter;
