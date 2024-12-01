import fs from 'fs';

export function retrieveLocationIDLists(filePath) {
  const input = fs.readFileSync(filePath);

  const leftList = [];
  const rightList = [];
  for (const line of input.toString().split('\n')) {
    const lineNumbers = line.match(/(\d+)\s*(\d+)/);
    if (!lineNumbers) {
      //EOF
      break;
    }
    leftList.push(parseInt(lineNumbers[1]));
    rightList.push(parseInt(lineNumbers[2]));
  }

  return {
    leftList,
    rightList,
  };
}
