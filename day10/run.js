import fs from 'fs';
import { calulateTrailheadScoreSum } from '../day10/challenge1.js';
import { calulateTrailheadPathSum } from '../day10/challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
const result1 = calulateTrailheadScoreSum(f.toString());
const result2 = calulateTrailheadPathSum(f.toString());
console.log('################ Challenge 10 ################');
console.log(`Challenge 1 solution: ${result1}`);
console.log(`Challenge 2 solution: ${result2}`);
console.log('#############################################');
