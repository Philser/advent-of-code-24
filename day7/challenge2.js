export function calculateTotalCalibrationResult2(input) {
  let lines = input.split('\n');
  if (lines[lines.length - 1] === '') {
    lines = lines.slice(0, -1);
  }

  let totalCalculatableSum = 0;
  for (const line of lines) {
    const lineParts = line.split(': ');
    const result = parseInt(lineParts[0]);
    const equationNums = lineParts[1].split(' ').map((num) => parseInt(num));
    totalCalculatableSum += canBeCalculated(equationNums, result) ? result : 0;
  }

  return totalCalculatableSum;
}

function canBeCalculated(numbers, targetResult) {
  // addition = 0
  // multiplication = 1
  const combinations = new Set();
  let combination = new Array(numbers.length).join('0');
  combinations.add(combination);
  const target = new Array(numbers.length).join('2');
  while (combination != target) {
    combination = (parseInt(combination, 3) + 1).toString(3);
    combination = combination.padStart(numbers.length - 1, '0');
    combinations.add(combination);
  }

  for (const combination of Array.from(combinations.values())) {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (combination[i - 1] === '0') {
        result += numbers[i];
      } else if (combination[i - 1] === '1') {
        result *= numbers[i];
      } else {
        result = parseInt(`${result}${numbers[i]}`);
      }
    }
    if (result === targetResult) {
      return true;
    }
  }

  return false;
}
