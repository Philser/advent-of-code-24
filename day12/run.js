import fs from 'fs';
import { calculatePlotCosts } from './challenge1.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Challenge 12 ################');
console.log(`Challenge 1 solution: ${calculatePlotCosts(f.toString())}`);
console.log('#############################################');
