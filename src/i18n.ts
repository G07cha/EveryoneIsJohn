import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en/translation.json';
import nl from './translations/nl/translation.json';

export const resources = {
  en: {
    translation: en,
  },
  nl: {
    translation: nl,
  },
} satisfies i18n.Resource;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
