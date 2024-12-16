import { useMemo } from 'react';
import { GiftReponse } from '@/hooks/use-gift';
import styles3D from '../3d/LetterContent.module.css';
import stylesStatic from '../static/LetterContent.module.css';
import Input from './Input';

const defaultMessage = (games: unknown[] = []) =>
  `Here's a little surprise to add some fun to your day, ${games.length} random mystery Steam games! Redeem them and see what adventures await.`;

interface LetterContentProps {
  data: GiftReponse | null;
  onInputDown?: () => void;
  onInputOut?: () => void;
  mode: 'static' | '3d';
}

const LetterContent: React.FC<LetterContentProps> = ({ data, onInputDown, onInputOut, mode }) => {
  const styles = useMemo(() => (mode === '3d' ? styles3D : stylesStatic), [mode]);

  return (
    <>
      <div className={styles.content} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_LETTER})` }}>
        {data === null ? (
          <div className={styles.simple}>
            <div className={styles.message}>Happy holidays! ☃️</div>
          </div>
        ) : (
          <>
            {data.name && <div className={styles.recipient}>{data.name},</div>}
            <div
              className={styles.message}
              dangerouslySetInnerHTML={{
                __html: (data.message || defaultMessage(data.games)).replace(/\n/g, '<br />')
              }}
            />
            {data.games && data.games.length > 0 && (
              <div className={styles.center}>
                <div className={styles.games}>
                  {data.games.map((game, i) => (
                    <Input
                      key={`game-${i}`}
                      value={game.code}
                      onDown={onInputDown}
                      onOut={onInputOut}
                      mode={mode}
                      data-number={i + 1}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className={styles.message}>
              {data.footer || 'Hope you have a great holidays and a happy new year!'}
            </div>
          </>
        )}
        <div className={styles.signature}>-Jay</div>
      </div>
    </>
  );
};

export default LetterContent;
