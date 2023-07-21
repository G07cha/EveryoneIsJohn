import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import { createSelectors } from '../helpers/store';

import { Character, CharactersSlice, createCharacterStoreSlice } from './Character';
import { SettingsSlice, createSettingsSlice } from './Settings';

export type GlobalStoreState = CharactersSlice & SettingsSlice;

const useGlobalStoreBase = create<GlobalStoreState>()(
  persist(
    (...args) => ({
      ...createCharacterStoreSlice(...args),
      ...createSettingsSlice(...args),
    }),
    {
      name: 'global-store',
      storage: createJSONStorage(() => AsyncStorage, {
        replacer: (_, value) => {
          if (value instanceof Map) {
            return Array.from(value.entries());
          }
          return value;
        },
        reviver: (key, value) => {
          if (key === 'characters') {
            // Maps and sets are not deserialized automatically
            return new Map(value as [Character['id'], Character][]);
          }

          return value;
        },
      }),
    },
  ),
);

export const useGlobalStore = createSelectors(useGlobalStoreBase);
