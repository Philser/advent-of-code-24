import fs from 'fs';
import { findStepsToExist } from './challenge1.js';
import { findBlockingBytePos } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Day 18 ################');
// console.log(
//   `Challenge 1 solution: ${findStepsToExist(
//     f.toString(),
//     { y: 70, x: 70 },
//     1024
//   )}`
// );
console.log(
  `Challenge 2 solution: ${findBlockingBytePos(f.toString(), { y: 70, x: 70 })}`
);
console.log('#############################################');

// A % 8 XOR 4 XOR (A / 2^(A % 8 XOR 4) XOR 4 % 8
function calc(a) {
  return (a % 8 ^ 4 ^ Math.floor(a / Math.pow(2, a % 8 ^ 4)) ^ 4) % 8;
}
