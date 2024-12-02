import { retrieveLocationIDLists } from './util.js';

const { leftList, rightList } = retrieveLocationIDLists(
  import.meta.dirname + '/input_day1.txt'
);

leftList.sort();
rightList.sort();

let distances = 0;
for (let i = 0; i < leftList.length; i++) {
  distances += Math.abs(leftList[i] - rightList[i]);
}
