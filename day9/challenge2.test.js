import { expect } from 'chai';
import { calculateFilesystemChecksum2 } from './challenge2.js';

describe('Day 9 Challenge 2', () => {
  it('can solve test input', () => {
    const result = calculateFilesystemChecksum2('2333133121414131402');
    expect(result).to.eq(2858);
  });

  it('can solve self-made input', () => {
    const result = calculateFilesystemChecksum2('2333133121414131402');
    expect(result).to.eq(2858);
  });

  it.only('can solve self-made input 2', () => {
    const result = calculateFilesystemChecksum2('9953877292');
    expect(result).to.eq(1777);
  });
});

// 000000000.........11111...22222222.......3333333..444444444..
// -->
// 00000000044444444411111...222222223333333....................
// ==
(9 + 11 + 12 + 13 + 14 + 15 + 16 + 17) * 4 +
  (18 + 19 + 20 + 21 + 22) +
  (26 + 27 + 28 + 29 + 30 + 31 + 32 + 33) * 2 +
  (34 + 35 + 36 + 37 + 38 + 39 + 40) * 3;
