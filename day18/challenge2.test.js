import { expect } from 'chai';
import { findBlockingBytePos } from './challenge2.js';

describe('Day 18 Challenge 1', () => {
  it('can solve example case', () => {
    let input =
      '5,4\n4,2\n4,5\n3,0\n2,1\n6,3\n2,4\n1,5\n0,6\n3,3\n2,6\n5,1\n1,2\n5,5\n2,5\n6,5\n1,4\n0,4\n6,4\n1,1\n6,1\n1,0\n0,5\n1,6\n2,0\n';
    expect(findBlockingBytePos(input, { x: 6, y: 6 }, 19)).to.eq('6,1');
  });
});
