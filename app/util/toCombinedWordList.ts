import { Word, WordGroup } from '../types';

export const toCombinedWordList = (wordGroups: WordGroup[]): Word[] => {
  return wordGroups.flatMap(wordGroup => wordGroup.words);
};
