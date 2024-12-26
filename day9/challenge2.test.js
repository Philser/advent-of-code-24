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

  it('can solve self-made input 2', () => {
    const result = calculateFilesystemChecksum2('9953877292');
    expect(result).to.eq(1777);
  });
});
