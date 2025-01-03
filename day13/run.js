import fs from 'fs';
import { determineFewestTokensToWinAllPrizes } from './challenge1.js';
import { determineFewestTokensToWinAllPrizesEuler } from './challenge2.js';

const f = fs.readFileSync(import.meta.dirname + '/input.txt');
console.log('################ Challenge 13 ################');
console.log(
  `Challenge 1 solution: ${determineFewestTokensToWinAllPrizes(f.toString())}`
);
console.log(
  `Challenge 2 solution: ${determineFewestTokensToWinAllPrizesEuler(
    f.toString()
  )}`
);
console.log('#############################################');
