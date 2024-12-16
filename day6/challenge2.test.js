import { expect } from 'chai';
import { countAllPossibleObstaclePositions } from './challenge2.js';

describe('Day 6 Challenge 2', () => {
  it.only('can determine test input solution', () => {
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

    expect(countAllPossibleObstaclePositions(input)).to.eq(4);
  });
});
