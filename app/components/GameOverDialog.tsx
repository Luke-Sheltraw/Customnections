import { FC, useEffect, useRef } from 'react';

import styles from '@/styles/page.module.css';
import { Word } from '@/types';
import { toEmoji } from '@/util';

import { CreateNewButton } from './CreateNewButton';

type GameOverDialogProps = {
  isWin: boolean;
  isVisible: boolean;
  previousGuesses: Word[][];
  gameId: string;
  closeCallback: () => void;
};

export const GameOverDialog: FC<GameOverDialogProps> = ({
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
          {previousGuesses.map(guess => (
            <p key={guess[0].id} className={styles.moveRow}>
              {guess.map(toEmoji).join('')}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.gameWonWrapperBottom}>
        <p className={styles.gameWonSubheading}>
          You just {isWin ? 'won' : 'lost'} Customnections game #{gameId}
        </p>
        <div className={styles.gameWonButtonWrapper}>
          <CreateNewButton />
          <button className={styles.gameWonCloseButton} onClick={closeCallback}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
