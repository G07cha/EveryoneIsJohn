// See https://reactnavigation.org/docs/testing/
import 'react-native-gesture-handler/jestSetup';
import { jest } from '@jest/globals';

// Has to be mocked here to be available before Zustand mock
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
