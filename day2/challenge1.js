import { retrieveReports } from './util.js';

export function day2Challenge1() {
  const reports = retrieveReports(import.meta.dirname + '/input_day2.txt');
  console.log(assessReports(reports));
}

export function assessReports(reports) {
  const MAX_ALLOWED_INCREASE = 3;
  const DECREASING = -1;
  const INCREASING = 1;

  let safeReports = 0;
  let direction = null;
  for (const report of reports) {
    if (!Array.isArray(report)) {
      throw Error('Expected input to be an array of arrays');
    }

    let isSafeReport = true;
    for (let i = 1; i < report.length; i++) {
      let distance = report[i] - report[i - 1];
      if (i == 1) {
        direction = distance < 0 ? DECREASING : INCREASING;
      }

      if (Math.abs(distance) > MAX_ALLOWED_INCREASE) {
        isSafeReport = false;
      }

      if (
        distance === 0 ||
        (distance < 0 && direction === INCREASING) ||
        (distance > 0 && direction === DECREASING)
      ) {
        isSafeReport = false;
      }
    }

    if (isSafeReport) {
      safeReports += 1;
    }
  }

  return {
    safeReports,
  };
}
