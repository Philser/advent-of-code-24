import { expect } from 'chai';
import { predictUniquePositions } from './challenge1.js';

describe('Day 6 Challenge 1', () => {
  it('can determine test input solution', () => {
    let input =
      '....#.....\n' +
      '.........#\n' +
      '..........\n' +
      '..#.......\n' +
      '.......#..\n' +
      '..........\n' +
      '.#..^.....\n' +
      '........#.\n' +
      '#.........\n' +
      '......#...';

    const map = predictUniquePositions(input).map;
    for (const row of map) {
      console.log(row.join(''));
    }
    expect(predictUniquePositions(input).positions).to.eq(41);
  });
});
