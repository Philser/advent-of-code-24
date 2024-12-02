import fs from 'fs';

export function retrieveReports(filePath) {
  const input = fs.readFileSync(filePath);

  const reports = [];
  for (const line of input.toString().split('\n')) {
    const numbers = line.split(/\s/);
    if (numbers[0] === '') {
      continue; //Empty line
    }
    reports.push(numbers.map((s) => parseInt(s)).filter((n) => n != NaN));
  }

  return reports;
}
