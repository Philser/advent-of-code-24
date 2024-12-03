import { expect } from 'chai';
import { describe, it } from 'mocha';
import { assessReports } from './challenge2.js';

describe('Day 2 Challenge 2', () => {
  it('recognizes a safe report with one bad level', () => {
    let assessment = assessReports([
      [7, 6, 8, 4],
      [7, 6, 4, 8],
      [4, 8, 6, 7],
      [8, 4, 6, 7],
      [1, 2, 3, 7],
      [4, 5, 3, 2],
      [60, 62, 60, 57, 55],
    ]);
    expect(assessment).to.deep.eq({ safeReports: 7 });
  });

  it('recognizes an unsafe report with multiple bad levels', () => {
    const assessment = assessReports([
      [4, 8, 6, 7, 1],
      [1, 7, 6, 8, 4],
      [82, 83, 80, 82, 83, 83],
    ]);
    expect(assessment).to.deep.eq({ safeReports: 0 });
  });

  it('recognizes a safe report with one bad level among others', () => {
    let assessment = assessReports([
      [4, 8, 6, 7],
      [1, 2, 3, 4],
    ]);
    expect(assessment).to.deep.eq({ safeReports: 2 });
  });
});
