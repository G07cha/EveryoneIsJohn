import { jest } from '@jest/globals';
import { getVisibilityStatus, hide } from 'react-native-bootsplash';

export default {
  hide: jest.fn<typeof hide>().mockResolvedValueOnce(),
  getVisibilityStatus: jest.fn<typeof getVisibilityStatus>().mockResolvedValue('hidden'),
};
