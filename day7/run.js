import fs from 'fs';
import { calculateTotalCalibrationResult } from '../day7/challenge1.js';
import { calculateTotalCalibrationResult2 } from '../day7/challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
const result1 = calculateTotalCalibrationResult(f.toString());
const result2 = calculateTotalCalibrationResult2(f.toString());
console.log('################ Day 7 ################');
console.log(`Challenge 1 solution: ${result1}`);
console.log(`Challenge 2 solution: ${result2}`);
console.log('#############################################');
