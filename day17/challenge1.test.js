import { expect } from 'chai';
import { getDeviceOutputs } from './challenge1.js';

describe('Day 17 Challenge 1', () => {
  it('can solve test input', () => {
    let input =
      'Register A: 729\n' +
      'Register B: 0\n' +
      'Register C: 0\n' +
      '\n' +
      'Program: 0,1,5,4,3,0';
    expect(getDeviceOutputs(input)).to.eq('4,6,3,5,6,3,5,2,1,0');
  });
});
