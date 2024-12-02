import { expect } from 'chai';
import { describe, it } from 'mocha';
import { assessReports } from './challenge1.js';

describe.only('Day 2 Challenge 1', () => {
  it('recognizes a safe increasing report', () => {
    const assessment = assessReports([[4, 5, 6, 7]]);
    expect(assessment).to.deep.eq({ safeReports: 1 });
  });

  it('recognizes multiple safe increasing reports', () => {
    const assessment = assessReports([
      [4, 5, 6, 7],
      [1, 2, 3],
    ]);
    expect(assessment).to.deep.eq({ safeReports: 2 });
  });

  it('recognizes a safe report with distances up to 3', () => {
    const assessment = assessReports([[4, 5, 7, 10]]);
    expect(assessment).to.deep.eq({ safeReports: 1 });
  });

  it('recognizes a safe decreasing report', () => {
    const assessment = assessReports([[7, 6, 5, 4]]);
    expect(assessment).to.deep.eq({ safeReports: 1 });
  });

  it('recognizes an unsafe report because it is not strictly increasing', () => {
    const assessment = assessReports([[4, 5, 6, 5]]);
    expect(assessment).to.deep.eq({ safeReports: 0 });
  });

  it('recognizes an unsafe report because it is constant', () => {
    const assessment = assessReports([[4, 4]]);
    expect(assessment).to.deep.eq({ safeReports: 0 });
  });

  it('recognizes an unsafe report because it is not strictly decreasing', () => {
    const assessment = assessReports([[7, 6, 4, 5]]);
    expect(assessment).to.deep.eq({ safeReports: 0 });
  });

  it('recognizes an unsafe report due to distances bigger than 3', () => {
    let assessment = assessReports([[7, 11]]);
    expect(assessment).to.deep.eq({ safeReports: 0 });

    assessment = assessReports([[12, 8]]);
    expect(assessment).to.deep.eq({ safeReports: 0 });
  });
});
