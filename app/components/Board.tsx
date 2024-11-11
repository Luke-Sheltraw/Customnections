'use client';

import { useState, useRef, FC, useMemo } from 'react';
import styles from 'app/styles/page.module.css';
import Alert from './Alert';
import GameOverDialog from './GameOverDialog';
import { GameStatus, SerializableWordGroup, Word, WordGroup } from '../types';
import { Textfit } from 'react-textfit';
import {
  isOneAwayFromSharedParent,
  isSharedParentGroup,
  toCombinedWordList,
  toShuffledArray,
  toDeserializedWordGroups,
} from '../util';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const NUM_GUESSES = 4;
const ALERT_DELAY_MS = 2000;
const SUCCESSFUL_GUESS_ANIM_LEN_MS = 500;

type BoardProps = {
  wordGroups: SerializableWordGroup[];
  gameId: string;
};

const Board: FC<BoardProps> = ({ wordGroups, gameId }) => {
  const [mistakesRemaining, setMistakesRemaining] = useState(NUM_GUESSES);
  const [message, setMessage] = useState<string | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.IN_PROGRESS
  );
  const [showMistakeAnimation, setShowMistakeAnimation] = useState(false);
  const [foundWordGroups, setFoundWordGroups] = useState<WordGroup[]>([]);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [previousGuesses, setPreviousGuesses] = useState<Word[][]>([]);

  const deserializedWordGroups = useMemo(
    () => toDeserializedWordGroups(wordGroups),
    []
  );

  const remainingWordGroups = useMemo(
    () =>
      deserializedWordGroups.filter(
        wordGroup => !foundWordGroups.includes(wordGroup)
      ),
    [deserializedWordGroups, foundWordGroups]
  );

  const [shuffledWords, setShuffledWords] = useState<Word[]>(
    toShuffledArray(toCombinedWordList(remainingWordGroups))
  );

  const msgTimeout = useRef<number>();

  const triggerAlert = (msgText: string, permanent?: boolean) => {
    setMessage(msgText);
    clearTimeout(msgTimeout.current);
    if (!permanent) {
      setTimeout(() => setMessage(null), ALERT_DELAY_MS);
    }
  };

  const triggerMistakeAnimation = () => {
    setShowMistakeAnimation(false);
    setTimeout(() => setShowMistakeAnimation(true), 10);
  };

  const handleSuccessfulGuess = () => {
    setSelectedWords([]);

    const orderedGuess = shuffledWords.filter(word =>
      selectedWords.includes(word)
    );

    if (
      shuffledWords.slice(0, 4).every((word, i) => orderedGuess[i] === word)
    ) {
      setShuffledWords(words =>
        words.filter(word => !selectedWords.includes(word))
      );
      setFoundWordGroups(groups => [...groups, selectedWords[0].parentGroup]);
    } else {
      setShuffledWords([
        ...orderedGuess,
        ...shuffledWords.filter(word => !selectedWords.includes(word)),
      ]);

      setTimeout(() => {
        setShuffledWords(words => words.slice(4));
        setFoundWordGroups(groups => [...groups, selectedWords[0].parentGroup]);
        setSelectedWords([]);
      }, SUCCESSFUL_GUESS_ANIM_LEN_MS);
    }

    if (foundWordGroups.length === 3) {
      triggerAlert('You won!', true);
      setShowGameOver(true);
      setGameStatus(GameStatus.WON);
    }
  };

  const handleUnsuccessfulGuess = () => {
    setMistakesRemaining(mistakes => mistakes - 1);
    triggerMistakeAnimation();

    if (mistakesRemaining === 1) {
      triggerAlert('You lost :(', true);
      setGameStatus(GameStatus.LOST);
      setShowGameOver(true);
    } else if (isOneAwayFromSharedParent(selectedWords)) {
      triggerAlert('One away...');
    }
  };

  const handleGuess = () => {
    if (selectedWords.length !== 4) return;

    if (
      previousGuesses.some(guess =>
        guess.every(word => selectedWords.includes(word))
      )
    ) {
      triggerAlert('Already guessed!');
      return;
    }

    setPreviousGuesses(prevGuesses => [...prevGuesses, selectedWords]);

    if (isSharedParentGroup(selectedWords)) {
      handleSuccessfulGuess();
    } else {
      handleUnsuccessfulGuess();
    }
  };

  const shuffleRemainingWords = () => {
    setShuffledWords(toShuffledArray(toCombinedWordList(remainingWordGroups)));
  };

  const deselectAllWords = () => setSelectedWords([]);

  const handleWordClick = (word: Word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(words => words.filter(w => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords(words => [...words, word]);
    }
  };

  return (
    <div>
      <Alert message={message} />
      <GameOverDialog
        isWin={gameStatus === GameStatus.WON}
        isVisible={showGameOver}
        previousGuesses={previousGuesses}
        gameId={gameId}
        closeCallback={() => setShowGameOver(false)}
      />
      <div className={styles.pageCenter}>
        <p>Create four groups of four!</p>
        <div
          className={`${styles.wordContainer} ${
            showMistakeAnimation && styles.mistakeAnimation
          }`}
        >
          {foundWordGroups.map((group: WordGroup) => (
            <div
              className={`${styles.foundGroup} ${
                styles[`category${group.difficulty}`]
              }`}
              key={group.id}
            >
              <p className={styles.categoryDesc}>{group.desc}</p>
              <p className={styles.summaryWords}>
                {group.words.map(word => word.text).join(', ')}
              </p>
            </div>
          ))}
          {shuffledWords.map(word => (
            <motion.button
              key={word.id}
              className={`${styles.wordBox} ${
                selectedWords.includes(word)
                  ? styles.selected
                  : styles.unselected
              }`}
              onClick={() => handleWordClick(word)}
              disabled={gameStatus !== GameStatus.IN_PROGRESS}
              layout
              whileTap={{ scale: 1.1 }}
            >
              <div className={styles.wordPadding}>
                <Textfit mode="multi" className={styles.textfit}>
                  {word.text}
                </Textfit>
              </div>
            </motion.button>
          ))}
        </div>
        <div className={styles.remaining}>
          <p>Mistakes remaining:</p>
          <div className={styles.circleContainer}>
            {Array.from({ length: NUM_GUESSES }).map((_, i) => (
              <div
                key={i}
                className={
                  i < mistakesRemaining
                    ? styles.circleRemaining
                    : styles.circleUsed
                }
              ></div>
            ))}
          </div>
        </div>
        <div className={styles.buttonGroup}>
          {gameStatus === GameStatus.IN_PROGRESS ? (
            <>
              <button
                className={styles.secondaryButton}
                onClick={shuffleRemainingWords}
              >
                Shuffle
              </button>
              <button
                className={styles.secondaryButton}
                onClick={deselectAllWords}
              >
                Deselect All
              </button>
              <button className={styles.primaryButton} onClick={handleGuess}>
                Submit
              </button>
            </>
          ) : (
            <button
              className={styles.secondaryButton}
              onClick={() => setShowGameOver(true)}
              disabled={showGameOver}
            >
              View Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Board), {
  ssr: false,
});
