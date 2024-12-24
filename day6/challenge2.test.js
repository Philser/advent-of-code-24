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

    const result = countAllPossibleObstaclePositions(input);
    for (const map of result) {
      printMap(map);
      console.log('----------------------------------');
    }
    expect(result.length).to.eq(6);
  });
});

function printMap(map) {
  for (const row of map) {
    console.log(row.join(''));
  }
}
