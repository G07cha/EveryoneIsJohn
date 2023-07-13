import 'react-native';
import React from 'react';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';

import App from '../src/App';

it('renders correctly', () => {
  render(<App />);
});
