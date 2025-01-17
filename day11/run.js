import fs from 'fs';
import { countStones } from './challenge1.js';
import { countStonesEfficiently } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Day 11 ################');
console.log(`Challenge 1 solution: ${countStones(f.toString(), 25)}`);
console.log(
  `Challenge 2 solution: ${countStonesEfficiently(f.toString(), 75)}`
);
console.log('#############################################');
