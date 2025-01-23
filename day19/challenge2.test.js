import { expect } from 'chai';
import { countAllValidDesignCombinations } from './challenge2.js';

describe('Day 19 Challenge 2', () => {
  it('can solve test input', () => {
    let input =
      'r, wr, b, g, bwu, rb, gb, br\n' +
      '\n' +
      'bwurrg\n' +
      'brwrr\n' +
      'bggr\n' +
      'gbbr\n' +
      'rrbgbr\n' +
      'ubwu\n' +
      'brgr\n' +
      'bbrgwb';

    expect(countAllValidDesignCombinations(input)).to.eq(16);
  });

  it('can solve custom test input', () => {
    let input = 'wr, rw, b, br, cdef' + '\n\n' + 'brwrb';

    expect(countValidDesigns(input)).to.eq(1);
  });
});
