import { expect } from 'chai';
import { countValidDesigns } from './challenge1.js';

describe('Day 19 Challenge 1', () => {
  it('can solve test input', () => {
    let input =
      'r, wr, b, g, bwu, rb, gb, br\n' +
      '\n' +
      'brwrr\n' +
      'bwurrg\n' +
      'bggr\n' +
      'gbbr\n' +
      'rrbgbr\n' +
      'ubwu\n' +
      'brgr\n' +
      'bbrgwb';

    expect(countValidDesigns(input)).to.eq(6);
  });

  it('can solve custom test input', () => {
    let input = 'wr, rw, b, br, cdef' + '\n\n' + 'brwrb';

    expect(countValidDesigns(input)).to.eq(1);
  });
});
