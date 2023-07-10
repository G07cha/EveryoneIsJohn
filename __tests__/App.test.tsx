import 'react-native';
import React from 'react';
import { it } from '@jest/globals';
import { render } from 'react-native-testing-library';

import App from '../src/App';

it('renders correctly', () => {
  render(<App />);
});
