export const toShuffledArray = <T>(arr: T[]): T[] => {
  if (arr.length === 0) return [];

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};
