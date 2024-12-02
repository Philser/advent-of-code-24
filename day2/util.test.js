import { expect } from 'chai';
import fs from 'fs';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { retrieveReports } from './util.js';

describe('Report importer', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Can read multi-line reports from file', () => {
    const input = '1 2 3 4\n' + '5 6 7 8';

    sinon.stub(fs, 'readFileSync').returns(Buffer.from(input, 'utf8'));
    const reports = retrieveReports('someFile');
    expect(reports).to.deep.eq([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);
  });

  it('Can read multi-line reports from file with differing line lengths', () => {
    const input = '1 2 3 4\n' + '5 6 7 8 9 10';

    sinon.stub(fs, 'readFileSync').returns(Buffer.from(input, 'utf8'));
    const reports = retrieveReports('someFile');
    expect(reports).to.deep.eq([
      [1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10],
    ]);
  });

  it('Can handle empty lines', () => {
    const input = '\n' + '1 2 3 4\n' + '5 6 7 8 9 10';

    sinon.stub(fs, 'readFileSync').returns(Buffer.from(input, 'utf8'));
    const reports = retrieveReports('someFile');
    expect(reports).to.deep.eq([
      [1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10],
    ]);
  });
});
