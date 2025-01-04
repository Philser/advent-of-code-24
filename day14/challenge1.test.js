import { expect } from 'chai';
import { describe } from 'mocha';
import { determineSafetyFactor } from './challenge1.js';

describe('Day 14 Challenge 1', () => {
  it('can solve test input', () => {
    let input =
      'p=0,4 v=3,-3\n' +
      'p=6,3 v=-1,-3\n' +
      'p=10,3 v=-1,2\n' +
      'p=2,0 v=2,-1\n' +
      'p=0,0 v=1,3\n' +
      'p=3,0 v=-2,-2\n' +
      'p=7,6 v=-1,-3\n' +
      'p=3,0 v=-1,-2\n' +
      'p=9,3 v=2,3\n' +
      'p=7,3 v=-1,2\n' +
      'p=2,4 v=2,-3\n' +
      'p=9,5 v=-3,-3';
    expect(determineSafetyFactor({ x: 11, y: 7 }, 100, input)).to.eq(12);
  });
});
