import fs from 'fs';
import { countStones } from './challenge1.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Challenge 11 ################');
console.log(`Challenge 1 solution: ${countStones(f.toString(), 25)}`);
console.log(`Challenge 2 solution: ${countStones(f.toString(), 75)}`);
console.log('#############################################');
