import { Branded } from '../../helpers/branded';

export interface Character {
  id: Branded<string, 'characterId'>;
  name: string;
  skills: readonly string[];
  obsessions: readonly string[];
  score: number;
  willpower: number;
}
