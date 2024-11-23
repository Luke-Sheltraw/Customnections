import { SerializableWordGroup, WordGroup } from '@/types';

export const toDeserializedWordGroups = (
  wordGroups: SerializableWordGroup[]
): WordGroup[] => {
  const wordGroupByIdMap = Object.fromEntries(
    wordGroups.map(wordGroup => [wordGroup.id, wordGroup])
  ) as Record<string, WordGroup>;

  wordGroups.forEach(wordGroup => {
    wordGroup.words = wordGroup.words.map(word => ({
      ...word,
      parentGroup: wordGroupByIdMap[word.parentGroupId],
    }));
  });

  return wordGroups as WordGroup[];
};
