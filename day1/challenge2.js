import { retrieveLocationIDLists } from './util.js';

const { leftList, rightList } = retrieveLocationIDLists(
  import.meta.dirname + '/input_day1.txt'
);

const occurrences = {};

for (const number of rightList) {
  if (!occurrences[number]) {
    occurrences[number] = 0;
  }

  occurrences[number] += 1;
}

let similarityScore = 0;
for (const number of leftList) {
  if (occurrences[number]) {
    similarityScore += number * occurrences[number];
  }
}

console.log(similarityScore);
