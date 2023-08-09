'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from 'app/styles/page.module.css';
import Alert from './Alert';
import { type GROUP } from './../consts';
import { Textfit } from 'react-textfit';

const NUM_GUESSES: number = 4;
const ALERT_DELAY_MS: number = 2000;

const shuffleWords = (toShuffle: string[][]): string[] => {
  if (toShuffle.length === 0) return [];
	const allTogether: string[] = toShuffle.reduce((prev, cur) => [...prev, ...cur]);
	for (let i = allTogether.length - 1; i > 0; i -= 1) {
		const j: number = Math.floor(Math.random() * (i + 1));
		[allTogether[i], allTogether[j]] = [allTogether[j], allTogether[i]];
	}
	return allTogether;
};

const Board = ({ game }: { game: GROUP[] }) => {
  const [activeWords, setActiveWords] = useState<string[][]>(game.map((item) => item.words));
  const [foundGroups, setFoundGroups] = useState<GROUP[]>([]);
	const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [mistakesRemaining, setMistakesRemaining] = useState<number>(NUM_GUESSES);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const msgTimeout = useRef<number>();
  const previousGuesses = useRef<string[][]>([])

  const getGroupObjFromWord = (word: string): GROUP => {
    for (let i = 0; i < game.length; i += 1) {
      if (game[i].words.includes(word)) return game[i];
    }
    throw new Error('Non-original word passed to search func');
  }

  const showAlert = (msgText: string, permanent?: boolean) => {
    setMsg(msgText);
    setShowMsg(true);
    clearTimeout(msgTimeout.current);
    if (!permanent) {
      setTimeout(() => setShowMsg(false), ALERT_DELAY_MS);
    }
  }

  const shuffle = useCallback(() => {
    setShuffledWords(shuffleWords(activeWords));
  }, [activeWords]);

  useEffect(() => {
    shuffle();
  }, [shuffle]);

  useEffect(() => {
    if (activeWords.length === 0) {
      showAlert('You won!', true);
      setGameOver(true);
    }
  }, [activeWords]);

  useEffect(() => {
    if (mistakesRemaining <= 0) {
      showAlert('You lost :(', true);
      setGameOver(true);
    }
  }, [mistakesRemaining]);

  const groupOf = (word: string): number => {
    for (let i = 0; i < activeWords.length; i += 1) {
      if (activeWords[i].includes(word)) return i;
    }
    return -1;
  }

  const handleClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords((words: string[]) => words.filter((w) => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords((words: string[]) => [...words, word]);
    }
  };

  const deselectAll = () => {
    setSelectedWords([]);
  };

  const previouslyGuessed = (words: string[]): boolean => {
    return previousGuesses.current.some((guess) =>
      guess.toString() === words.sort().toString()
    );
  };

  const submit = () => {
    if (selectedWords.length !== 4) return;
    const targetGroupIndex = groupOf(selectedWords[0]);
    if (selectedWords.every((word) => groupOf(word) === targetGroupIndex)) {
      setActiveWords(activeWords.filter((_, i) => i !== targetGroupIndex));
      setFoundGroups((groups) => [...groups, getGroupObjFromWord(selectedWords[0])]);
      setSelectedWords([]);
    } else if (previouslyGuessed(selectedWords)) {
      showAlert('Already guessed!');
    } else {
      if (selectedWords.filter((word) => groupOf(word) === targetGroupIndex).length === (NUM_GUESSES - 1)
        || selectedWords.filter((word) => groupOf(word) === groupOf(selectedWords[1])).length === (NUM_GUESSES - 1)) {
        showAlert('One away...');
      }
      previousGuesses.current = [...previousGuesses.current, selectedWords.sort()];
      setMistakesRemaining((num) => num - 1);
    }
  };

	return (
    <>
    {
     showMsg && <Alert msg={ msg }/>
    }
    <div className={ styles.pageCenter }>
      <p>Create four groups of four!</p>
      <div className={ styles.wordContainer }>
      {
        foundGroups
          .sort((a: GROUP, b: GROUP) => a.difficulty - b.difficulty)
          .map((group: GROUP) => (
            <div 
              className={ `${ styles.foundGroup } ${ styles[`category${ group.difficulty }`] }` }
              key={ group.difficulty }
            >
              <p className={ styles.categoryDesc }>
                { group.desc }
              </p>
              <p className={ styles.summaryWords }>
                { group.words.join(', ') }
              </p>
            </div>
          ))
      }
      {
        shuffledWords.map((word, i) => 
          <div 
            key={ `${word}_${i}` }
            className={ `${ styles.wordBox } ${ selectedWords.includes(word) ? styles.selected : styles.unselected }`}
            onClick={ () => handleClick(word) }
            data-disabled={ gameOver }
          >
            <div className={ styles.wordPadding }>
              <Textfit mode="multi" className={ styles.textfit }>
                { word }
              </Textfit>
            </div>
          </div>
        )
      }
      </div>
      <div className={ styles.remaining }>
        <p>Mistakes remaining:</p> 
        <div className={ styles.circleContainer }>
          {
            Array.from({ length: NUM_GUESSES })
              .map((_, i) => (
                <div
                  key={ i }
                  className={ i < mistakesRemaining ? styles.circleRemaining : styles.circleUsed}
                ></div>
              ))
          }
        </div>
      </div>
      <div className={ styles.buttonGroup }>
        <button className={ styles.secondaryButton } onClick={ shuffle } disabled={ gameOver }>Shuffle</button>
        <button className={ styles.secondaryButton } onClick={ deselectAll } disabled={ gameOver }>Deselect All</button>
        <button className={ styles.primaryButton } onClick={ submit } disabled={ gameOver }>Submit</button>
      </div>
    </div>
    </>
  )
};

export default Board;