const OBSTACLE_CHAR = '#';
const ADDITIONAL_OBSTACLE_CHAR = 'O';
const Directions = {
  Up: '^',
  Down: 'v',
  Left: '<',
  Right: '>',
};

// Try placing an obstacle in every possible position and simulate the guard's path.
// If the guard ever visits a position it has already visited and their direciton is the same, too, then the obstacle is in a loop.
export function countAllPossibleObstaclePositions(input) {
  const map = [];
  let startingPos = { x: 0, y: 0 };
  const obstacleMaps = [];

  let row;
  let rows = input.split('\n');
  if (rows[rows.length - 1] === '') {
    rows = rows.slice(0, -1);
  }
  for (const [y, chars] of rows.entries()) {
    row = [];
    for (let x = 0; x < chars.length; x++) {
      row.push(chars[x]);
      if (Object.values(Directions).includes(chars[x])) {
        startingPos = { x, y };
      }
    }
    map.push(row);
  }

  let startingDirection = map[startingPos.y][startingPos.x];
  for (let y = 0; y < map.length; y++) {
    columnLoop: for (let x = 0; x < map[0].length; x++) {
      if (x === startingPos.x && y === startingPos.y) {
        continue;
      }
      let alteredMap = structuredClone(map);
      alteredMap[y][x] = ADDITIONAL_OBSTACLE_CHAR;

      let currPos = { x: startingPos.x, y: startingPos.y };
      let oldPos = { x: startingPos.x, y: startingPos.y };
      let direction = startingDirection;
      let oldDirection = direction;
      let visitedPosAndDir = new Set();
      visitedPosAndDir.add(
        `${startingPos.x}|${startingPos.y}|${startingDirection}`
      );
      while (
        currPos.x >= 0 &&
        currPos.y >= 0 &&
        currPos.x < alteredMap[0].length &&
        currPos.y < alteredMap.length
      ) {
        setGuardPathCharInMap(
          alteredMap,
          currPos,
          oldPos,
          direction,
          oldDirection
        );
        oldPos = { x: currPos.x, y: currPos.y };
        oldDirection = direction;
        visitedPosAndDir.add(`${currPos.x}|${currPos.y}|${direction}`);
        ({ nextPos: currPos, direction } = makeStep(
          currPos,
          alteredMap,
          direction
        ));
        if (visitedPosAndDir.has(`${currPos.x}|${currPos.y}|${direction}`)) {
          // Detected loop
          obstacleMaps.push(alteredMap);
          continue columnLoop;
        }
      }
      // escaped while loop thus guard is out of map (no loop for this obstacle)
    }
  }

  return obstacleMaps;
}

function makeStep(currPos, map, direction, depth) {
  if (depth && depth > 3) {
    throw Error('Infinite loop detected when moving guard');
  }

  let nextPos = null;
  let move = { x: 0, y: 0 };

  switch (direction) {
    case Directions.Left:
      move = { x: -1, y: 0 };
      break;
    case Directions.Right:
      move = { x: 1, y: 0 };
      break;
    case Directions.Up:
      move = { x: 0, y: 0 - 1 };
      break;
    case Directions.Down:
      move = { x: 0, y: 1 };
      break;
    default:
      throw Error(`Provided unknown guard direction ${direction}`);
  }

  let newDirection = direction;
  nextPos = { x: currPos.x + move.x, y: currPos.y + move.y };
  if (
    !(nextPos.x < 0 || nextPos.y < 0) &&
    !(nextPos.x >= map[0].length || nextPos.y >= map.length) &&
    (map[nextPos.y][nextPos.x] === OBSTACLE_CHAR ||
      map[nextPos.y][nextPos.x] === ADDITIONAL_OBSTACLE_CHAR)
  ) {
    newDirection = getDirectionAfterTurn(direction);
    nextPos = currPos;
  }

  return { nextPos, direction: newDirection };
}

function getDirectionAfterTurn(direction) {
  switch (direction) {
    case Directions.Left:
      return Directions.Up;
    case Directions.Right:
      return Directions.Down;
    case Directions.Up:
      return Directions.Right;
    case Directions.Down:
      return Directions.Left;
    default:
      throw Error(`Provided unknown guard direction ${direction}`);
  }
}

function setGuardPathCharInMap(map, currPos, oldPos, direction, oldDirection) {
  map[currPos.y][currPos.x] = direction;

  if (map[oldPos.y][oldPos.x] === '+') {
    return;
  }

  if (direction != oldDirection) {
    map[oldPos.y][oldPos.x] = '+';
    return;
  }

  if (direction === Directions.Up || direction === Directions.Down) {
    map[oldPos.y][oldPos.x] = '|';
    return;
  }

  if (direction === Directions.Left || direction === Directions.Right) {
    map[oldPos.y][oldPos.x] = '-';
    return;
  }
}
