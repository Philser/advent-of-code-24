const OBSTACLE_CHAR = '#';
const Directions = {
  Up: '^',
  Down: 'v',
  Left: '<',
  Right: '>',
};


// Ursprüngliche Annahme: Loop ist erkannt wenn Guard wieder an Starting Pos ankommt und Direction gleich ist
// Aber: Falsch, kann auch später in eine Loop gelockt werden und nie an seine Ausgangspos. zurückkommen
// Neue Idee: Check für Pos + Direction für jede besuchte Position. Wenn Pos+Dir schon mal vorkamen, dann Loop
export function countAllPossibleObstaclePositions(input) {
  const map = [];
  let startingPos = { x: 0, y: 0 };

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

  let suitableObstalcePositions = new Set();
  let startingDirection = map[startingPos.y][startingPos.x];
  let oldPos;
  for (let y = 0; y < map.length; y++) {
    columnLoop: for (let x = 0; x < map[0].length; x++) {
      if (x === startingPos.x && y === startingPos.y) {
        continue;
      }
      let alteredMap = structuredClone(map);
      alteredMap[y][x] = OBSTACLE_CHAR;

      let currPos = { x: startingPos.x, y: startingPos.y };
      let direction = startingDirection;
      while (
        currPos.x >= 0 &&
        currPos.y >= 0 &&
        currPos.x < alteredMap[0].length &&
        currPos.y < alteredMap.length
      ) {
        alteredMap[currPos.y][currPos.x] = direction;
        oldPos = { x: currPos.x, y: currPos.y };
        ({ nextPos: currPos, direction } = makeStep(
          currPos,
          alteredMap,
          direction
        ));
        alteredMap[oldPos.y][oldPos.x] = 'X';
        if (
          currPos.x === startingPos.x &&
          currPos.y === startingPos.y &&
          direction === startingDirection
        ) {
          // Detected loop
          suitableObstalcePositions.add(`${currPos.x}|${currPos.y}`);
          continue columnLoop;
        }
      }
      // escaped while loop thus guard is out of map (no loop for this obstacle)
    }
  }

  return suitableObstalcePositions.size;
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
