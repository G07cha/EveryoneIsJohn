import { StateCreator } from 'zustand';
import 'zustand/middleware';

import { GlobalStoreState } from '../store';
import { generateId } from '../../helpers/id';
import { toBranded } from '../../helpers/branded';

import { Character } from './types';

export interface CharactersSlice {
  characters: Map<Character['id'], Character>;
  addCharacter(character: Omit<Character, 'id'>): void;
  removeCharacter(id: Character['id']): void;
  updateCharacter(id: Character['id'], setter: (prevCharacter: Character) => Character): void;
}

const DEFAULT_STARTING_WILLPOWER = 10;
const REDUCED_STARTING_WILLPOWER = 7;

export const createCharacterStoreSlice: StateCreator<
  GlobalStoreState,
  [['zustand/persist', unknown]],
  [],
  CharactersSlice
> = (setState) => ({
  characters: new Map(),
  addCharacter: (character) => {
    const id = toBranded<Character['id']>(generateId());

    setState((prev) => ({
      characters: new Map(prev.characters).set(id, {
        ...character,
        id,
        score: 0,
        willpower:
          character.skills.filter(Boolean).length < 3 ? DEFAULT_STARTING_WILLPOWER : REDUCED_STARTING_WILLPOWER,
      }),
    }));
  },
  removeCharacter: (id) =>
    setState((prev) => {
      const characters = new Map(prev.characters);
      characters.delete(id);
      return { characters };
    }),
  updateCharacter: (id, setter) => {
    setState((prev) => {
      const prevCharacter = prev.characters.get(id);

      if (!prevCharacter) {
        throw new Error(`Character with "${id}" id not found`);
      }

      return {
        characters: new Map(prev.characters).set(id, setter(prevCharacter)),
      };
    });
  },
});
