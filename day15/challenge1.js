export function calculateGPSSums(input) {
  const spl = input.split('\n\n');
  const map = spl[0].split('\n').map((line) => line.split(''));
  const instructions = spl[1];

  let robotPos = null;
  outer: for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '@') {
        robotPos = { x, y };
        break outer;
      }
    }
  }

  if (!robotPos) {
    throw Error('Could not find robot "@" in map');
  }

  for (let iPtr = 0; iPtr < instructions.length; iPtr++) {
    switch (instructions[iPtr]) {
      case '<':
        moveRobotLeft(map, robotPos);
        break;
      case '>':
        moveRobotRight(map, robotPos);
        break;
      case '^':
        moveRobotUp(map, robotPos);
        break;
      case 'v':
        moveRobotDown(map, robotPos);
        break;
    }
  }

  return calculateGps(map);
}

function moveRobotLeft(map, robotPos) {
  if (map[robotPos.y][robotPos.x - 1] === '#') return;

  if (map[robotPos.y][robotPos.x - 1] === '.') {
    map[robotPos.y][robotPos.x - 1] = '@';
    map[robotPos.y][robotPos.x] = '.';
    robotPos.x -= 1;
    return;
  }

  let barrelsToMove = 1;
  for (let c = 2; robotPos.x - c >= 0; c++) {
    if (map[robotPos.y][robotPos.x - c] === '.') {
      break;
    }
    if (map[robotPos.y][robotPos.x - c] === '#') {
      // Reached wall, cannot move
      return;
    }
    barrelsToMove += 1;
  }

  map[robotPos.y][robotPos.x - barrelsToMove - 1] = 'O';
  map[robotPos.y][robotPos.x - 1] = '@';
  map[robotPos.y][robotPos.x] = '.';
  robotPos.x -= 1;
}

function moveRobotRight(map, robotPos) {
  if (map[robotPos.y][robotPos.x + 1] === '#') return;

  if (map[robotPos.y][robotPos.x + 1] === '.') {
    map[robotPos.y][robotPos.x + 1] = '@';
    map[robotPos.y][robotPos.x] = '.';
    robotPos.x += 1;
    return;
  }

  let barrelsToMove = 1;
  for (let c = 2; robotPos.x + c < map[0].length; c++) {
    if (map[robotPos.y][robotPos.x + c] === '.') {
      break;
    }
    if (map[robotPos.y][robotPos.x + c] === '#') {
      // Reached wall, cannot move
      return;
    }
    barrelsToMove += 1;
  }

  map[robotPos.y][robotPos.x + barrelsToMove + 1] = 'O';
  map[robotPos.y][robotPos.x + 1] = '@';
  map[robotPos.y][robotPos.x] = '.';
  robotPos.x += 1;
}

function moveRobotUp(map, robotPos) {
  if (map[robotPos.y - 1][robotPos.x] === '#') return;

  if (map[robotPos.y - 1][robotPos.x] === '.') {
    map[robotPos.y - 1][robotPos.x] = '@';
    map[robotPos.y][robotPos.x] = '.';
    robotPos.y -= 1;
    return;
  }

  let barrelsToMove = 1;
  for (let c = 2; robotPos.y - c >= 0; c++) {
    if (map[robotPos.y - c][robotPos.x] === '.') {
      break;
    }
    if (map[robotPos.y - c][robotPos.x] === '#') {
      // Reached wall, cannot move
      return;
    }
    barrelsToMove += 1;
  }

  map[robotPos.y - barrelsToMove - 1][robotPos.x] = 'O';
  map[robotPos.y - 1][robotPos.x] = '@';
  map[robotPos.y][robotPos.x] = '.';
  robotPos.y -= 1;
}

function moveRobotDown(map, robotPos) {
  if (map[robotPos.y + 1][robotPos.x] === '#') return;

  if (map[robotPos.y + 1][robotPos.x] === '.') {
    map[robotPos.y + 1][robotPos.x] = '@';
    map[robotPos.y][robotPos.x] = '.';
    robotPos.y += 1;
    return;
  }

  let barrelsToMove = 1;
  for (let c = 2; robotPos.y + c < map.length; c++) {
    if (map[robotPos.y + c][robotPos.x] === '.') {
      break;
    }
    if (map[robotPos.y + c][robotPos.x] === '#') {
      // Reached wall, cannot move
      return;
    }

    barrelsToMove += 1;
  }

  map[robotPos.y + barrelsToMove + 1][robotPos.x] = 'O';
  map[robotPos.y + 1][robotPos.x] = '@';
  map[robotPos.y][robotPos.x] = '.';
  robotPos.y += 1;
}

function calculateGps(map) {
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 'O') {
        sum += 100 * y + x;
      }
    }
  }

  return sum;
}
