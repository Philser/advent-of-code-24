import fs from 'fs';

const path = import.meta.dirname + '/input_day3.txt';
const input = fs.readFileSync(path).toString();

const matcher = input.matchAll(/mul\((\d+),(\d+)\)/g);
let match = null;
let result = 0;
while ((match = matcher.next())) {
  if (match.done) {
    break;
  }
  result += parseInt(match.value[1]) * parseInt(match.value[2]);
}
console.log(result);
