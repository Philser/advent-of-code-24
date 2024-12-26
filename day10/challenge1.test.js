import { expect } from 'chai';
import { calulateTrailheadScoreSum } from './challenge1.js';

describe('Day 10 Challenge 1', () => {
  it('can solve test input', () => {
    let input =
      '...0...\n' +
      '...1...\n' +
      '...2...\n' +
      '6543456\n' +
      '7.....7\n' +
      '8.....8\n' +
      '9.....9';
    const result = calulateTrailheadScoreSum(input);
    expect(result).to.eq(2);
  });

  it('can solve test input 2', () => {
    let input = '89710823\n' + '78128874\n' + '87437965\n' + '96549874';

    const result = calulateTrailheadScoreSum(input);
    expect(result).to.eq(2);
  });
  it('can solve test input 2', () => {
    let input =
      '89010723\n' +
      '78121874\n' +
      '87437965\n' +
      '96549874' +
      '' +
      '' +
      '' +
      '' +
      '' +
      '' +
      '' +
      '' +
      '';

    const result = calulateTrailheadScoreSum(input);
    expect(result).to.eq(4);
  });

  it('can solve bigger test input', () => {
    let input =
      '89010123\n' +
      '78121874\n' +
      '87430965\n' +
      '96549874\n' +
      '45678903\n' +
      '32019012\n' +
      '01329801\n' +
      '10456732';

    const result = calulateTrailheadScoreSum(input);
    expect(result).to.eq(36);
  });
});
