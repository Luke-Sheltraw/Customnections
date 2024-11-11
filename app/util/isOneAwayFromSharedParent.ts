import { Word } from '../types';

export const isOneAwayFromSharedParent = (words: Word[]): boolean => {
  return Object.values(Object.groupBy(words, word => word.parentGroup.id)).some(
    group => group?.length === 3
  );
};
