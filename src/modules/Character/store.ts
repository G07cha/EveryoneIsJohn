import { StateCreator } from 'zustand';
import 'zustand/middleware';

import { GlobalStoreState } from '../store';

import { Character } from './types';

export interface CharactersSlice {
  characters: readonly Character[];
  addCharacter(character: Character): void;
  removeCharacter(index: number): void;
}

const DEFAULT_STARTING_WILLPOWER = 10;
const REDUCED_STARTING_WILLPOWER = 7;

export const createCharacterStoreSlice: StateCreator<
  GlobalStoreState,
  [['zustand/persist', unknown]],
  [],
  CharactersSlice
> = (set, get) => ({
  characters: [],
  addCharacter: (character) =>
    set({
      characters: [
        {
          ...character,
          score: 0,
          willpower:
            character.skills.filter(Boolean).length < 3 ? DEFAULT_STARTING_WILLPOWER : REDUCED_STARTING_WILLPOWER,
        },
        ...get().characters,
      ],
    }),
  removeCharacter: (index) => set({ characters: [...get().characters.filter((_, i) => i !== index)] }),
});
