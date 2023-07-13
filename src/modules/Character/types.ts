export interface Character {
  name: string;
  skills: readonly string[];
  obsessions: readonly string[];
  score: number;
  willpower: number;
}
