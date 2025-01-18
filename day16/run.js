import fs from 'fs';
import { findCheapestPath } from './challenge1.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Day 16 ################');
console.log(`Challenge 1 solution: ${findCheapestPath(f.toString())}`);
console.log('#############################################');

// A % 8 XOR 4 XOR (A / 2^(A % 8 XOR 4) XOR 4 % 8
function calc(a) {
  return (a % 8 ^ 4 ^ Math.floor(a / Math.pow(2, a % 8 ^ 4)) ^ 4) % 8;
}
