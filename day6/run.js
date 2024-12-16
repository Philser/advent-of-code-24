import fs from 'fs';
import { predictUniquePositions } from './challenge1.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
const result = predictUniquePositions(f.toString());
console.log('################ Challenge 6 ################');
console.log(`Challenge 1 solution: ${result.positions}`);
console.log('#############################################');
