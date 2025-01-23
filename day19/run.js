import fs from 'fs';
import { countValidDesigns } from './challenge1.js';
import { countAllValidDesignCombinations } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Day 19 ################');
console.log(`Challenge 1 solution: ${countValidDesigns(f.toString())}`);
console.log(
  `Challenge 2 solution: ${countAllValidDesignCombinations(f.toString())}`
);
console.log('#############################################');
