import fs from 'fs';
import { calculateComplexitiesSum } from './challenge1.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Day 18 ################');
console.log(`Challenge 1 solution: ${calculateComplexitiesSum(f.toString())}`);
console.log('#############################################');
