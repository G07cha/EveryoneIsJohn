import { StateCreator } from 'zustand';
import 'zustand/middleware';

import { GlobalStoreState } from '../store';

import { Character } from './types';

export interface CharactersSlice {
  characters: readonly Character[];
  addCharacter(character: Character): void;
  removeCharacter(index: number): void;
}

export const createCharacterStoreSlice: StateCreator<
  GlobalStoreState,
  [['zustand/persist', unknown]],
  [],
  CharactersSlice
> = (set, get) => ({
  characters: [],
  addCharacter: (character) => set({ characters: [character, ...get().characters] }),
  removeCharacter: (index) => set({ characters: [...get().characters.filter((_, i) => i !== index)] }),
});
