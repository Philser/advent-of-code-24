export function calculateGPSSumsWide(input) {
  const spl = input.split('\n\n');
  const map = spl[0].split('\n').map((line) => {
    let newLine = '';
    line.split('').forEach((c) => {
      switch (c) {
        case '#':
          newLine += '##';
          break;
        case 'O':
          newLine += '[]';
          break;
        case '.':
          newLine += '..';
          break;
        case '@':
          newLine += '@.';
          break;
        default:
          return;
      }
    });
    return newLine.split('');
  });
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
  100 + 9 + 200 + 9 + 200 + 8;

  let barrelsToMove = 1;
  for (let c = 3; robotPos.x - c >= 0; c += 2) {
    if (map[robotPos.y][robotPos.x - c] === '.') {
      break;
    }
    if (map[robotPos.y][robotPos.x - c] === '#') {
      // Reached wall, cannot move
      return;
    }
    barrelsToMove += 1;
  }

  for (let pos = barrelsToMove * 2; pos > 0; pos--) {
    let char = pos % 2 === 0 ? '[' : ']';
    map[robotPos.y][robotPos.x - pos - 1] = char;
  }
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
  for (let c = 3; robotPos.x + c < map[0].length; c += 2) {
    if (map[robotPos.y][robotPos.x + c] === '.') {
      break;
    }
    if (map[robotPos.y][robotPos.x + c] === '#') {
      // Reached wall, cannot move
      return;
    }
    barrelsToMove += 1;
  }

  for (let pos = barrelsToMove * 2; pos > 0; pos--) {
    let char = pos % 2 === 0 ? ']' : '[';
    map[robotPos.y][robotPos.x + pos + 1] = char;
  }
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

  let moveableBarrelPositions = [];
  const barrelsMovable = barrelPartCanMove(
    map,
    { y: robotPos.y - 1, x: robotPos.x },
    '^',
    moveableBarrelPositions
  );

  let moved = new Set();
  if (barrelsMovable) {
    for (const pos of moveableBarrelPositions.sort((a, b) =>
      a.y !== b.y ? a.y - b.y : a.x - b.x
    )) {
      if (moved.has(`${pos.x}|${pos.y}`)) continue;
      map[pos.y - 1][pos.x] = map[pos.y][pos.x];
      map[pos.y][pos.x] = '.';
      moved.add(`${pos.x}|${pos.y}`);
    }
    map[robotPos.y - 1][robotPos.x] = '@';
    map[robotPos.y][robotPos.x] = '.';
    robotPos.y -= 1;
  }
}

function moveRobotDown(map, robotPos) {
  if (map[robotPos.y + 1][robotPos.x] === '#') return;

  if (map[robotPos.y + 1][robotPos.x] === '.') {
    map[robotPos.y + 1][robotPos.x] = '@';
    map[robotPos.y][robotPos.x] = '.';
    robotPos.y += 1;
    return;
  }

  let moveableBarrelPositions = [];
  const barrelsMovable = barrelPartCanMove(
    map,
    { y: robotPos.y + 1, x: robotPos.x },
    'v',
    moveableBarrelPositions
  );

  let moved = new Set();
  if (barrelsMovable) {
    for (const pos of moveableBarrelPositions.sort((a, b) =>
      a.y !== b.y ? b.y - a.y : a.x - b.x
    )) {
      if (moved.has(`${pos.x}|${pos.y}`)) continue;
      map[pos.y + 1][pos.x] = map[pos.y][pos.x];
      map[pos.y][pos.x] = '.';
      moved.add(`${pos.x}|${pos.y}`);
    }
    map[robotPos.y + 1][robotPos.x] = '@';
    map[robotPos.y][robotPos.x] = '.';
    robotPos.y += 1;
  }
}

function calculateGps(map) {
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '[') {
        let topDistance = y;
        let leftDistance = x;
        sum += 100 * y + x;
      }
    }
  }

  return sum;
}

function barrelPartCanMove(map, pos, direction, moveableBarrelPositions) {
  let nextY = direction === '^' ? pos.y - 1 : pos.y + 1;

  let thisCanMove = false;
  switch (map[pos.y][pos.x]) {
    case '.':
      return true;
    case '#':
      return false; // return early
    case '[':
      thisCanMove =
        barrelPartCanMove(
          map,
          { y: nextY, x: pos.x },
          direction,
          moveableBarrelPositions
        ) &&
        barrelPartCanMove(
          map,
          { y: nextY, x: pos.x + 1 },
          direction,
          moveableBarrelPositions
        );
      if (thisCanMove) {
        moveableBarrelPositions.push({ y: pos.y, x: pos.x });
        moveableBarrelPositions.push({ y: pos.y, x: pos.x + 1 });
      }
      return thisCanMove;
    case ']':
      thisCanMove =
        barrelPartCanMove(
          map,
          { y: nextY, x: pos.x },
          direction,
          moveableBarrelPositions
        ) &&
        barrelPartCanMove(
          map,
          { y: nextY, x: pos.x - 1 },
          direction,
          moveableBarrelPositions
        );
      if (thisCanMove) {
        moveableBarrelPositions.push({ y: pos.y, x: pos.x });
        moveableBarrelPositions.push({ y: pos.y, x: pos.x - 1 });
      }

      return thisCanMove;
  }

  return thisCanMove;
}
