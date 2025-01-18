// Damn this is slow
export function findStepsToExist(input, memorySpaceDimensions, waitForBytes) {
  let fallingBytesList = parseInput(input);
  let memorySpace = Array.from(new Array(memorySpaceDimensions.y + 1), () =>
    new Array(memorySpaceDimensions.x + 1).fill('.')
  );

  for (let i = 0; i < waitForBytes; i++) {
    let bytePos = fallingBytesList[i];
    memorySpace[bytePos.y][bytePos.x] = '#';
  }

  return findShortestPathToTarget(
    memorySpace,
    { x: 0, y: 0 },
    { x: memorySpace[0].length - 1, y: memorySpace.length - 1 }
  );
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

function findShortestPathToTarget(memorySpace, start, target) {
  const graph = {};
  const dist = {};
  const prev = {};
  for (let y = 0; y < memorySpace.length; y++) {
    for (let x = 0; x < memorySpace[0].length; x++) {
      graph[`${x}|${y}`] = {
        x,
        y,
        neighbours: getVertexNeighbours({ x, y }, memorySpace),
        name: `${x}|${y}`,
      };
    }
  }

  const q = new Set();
  for (const vertex of Object.values(graph)) {
    dist[vertex.name] = Infinity;
    prev[vertex.name] = undefined;
    q.add(vertex.name);
  }

  let startName = `${start.x}|${start.y}`;
  let targetName = `${target.x}|${target.y}`;
  dist[startName] = 0;
  while (q.size > 0) {
    let shortestDist = Infinity;
    let u = null;
    for (const vName of q.values()) {
      if (vName === targetName) {
        break;
      }

      if (dist[vName] < shortestDist) {
        shortestDist = dist[vName];
        u = graph[vName];
      }
    }
    if (shortestDist === Infinity) {
      break;
    }
    q.delete(u.name);

    for (const neighbour of u.neighbours) {
      let neighbourName = `${neighbour.x}|${neighbour.y}`;
      if (q.has(neighbourName)) {
        let alt = shortestDist + 1;
        if (alt < dist[neighbourName]) {
          dist[neighbourName] = alt;
          prev[neighbourName] = u;
        }
      }
    }
  }

  return dist[targetName];
}

function getVertexNeighbours(vCoords, memorySpace) {
  let neighbours = [];
  let { x, y } = vCoords;
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
