import { expect } from 'chai';
import { calculateComplexitiesSum } from './challenge1.js';

describe.only('Day 21 Challenge 1', () => {
  it('can solve test input', () => {
    let input = '029A\n' + '980A\n' + '179A\n' + '456A\n' + '379A';

    expect(calculateComplexitiesSum(input)).to.eq(126384);
  });

  it('can solve various inputs', () => {
    expect(calculateComplexitiesSum('0'), '0').to.eq(0);
    expect(calculateComplexitiesSum('1'), '1').to.eq(26);
    expect(calculateComplexitiesSum('2'), '2').to.eq(42);
    expect(calculateComplexitiesSum('3'), '3').to.eq(36);
  });

  it('can solve partial challenge input', () => {
    expect(calculateComplexitiesSum('805A'), '805A').to.eq(61180);
    expect(calculateComplexitiesSum('682A'), '682A').to.eq(49104);
    expect(calculateComplexitiesSum('671A'), '671A').to.eq(49654);
    expect(calculateComplexitiesSum('973A'), '973A').to.eq(70056);
    expect(calculateComplexitiesSum('671A\n805A'), '671A - 805A').to.eq(110834);
    expect(
      calculateComplexitiesSum('671A\n805A\n682A'),
      '671A - 805A - 682A'
    ).to.eq(159938);
    expect(
      calculateComplexitiesSum('671A\n805A\n682A\n973A'),
      '671A - 805A - 682A - 973A'
    ).to.eq(229994);
    expect(
      calculateComplexitiesSum('671A\n805A\n682A\n973A\n319A'),
      '671A - 805A - 682A - 973A - 319A'
    ).to.eq(252324);
  });
});

// 973A
// 9: ^^^A
// 7: <<A
// 3: >>vvA
// A: vA
// ^^^A<<A>>vvAvA
// ^^^A<<A>>vvAvA
// <AAA>Av<<AA>>^AvAA<AA>^A<vA>^A
// <AAA>Av<<AA>>^AvAA<AA>^A<vA>^A
// v<<A>>^AAAvA^A<vA<AA >>^AAvAA<^A>A<vA>^AAv<<A>>^AAvA<^A>Av<<A>A>^AvA<^A>A
// v<<A>>^AAAvA^A<vA<AA >>^AAvAA<^A>A<vA>^AAv<<A>>^AAvA<^A>Av<<A>A>^AvA<^A>A
