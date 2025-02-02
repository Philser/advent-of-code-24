import fs from 'fs';

export function findCheapestPath(input) {
  const { map, start, end } = parseInput(input);

  const q = [];
  q.push({ x: start.x, y: start.y, direction: '>' });
  map[start.y][start.x] = 0;
  while (q.length > 0) {
    const currV = q.pop();
    const nghbrs = getVertexNeighbours(currV, map);
    for (const nghbr of nghbrs) {
      let cell = map[nghbr.y][nghbr.x];
      let { dist: nghbrDist, direction: newDirection } =
        getNeighbourDistanceAndDirection(currV, currV.direction, nghbr);

      let newDist = nghbrDist + map[currV.y][currV.x];
      if (cell === '.' || (typeof cell === 'number' && cell > newDist)) {
        map[nghbr.y][nghbr.x] = newDist;
        q.push({ x: nghbr.x, y: nghbr.y, direction: newDirection });
      }
    }
  }

  let out = '';
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      out += '|' + map[row][col] + '|';
    }
    out += '\n';
  }
  fs.writeFileSync('./output.txt', out);
  return map[end.y][end.x];
}

function parseInput(input) {
  let rows = input.split('\n');
  if (rows[rows.length - 1] === '') {
    rows = rows.slice(0, -1);
  }
  const map = Array.from(new Array(rows.length), () => []);
  let start = null;
  let end = null;

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      let char = rows[row][col];
      if (char === 'S') {
        start = { x: col, y: row };
        char = '.';
      }
      if (char === 'E') {
        end = { x: col, y: row };
        char = '.';
      }
      map[row].push(char);
    }
  }

  return { map, start, end };
}

function getVertexNeighbours(vCoords, map) {
  let neighbours = [];
  let { x, y } = vCoords;
  if (y !== 0 && map[y - 1][x] !== '#') {
    neighbours.push({ x, y: y - 1 });
  }
  if (y !== map.length - 1 && map[y + 1][x] !== '#') {
    neighbours.push({ x, y: y + 1 });
  }
  if (x !== map[0].length - 1 && map[y][x + 1] !== '#') {
    neighbours.push({ x: x + 1, y });
  }
  if (x !== 0 && map[y][x - 1] !== '#') {
    neighbours.push({ x: x - 1, y });
  }

  return neighbours;
}

function getNeighbourDistanceAndDirection(currVertex, direction, neighbour) {
  let score = 1;

  let newDirection = direction;
  if (neighbour.y < currVertex.y) {
    newDirection = '^';
  }
  if (neighbour.y > currVertex.y) {
    newDirection = 'v';
  }
  if (neighbour.x < currVertex.x) {
    newDirection = '<';
  }
  if (neighbour.x > currVertex.x) {
    newDirection = '>';
  }

  if (direction !== newDirection) {
    score += 1000;
  }

  return { dist: score, direction: newDirection };
}
