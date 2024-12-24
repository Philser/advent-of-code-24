import fs from 'fs';
import { predictUniquePositions } from './challenge1.js';
import { countAllPossibleObstaclePositions } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
const result1 = predictUniquePositions(f.toString());
const result2 = countAllPossibleObstaclePositions(f.toString());
console.log('################ Challenge 6 ################');
console.log(`Challenge 1 solution: ${result1.positions}`);
console.log(`Challenge 2 solution: ${result2.length}`);
console.log('#############################################');
