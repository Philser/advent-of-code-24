import { expect } from 'chai';
import { calculateTotalCalibrationResult } from './challenge1.js';

describe('Day 7 Challenge 1', () => {
  it('can determine test input solution', () => {
    let input =
      '190: 10 19\n' +
      '3267: 81 40 27\n' +
      '83: 17 5\n' +
      '156: 15 6\n' +
      '7290: 6 8 6 15\n' +
      '161011: 16 10 13\n' +
      '192: 17 8 14\n' +
      '21037: 9 7 18 13\n' +
      '292: 11 6 16 20\n';

    const result = calculateTotalCalibrationResult(input);
    expect(result).to.eq(3749);
  });
});
