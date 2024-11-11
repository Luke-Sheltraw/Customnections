import { FC } from 'react';
import styles from 'app/styles/page.module.css';
import CreateNew from './CreateNew';
import { Word, WordGroup } from '../types';
import { toEmoji } from '../util';

type GameOverDialogProps = {
  isWin: boolean;
  isVisible: boolean;
  previousGuesses: Word[][];
  gameId: string;
  closeCallback: () => void;
};

const GameOverDialog: FC<GameOverDialogProps> = ({
  isWin,
  isVisible,
  previousGuesses,
  gameId,
  closeCallback,
}) => {
  return (
    isVisible && (
      <div className={styles.gameWonWrapper}>
        <button
          className={styles.closePopupButton}
          onClick={() => closeCallback()}
        >
          ×
        </button>
        <h2 className={styles.gameWonMsg}>{isWin ? 'Great!' : 'You lost:('}</h2>
        <p className={styles.gameWonSubheading}>Connections #{gameId}</p>
        <div className={styles.movesWrapper}>
          {previousGuesses.map((guess: Word[], i: number) => (
            <p key={i} className={styles.moveRow}>
              {guess.map(word => toEmoji(word)).join('')}
            </p>
          ))}
        </div>
        <div className={styles.gameWonCreateNewWrapper}>
          <CreateNew />
        </div>
      </div>
    )
  );
};

export default GameOverDialog;
