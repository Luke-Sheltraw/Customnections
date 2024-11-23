import { SerializableWordGroup } from '@/types';

export class GameBuilder {
  wordGroups: SerializableWordGroup[] | null;

  constructor() {
    this.wordGroups = null;
  }

  static getInstance = (): GameBuilder => {
    return new GameBuilder();
  };

  withWordGroups = (wordGroups: SerializableWordGroup[]): GameBuilder => {
    const wordStringList = wordGroups
      .flatMap(wordGroup => wordGroup.words)
      .map(word => word.text);

    if (new Set(wordStringList).size !== wordStringList.length) {
      throw new Error('Duplicate words found');
    }

    this.wordGroups = wordGroups;
    return this;
  };

  build = (): SerializableWordGroup[] => {
    if (!this.wordGroups) {
      throw new Error();
    }

    return this.wordGroups;
  };
}
