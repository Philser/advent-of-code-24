import { expect } from 'chai';
import { findEveryXmas } from './challenge1.js';

describe('Day 4 Challenge 1', () => {
  it('finds forward XMAS words', () => {
    const input = 'XMASMMS\nSSXMASM\nMASMASM';
    expect(findEveryXmas(input)).to.eq(2);
  });

  it('finds backward XMAS words', () => {
    const input = 'SAMXMMS\nSSSAMXM\nMASMASM';
    expect(findEveryXmas(input)).to.eq(2);
  });

  it('finds combined forward and backward XMAS words', () => {
    const input = 'XMASAMXM\nMSAMXMAS';
    expect(findEveryXmas(input)).to.eq(4);
  });

  it('finds a vertical XMAS word', () => {
    const input = 'XAAA\nMAAA\nAAAA\nSAAA';
    expect(findEveryXmas(input)).to.eq(1);
  });

  it('finds a vertical backwards XMAS word', () => {
    const input = 'SAAA\nAAAA\nMAAA\nXAAA';
    expect(findEveryXmas(input)).to.eq(1);
  });

  it('finds a diagonal right-oriented XMAS', () => {
    const input = 'XAAA\nAMAA\nAAAA\nAAAS';
    expect(findEveryXmas(input)).to.eq(1);
  });

  it('finds a diagonal right-oriented backwards XMAS', () => {
    const input = 'SAAA\nAAAA\nAAMA\nAAAX';
    expect(findEveryXmas(input)).to.eq(1);
  });

  it('finds a diagonal left-oriented XMAS', () => {
    const input = 'AAAX\nAAMA\nAAAA\nSAAA';
    expect(findEveryXmas(input)).to.eq(1);
  });

  it('finds a diagonal left-oriented backwards XMAS', () => {
    const input = 'AAAS\nAAAA\nAMAA\nXAAA';
    expect(findEveryXmas(input)).to.eq(1);
  });

  it('finds diagonal XMAS words in both directions', () => {
    const input = 'XAAS\nAMAA\nAMAA\nXAAS';
    expect(findEveryXmas(input)).to.eq(2);
  });

  it('finds word after partial word start', () => {
    const input = 'XXMASAA';
    expect(findEveryXmas(input)).to.eq(1);
  });

  it('test input 1', () => {
    const input =
      'MMMSXXMASM\n' +
      'MSAMXMSMSA\n' +
      'AMXSXMAAMM\n' +
      'MSAMASMSMX\n' +
      'XMASAMXAMM\n' +
      'XXAMMXXAMA\n' +
      'SMSMSASXSS\n' +
      'SAXAMASAAA\n' +
      'MAMMMXMMMM\n' +
      'MXMXAXMASX';
    expect(findEveryXmas(input)).to.eq(18);
  });
});
