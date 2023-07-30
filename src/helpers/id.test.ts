import { describe, it, expect } from '@jest/globals';

import { generateId } from './id';

describe('generateId', () => {
  it('generates unique ids', () => {
    const quantity = 10;
    const output = new Array(quantity).fill(0).map(() => generateId());

    expect(new Set(output).size).toEqual(quantity);
  });
});
