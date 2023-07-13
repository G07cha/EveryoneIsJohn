import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import { createSelectors } from '../helpers/store';

import { CharactersSlice, createCharacterStoreSlice } from './Character';

export type GlobalStoreState = CharactersSlice;

const useGlobalStoreBase = create<GlobalStoreState>()(
  persist(
    (...args) => ({
      ...createCharacterStoreSlice(...args),
    }),
    {
      name: 'global-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useGlobalStore = createSelectors(useGlobalStoreBase);
