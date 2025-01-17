export function calulateTrailheadScoreSum(input) {
  let map = input.split('\n');
  if (input[input.length - 1] === '') {
    map = input.slice(0, -1);
  }
  const trailheads = [];
  map = map.map((r) => r.split(''));
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '0') {
        trailheads.push({ x, y });
      }
    }
  }

  let sum = 0;
  for (const head of trailheads) {
    const peakSet = new Set();
    findPeaks(map, peakSet, head);
    sum += peakSet.size;
  }

  return sum;
}

function findPeaks(map, peakSet, pos) {
  if (map[pos.y][pos.x] === '9') {
    peakSet.add(`${pos.y}|${pos.x}`);
    return;
  }

  const positions = getNextClimbables(map, pos);
  if (positions.length === 0) {
    return;
  }

  return positions.forEach((pos) => {
    findPeaks(map, peakSet, pos);
  });
}

function getNextClimbables(map, pos) {
  let positions = [];
  let currHeight = map[pos.y][pos.x];

  let toCheck = [];
  if (pos.x - 1 >= 0) toCheck.push({ x: pos.x - 1, y: pos.y });
  if (pos.x + 1 < map[0].length) toCheck.push({ x: pos.x + 1, y: pos.y });
  if (pos.y - 1 >= 0) toCheck.push({ x: pos.x, y: pos.y - 1 });
  if (pos.y + 1 < map.length) toCheck.push({ x: pos.x, y: pos.y + 1 });

  toCheck.forEach((tc) => {
    if (map[tc.y][tc.x] === `${parseInt(currHeight) + 1}`) {
      positions.push({ x: tc.x, y: tc.y });
    }
  });

  return positions;
}
