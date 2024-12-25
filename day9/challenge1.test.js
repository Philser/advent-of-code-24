import { expect } from 'chai';
import { calculateFilesystemChecksum } from './challenge1.js';

describe('Day 9 Challenge 1', () => {
  it('can solve test input', () => {
    const result = calculateFilesystemChecksum('2333133121414131402');
    expect(result).to.eq(1928);
  });
});
