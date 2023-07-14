import { useMemo } from 'react';

import { useGlobalStore } from '../modules/store';
import { darkTheme, defaultTheme } from '../theme';

export const useTheme = () => {
  const { theme } = useGlobalStore.use.settings();

  return useMemo(() => (theme === 'dark' ? darkTheme : defaultTheme), [theme]);
};
