import { jest } from '@jest/globals';
import 'react-i18next';

export const useTranslation = jest.fn().mockReturnValue({
  t: (key: string) => key,
  i18n: {
    changeLanguage: () => new Promise(() => {}),
  },
});

export const initReactI18next = {
  type: '3rdParty',
  init: () => {},
};
