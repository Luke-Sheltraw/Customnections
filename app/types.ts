export type WordGroup = {
  words: Word[];
  desc: string;
  difficulty: 1 | 2 | 3 | 4;
  id: string;
};

export type SerializableWordGroup = Omit<WordGroup, 'words'> & {
  words: SerializableWord[];
};

export type Word = {
  text: string;
  parentGroup: WordGroup;
  parentGroupId: string;
  id: string;
};

export type SerializableWord = Omit<Word, 'parentGroup'>;

export enum GameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}
