import { Word } from '../types';

export const isSharedParentGroup = (words: Word[]): boolean => {
  return words.every(word => word.parentGroup === words[0].parentGroup);
};
