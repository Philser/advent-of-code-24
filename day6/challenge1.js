const OBSTACLE_CHAR = '#';
const Directions = {
  Up: '^',
  Down: 'v',
  Left: '<',
  Right: '>',
};

export function predictUniquePositions(input) {
  const map = [];
  let currPos = { x: 0, y: 0 };
  let guardPositions = new Set();

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
        currPos = { x, y };
      }
    }
    map.push(row);
  }

  let direction = map[currPos.y][currPos.x];
  let oldPos;
  while (
    currPos.x >= 0 &&
    currPos.y >= 0 &&
    currPos.x < map[0].length &&
    currPos.y < map.length
  ) {
    guardPositions.add(`${currPos.x}|${currPos.y}`);
    map[currPos.y][currPos.x] = direction;
    oldPos = { x: currPos.x, y: currPos.y };
    ({ nextPos: currPos, direction } = makeStep(currPos, map, direction));
    map[oldPos.y][oldPos.x] = 'X';
  }

  return { positions: guardPositions.size, map };
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
    map[nextPos.y][nextPos.x] === OBSTACLE_CHAR
  ) {
    newDirection = getDirectionAfterTurn(direction);
    ({ nextPos, direction } = makeStep(
      currPos,
      map,
      newDirection,
      (depth || 0) + 1
    ));
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
