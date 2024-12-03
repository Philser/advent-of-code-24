import { retrieveReports } from './util.js';

export function day2Challenge2() {
  const reports = retrieveReports(import.meta.dirname + '/input_day2.txt');
  console.log(assessReports(reports));
}

export function assessReports(reports) {
  let reportStats = [];
  for (const report of reports) {
    reportStats.push(isReportSafe(report, false));
  }
  const safeReports = reportStats.filter((r) => r === true).length;

  return {
    safeReports,
  };
}

// Leave here for debugging
function isReportSafeBruteForce(report, problemDampenerUsed) {
  const MAX_ALLOWED_INCREASE = 3;
  const DECREASING = -1;
  const INCREASING = 1;
  if (!Array.isArray(report)) {
    throw Error('Expected input to be an array of arrays');
  }
  if (report.length === 0) {
    return false;
  }

  let direction = null;
  let isSafeReport = true;
  for (let i = 1; i < report.length; i++) {
    if (!isSafeReport) {
      // Skip because we already encountered a bad report
      break;
    }

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

    if (!problemDampenerUsed && !isSafeReport) {
      const reports = [];
      for (let k = 0; k < report.length; k += 1) {
        const newReport = report.filter((level, index) => index !== k);
        reports.push(isReportSafe(newReport, true));
      }

      return reports.some((r) => r);
    }
  }

  return isSafeReport;
}

function isReportSafe(report, problemDampenerUsed) {
  const MAX_ALLOWED_INCREASE = 3;
  const DECREASING = -1;
  const INCREASING = 1;
  if (!Array.isArray(report)) {
    throw Error('Expected input to be an array of arrays');
  }
  if (report.length === 0) {
    return false;
  }

  let direction = null;
  let isSafeReport = true;
  for (let i = 1; i < report.length; i++) {
    if (!isSafeReport) {
      // Skip because we already encountered a bad report
      break;
    }

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

    if (!problemDampenerUsed && !isSafeReport) {
      // the pair i and i-1 pose a problem, so without one of the two the report might be safe
      // however, we don't know which number might be the troublemaker so we gotta test twice, omitting each once
      const reportCopy1 = report.filter((level, index) => index !== i);
      const reportCopy2 = report.filter((level, index) => index !== i - 1);
      const reportCopy3 = report.filter((level, index) => index !== 0); // Weird edge case and idc anymore
      return (
        isReportSafe(reportCopy1, true) ||
        isReportSafe(reportCopy2, true) ||
        isReportSafe(reportCopy3, true)
      );
    }
  }

  return isSafeReport;
}
