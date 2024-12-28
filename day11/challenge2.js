// The challenge1 approach crashes for 75 blinks so we need to rethink.
// I came up with a recursive algorithm that does not keep a list but keeps a counter that gets iterated for every number that is found
// at the target blink depth.
// However, that was still too slow. In the end, the trick was to memorize which number at which depth means how many numbers at the target depth.
// This is because there's lots of repetitions. I wasn't able to come up with this myself, had to check out the internet for that tip :(
export function countStonesEfficiently(input, blinks) {
  let arr = input
    .replace('\n', '')
    .split(' ')
    .map((n) => parseInt(n));

  let lookup = {};
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += explore(arr[i], blinks, 0, lookup);
  }

  return sum;
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

function explore(number, targetDepth, depth, lookup) {
  if (depth === targetDepth) {
    return 1;
  }

  if (lookup[`${number}|${depth}`]) {
    return lookup[`${number}|${depth}`];
  }

  if (number === 0) {
    return explore(1, targetDepth, depth + 1, lookup);
  }

  let str = `${number}`;
  let count = 0;
  if (str.length % 2 === 0) {
    let left = parseInt(str.slice(0, str.length / 2));
    let right = trimLeadingZero(str.slice(str.length / 2));

    count =
      explore(left, targetDepth, depth + 1, lookup) +
      explore(right, targetDepth, depth + 1, lookup);
  } else {
    count = explore(number * 2024, targetDepth, depth + 1, lookup);
  }

  lookup[`${number}|${depth}`] = count;
  return count;
}
