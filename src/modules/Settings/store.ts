import { StateCreator } from 'zustand';
import { Appearance } from 'react-native';
import 'zustand/middleware';

import { GlobalStoreState } from '../store';

import { Settings } from './types';

export interface SettingsSlice {
  settings: Settings;
}

export const createSettingsSlice: StateCreator<
  GlobalStoreState,
  [['zustand/persist', unknown]],
  [],
  SettingsSlice
> = () => ({
  settings: {
    theme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  },
});
