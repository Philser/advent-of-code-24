import fs from 'fs';
import { calculateFilesystemChecksum } from '../day9/challenge1.js';
import { calculateFilesystemChecksum2 } from '../day9/challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
const result1 = calculateFilesystemChecksum(f.toString());
const result2 = calculateFilesystemChecksum2(f.toString());
console.log('################ Challenge 9 ################');
console.log(`Challenge 1 solution: ${result1}`);
console.log(`Challenge 2 solution: ${result2}`);
console.log('#############################################');
