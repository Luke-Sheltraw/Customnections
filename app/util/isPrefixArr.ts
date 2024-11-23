export const isPrefixArr = <T>(prefix: T[], arr: T[]): boolean => {
  return arr.slice(0, prefix.length).every((t, i) => prefix[i] === t);
};
