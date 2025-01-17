import fs from 'fs';
import { determineFewestTokensToWinAllPrizes } from './challenge1.js';
import { determineFewestTokensToWinAllPrizes2 } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Day 13 ################');
console.log(
  `Challenge 1 solution: ${determineFewestTokensToWinAllPrizes(f.toString())}`
);
console.log(
  `Challenge 2 solution: ${determineFewestTokensToWinAllPrizes2(f.toString())}`
);
console.log('#############################################');
