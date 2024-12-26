import { expect } from 'chai';
import { calulateTrailheadPathSum } from './challenge2.js';

describe('Day 10 Challenge 2', () => {
  it('can solve test input', () => {
    let input =
      '89010123\n' +
      '78121874\n' +
      '87430965\n' +
      '96549874\n' +
      '45678903\n' +
      '32019012\n' +
      '01329801\n' +
      '10456732';
    const result = calulateTrailheadPathSum(input);
    expect(result).to.eq(81);
  });
});
