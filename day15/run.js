import fs from 'fs';
import { calculateGPSSums } from './challenge1.js';
import { calculateGPSSumsWide } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Day 15 ################');
console.log(`Challenge 1 solution: ${calculateGPSSums(f.toString())}`);
console.log(`Challenge 2 solution: ${calculateGPSSumsWide(f.toString())}`);
console.log('#############################################');
