import fs from 'fs';

const path = import.meta.dirname + '/input_day3.txt';
const input = fs.readFileSync(path).toString();

const matcher = input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)/g);
let match = null;
let result = 0;
let _do = true;
while ((match = matcher.next())) {
  if (match.done) {
    break;
  }

  if (match.value[0].startsWith('mul') && _do) {
    result += parseInt(match.value[1]) * parseInt(match.value[2]);
  } else if (match.value[0].startsWith('do(')) {
    _do = true;
  } else if (match.value[0].startsWith("don't")) {
    _do = false;
  }
}
console.log(result);
