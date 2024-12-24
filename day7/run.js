import fs from 'fs';
import { calculateTotalCalibrationResult } from '../day7/challenge1.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
const result1 = calculateTotalCalibrationResult(f.toString());
console.log('################ Challenge 7 ################');
console.log(`Challenge 1 solution: ${result1}`);
console.log('#############################################');
