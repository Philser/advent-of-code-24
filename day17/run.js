import fs from 'fs';
import { getDeviceOutputs } from './challenge1.js';
import { bruteForceLowestRegisterAValue } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Day 17 ################');
console.log(`Challenge 1 solution: ${getDeviceOutputs(f.toString())}`);
console.log(
  `Challenge 2 solution: ${bruteForceLowestRegisterAValue(f.toString())}`
);
console.log('#############################################');

// A % 8 XOR 4 XOR (A / 2^(A % 8 XOR 4) XOR 4 % 8
function calc(a) {
  return (a % 8 ^ 4 ^ Math.floor(a / Math.pow(2, a % 8 ^ 4)) ^ 4) % 8;
}
