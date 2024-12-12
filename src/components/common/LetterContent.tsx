import Input from './Input';
import styles from './LetterContent.module.css';

const defaultMessage = (games: unknown[] = []) =>
  `Here's a little gift to brighten your day, ${games.length} mystery Steam games.  Who knows what they could be? Redeem and see.`;

interface Game {
  name: string;
  code: string;
}

interface GiftReponse {
  name?: string;
  message?: string;
  games: Game[];
}

interface LetterContentProps {
  data: GiftReponse;
  onInputDown?: () => void;
  onInputOut?: () => void;
}

const LetterContent: React.FC<LetterContentProps> = ({ data, onInputDown, onInputOut }) => (
  <>
    <div className={styles.content} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_LETTER})` }}>
      {data.name && <div className={styles.recipient}>{data.name},</div>}
      <div className={styles.message}>{data.message || defaultMessage(data.games)}</div>
      {data.games && data.games.length > 0 && (
        <div className={styles.center}>
          <div className={styles.games}>
            {data.games.map((game, i) => (
              <Input key={`game-${i}`} value={game.code} onDown={onInputDown} onOut={onInputOut} />
            ))}
          </div>
        </div>
      )}
      <div className={styles.message}>Hope you have a great holidays and a happy new year!</div>
      <div className={styles.signature}>-Jay</div>
    </div>
  </>
);

export default LetterContent;
