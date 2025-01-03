import { expect } from 'chai';
import { calculateDiscountedPlotCosts } from './challenge2.js';

describe.only('Day 12 Challenge 2', () => {
  it('can solve small test input', () => {
    let input = 'AAAA\n' + 'BBCD\n' + 'BBCC\n' + 'EEEC';
    expect(calculateDiscountedPlotCosts(input)).to.eq(80);
  });

  it('can solve E-plants test input', () => {
    let input = 'EEEEE\n' + 'EXXXX\n' + 'EEEEE\n' + 'EXXXX\n' + 'EEEEE';

    expect(calculateDiscountedPlotCosts(input)).to.eq(236);
  });

  it('can solve multiple overlapping vertices', () => {
    let input = 'ABA\n' + 'BAB';

    expect(calculateDiscountedPlotCosts(input)).to.eq(24);
  });

  it('can solve new challenge example', () => {
    let input =
      'AAAAAA\n' + 'AAABBA\n' + 'AAABBA\n' + 'ABBAAA\n' + 'ABBAAA\n' + 'AAAAAA';

    expect(calculateDiscountedPlotCosts(input)).to.eq(368);
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
    expect(calculateDiscountedPlotCosts(input)).to.eq(1206);
  });
});
