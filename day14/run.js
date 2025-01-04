import fs from 'fs';
import { determineSafetyFactor } from './challenge1.js';
import { simulateMovements } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Challenge 14 ################');
console.log(
  `Challenge 1 solution: ${determineSafetyFactor(
    { x: 101, y: 103 },
    100,
    f.toString()
  )}`
);
console.log(
  `Challenge 2 solution: ${await simulateMovements(
    { x: 101, y: 103 },
    100_000,
    f.toString()
  )}`
);
console.log('#############################################');
