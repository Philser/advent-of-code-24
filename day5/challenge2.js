import fs from 'fs';
const f = fs.readFileSync(import.meta.dirname + '/input_day5.txt').toString();
const parts = f.split('\n\n');
console.log(
  getIncorrectUpdateMiddlePageSum(
    parts[0].split('\n'),
    parts[1].split('\n').slice(0, -1)
  )
);

export function getIncorrectUpdateMiddlePageSum(rulesList, updatesList) {
  const rules = extractRules(rulesList);

  let mediumPageSum = 0;
  updateLoop: for (const update of updatesList) {
    const sequence = update.split(',');
    for (const [index, number] of sequence.entries()) {
      for (let i = index + 1; i < sequence.length; i++) {
        if (
          rules[number]?.after?.has(sequence[i]) ||
          rules[sequence[i]]?.before?.has(number)
        ) {
          sequence.sort((a, b) => {
            if (rules[a]?.after?.has(b) || rules[b]?.before?.has(a)) {
              return 1;
            }

            return -1;
          });
          mediumPageSum += parseInt(
            sequence[Math.ceil(sequence.length / 2) - 1]
          );
          continue updateLoop;
        }
      }
    }
  }
  return mediumPageSum;
}

function extractRules(rulesList) {
  const rules = {};

  for (const entry of rulesList) {
    const numbers = entry.split('|');
    if (!Object.hasOwn(rules, numbers[0])) {
      rules[numbers[0]] = {
        before: new Set(),
        after: new Set(),
      };
    }
    rules[numbers[0]].before.add(numbers[1]);

    if (!Object.hasOwn(rules, numbers[1])) {
      rules[numbers[1]] = {
        before: new Set(),
        after: new Set(),
      };
    }
    rules[numbers[1]].after.add(numbers[0]);
  }

  return rules;
}
