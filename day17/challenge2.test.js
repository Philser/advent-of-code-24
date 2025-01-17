import { expect } from 'chai';
import { bruteForceLowestRegisterAValue } from './challenge2.js';

describe('Day 17 Challenge 2', () => {
  it('can solve test input', () => {
    let input =
      'Register A: 2024\n' +
      'Register B: 0\n' +
      'Register C: 0\n' +
      '\n' +
      'Program: 0,3,5,4,3,0';
    expect(bruteForceLowestRegisterAValue(input)).to.eq(117440);
  });
});
