import fs from 'fs';
import { calculateGPSSums } from './challenge1.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Challenge 15 ################');
console.log(`Challenge 1 solution: ${calculateGPSSums(f.toString())}`);
console.log('#############################################');
