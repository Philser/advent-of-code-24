// This is awfully slow but I am keeping it to show the process
export function countStones(input, blinks) {
  let arr = input
    .replace('\n', '')
    .split(' ')
    .map((n) => parseInt(n));

  for (let b = 0; b < blinks; b++) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) {
        newArr.push(1);
        continue;
      }

      let str = `${arr[i]}`;
      if (str.length % 2 === 0) {
        newArr.push(str.slice(0, str.length / 2));
        let newNum = trimLeadingZero(str.slice(str.length / 2));
        newArr.push(newNum);
        continue;
      }

      newArr.push(arr[i] * 2024);
    }
    arr = newArr;
  }

  return arr.length;
}

function trimLeadingZero(numString) {
  let isZero = true;
  for (let i = 0; i < numString.length; i++) {
    if (isZero && numString[i] != 0) {
      isZero = false;
    }
  }

  return isZero ? 0 : parseInt(numString.replace(/^0+/, ''));
}
