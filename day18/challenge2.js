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

function visitNeighbours(memorySpace, currVertex, visitedNodes, target) {
  if (visitedNodes.has(`${currVertex.x}|${currVertex.y}`)) {
    return;
  }

  visitedNodes.add(`${currVertex.x}|${currVertex.y}`);
  if (visitedNodes.has(`${target.x}|${target.y}`)) {
    return;
  }

  const neighbours = getNodeNeighbours(
    { x: currVertex.x, y: currVertex.y },
    memorySpace
  );

  for (const neighbour of neighbours) {
    if (!visitedNodes.has(`${neighbour.x}|${neighbour.y}`)) {
      visitNeighbours(memorySpace, neighbour, visitedNodes, target);
    }
  }

  return;
}

function findFirstPathBlockingByte(memorySpace, target, fallingBytesList) {
  for (let i = 0; i < fallingBytesList.length; i++) {
    let fallingBytePos = fallingBytesList[i];
    memorySpace[fallingBytePos.y][fallingBytePos.x] = '#';

    const visitedVertices = new Set();
    visitNeighbours(memorySpace, { x: 0, y: 0 }, visitedVertices, target);
    if (visitedVertices.has(`${target.x}|${target.y}`)) {
      continue;
    }

    return fallingBytePos;
  }

  throw Error('No blocking byte found!');
}

function getNodeNeighbours(nodeCoords, memorySpace) {
  const neighbours = [];
  let { x, y } = nodeCoords;
  if (y !== 0 && memorySpace[y - 1][x] !== '#') {
    neighbours.push({ x, y: y - 1 });
  }
  if (y !== memorySpace.length - 1 && memorySpace[y + 1][x] !== '#') {
    neighbours.push({ x, y: y + 1 });
  }
  if (x !== memorySpace[0].length - 1 && memorySpace[y][x + 1] !== '#') {
    neighbours.push({ x: x + 1, y });
  }
  if (x !== 0 && memorySpace[y][x - 1] !== '#') {
    neighbours.push({ x: x - 1, y });
  }

  return neighbours;
}
