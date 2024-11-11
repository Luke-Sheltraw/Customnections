import { Word } from '../types';

export const isOneAwayFromSharedParent = (words: Word[]): boolean => {
  return Object.values(
    words.reduce(
      (acc, word) => ({
        ...acc,
        [word.parentGroup.id]: (acc[word.parentGroup.id] ?? 0) + 1,
      }),
      {} as Record<string, number>
    )
  ).includes(3);
};
