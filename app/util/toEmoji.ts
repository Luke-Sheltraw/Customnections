import { Word } from '@/types';

const DEFAULT_EMOJI = '❓';

const GROUP_TO_EMOJI_MAP: Record<number, string> = {
  1: '🟨',
  2: '🟩',
  3: '🟦',
  4: '🟪',
};

export const toEmoji = (word: Word): string => {
  return GROUP_TO_EMOJI_MAP[word.parentGroup.difficulty] ?? DEFAULT_EMOJI;
};
