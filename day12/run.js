import fs from 'fs';
import { calculatePlotCosts } from './challenge1.js';
import { calculateDiscountedPlotCosts } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Day 12 ################');
console.log(`Challenge 1 solution: ${calculatePlotCosts(f.toString())}`);
console.log(
  `Challenge 2 solution: ${calculateDiscountedPlotCosts(f.toString())}`
);
console.log('#############################################');
