import { expect } from 'chai';
import { countStonesEfficiently } from './challenge2.js';

describe('Day 11 Challenge 2', () => {
  it('solves test input', () => {
    expect(countStonesEfficiently('0 1 10 99 999', 1)).to.eq(7);
  });

  it('solves more complex test input', () => {
    const expectedVals = [3, 4, 5, 9, 13, 22];
    for (const [index, val] of expectedVals.entries()) {
      expect(countStones('125 17', index + 1)).to.eq(val);
    }
  });

  it('can solve large blink numbers', () => {
    expect(countStones('125 17', 25)).to.eq(55312);
  });
});
