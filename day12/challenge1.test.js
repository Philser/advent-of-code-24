import { expect } from 'chai';
import { calculatePlotCosts } from './challenge1.js';

describe('Day 12 Challenge 1', () => {
  it('can solve small test input', () => {
    let input = 'AAAA\n' + 'BBCD\n' + 'BBCC\n' + 'EEEC';
    expect(calculatePlotCosts(input)).to.eq(140);
  });

  it('can solve input with duplicate plants', () => {
    let input = 'AAAA\n' + 'BBCD\n' + 'BBCC\n' + 'AAAC';
    expect(calculatePlotCosts(input)).to.eq(140);
  });

  it('can solve larger test input', () => {
    let input =
      'RRRRIICCFF\n' +
      'RRRRIICCCF\n' +
      'VVRRRCCFFF\n' +
      'VVRCCCJFFF\n' +
      'VVVVCJJCFE\n' +
      'VVIVCCJJEE\n' +
      'VVIIICJJEE\n' +
      'MIIIIIJJEE\n' +
      'MIIISIJEEE\n' +
      'MMMISSJEEE';
    expect(calculatePlotCosts(input)).to.eq(1930);
  });
});
