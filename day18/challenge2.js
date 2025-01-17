// This works but is eating away at the stack, there's probably a better approach
export function findBlockingBytePos(input, memorySpaceDimensions, skip) {
  let fallingBytesList = parseInput(input);
  let memorySpace = Array.from(new Array(memorySpaceDimensions.y + 1), () =>
    new Array(memorySpaceDimensions.x + 1).fill('.')
  );

  if (skip) {
    for (let i = 0; i < skip; i++) {
      let bytePos = fallingBytesList[i];
      memorySpace[bytePos.y][bytePos.x] = '#';
    }
  }

  let answerBytePos = findFirstPathBlockingByte(
    memorySpace,
    { x: memorySpace[0].length - 1, y: memorySpace.length - 1 },
    fallingBytesList.slice(skip)
  );

  return `${answerBytePos.x},${answerBytePos.y}`;
}

function parseInput(input) {
  let list = input.split('\n');
  if (list[list.length - 1] === '') {
    list = list.slice(0, -1);
  }

  return list.map((l) => {
    let coords = l.split(',');
    return { x: coords[0], y: coords[1] };
  });
}

function visitNeighbours(memorySpace, currVertex, visitedVertices, target) {
  visitedVertices.push(currVertex);
  if (visitedHasVertex(visitedVertices, target)) {
    return;
  }

  const neighbours = getNodeNeighbours(currVertex, memorySpace);

  for (const neighbour of neighbours) {
    if (!visitedHasVertex(visitedVertices, neighbour)) {
      visitNeighbours(memorySpace, neighbour, visitedVertices, target);
    }
  }

  return;
}

function findFirstPathBlockingByte(memorySpace, target, fallingBytesList) {
  for (let i = 0; i < fallingBytesList.length; i++) {
    let fallingBytePos = fallingBytesList[i];
    memorySpace[fallingBytePos.y][fallingBytePos.x] = '#';

    const visitedVertices = [];
    visitNeighbours(memorySpace, [0, 0], visitedVertices, target);
    if (visitedHasVertex(visitedVertices, target)) {
      continue;
    }

    return fallingBytePos;
  }

  throw Error('No blocking byte found!');
}

function getNodeNeighbours(nodeCoords, memorySpace) {
  const neighbours = [];
  let x = nodeCoords[0];
  let y = nodeCoords[1];
  if (y !== 0 && memorySpace[y - 1][x] !== '#') {
    neighbours.push([x, y - 1]);
  }
  if (y !== memorySpace.length - 1 && memorySpace[y + 1][x] !== '#') {
    neighbours.push([x, y + 1]);
  }
  if (x !== memorySpace[0].length - 1 && memorySpace[y][x + 1] !== '#') {
    neighbours.push([x + 1, y]);
  }
  if (x !== 0 && memorySpace[y][x - 1] !== '#') {
    neighbours.push([x - 1, y]);
  }

  return neighbours;
}

function visitedHasVertex(visited, vertex) {
  for (const v of visited) {
    if (v[0] === vertex[0] && v[1] === vertex[1]) {
      return true;
    }
  }
  return false;
}
