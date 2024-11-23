import { FC, useEffect, useRef } from 'react';

import styles from '@/styles/page.module.css';
import { Word } from '@/types';
import { toEmoji } from '@/util';

import CreateNew from './CreateNew';

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isVisible) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isVisible]);

  return (
    <dialog ref={dialogRef} className={styles.gameWonWrapper}>
      <div className={styles.gameWonWrapperTop}>
        <h2>{isWin ? 'Great!' : 'You lost:('}</h2>
        <div>
          {previousGuesses.map((guess: Word[], i: number) => (
            <p key={i} className={styles.moveRow}>
              {guess.map(word => toEmoji(word)).join('')}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.gameWonWrapperBottom}>
        <p className={styles.gameWonSubheading}>
          You just {isWin ? 'won' : 'lost'} Customnections game #{gameId}
        </p>
        <div className={styles.gameWonButtonWrapper}>
          <CreateNew />
          <button className={styles.gameWonCloseButton} onClick={closeCallback}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default GameOverDialog;
