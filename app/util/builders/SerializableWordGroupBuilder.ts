import { v4 } from 'uuid';

import { SerializableWordGroup } from '@/types';

export class WordGroupBuilder {
  id: string;
  difficulty: 1 | 2 | 3 | 4 | null;
  desc: string | null;
  words: string[] | null;

  constructor() {
    this.id = v4();
    this.difficulty = null;
    this.desc = null;
    this.words = null;
  }

  static getInstance = (): WordGroupBuilder => {
    return new WordGroupBuilder();
  };

  withDifficulty = (difficulty: 1 | 2 | 3 | 4): WordGroupBuilder => {
    this.difficulty = difficulty;
    return this;
  };

  withDesc = (desc: string): WordGroupBuilder => {
    this.desc = desc;
    return this;
  };

  withWords = (words: string[]): WordGroupBuilder => {
    this.words = words;
    return this;
  };

  build = (): SerializableWordGroup => {
    if (!this.id || !this.desc || !this.difficulty || !this.words) {
      throw new Error("Missing required attributes");
    }

    return {
      id: this.id,
      difficulty: this.difficulty,
      desc: this.desc,
      words: this.words.map(word => ({
        parentGroupId: this.id,
        text: word,
        id: v4(),
      })),
    }
  };
}
