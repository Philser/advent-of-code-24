import fs from 'fs';

export async function simulateMovements(mapDimensions, ticks, robotInputs) {
  const robots = parseRobotInputs(robotInputs);
  let linesSanta = [];
  let linesTree = [];
  let x = 0;
  let y = 0;
  for (let t = 0; t < ticks; t++) {
    let lines = null;
    if (t === 18 + x * 100 + x * 1) {
      x += 1;
      lines = linesTree;
    } else if (t === 76 + y * 100 + y * 3) {
      y += 1;
      // This turned out to be a distraction but I thought this might eventually be a picture of santa clause and his reindeers, lol
      lines = linesSanta;
    } else {
      continue;
    }
    const positions = [];
    lines.push(`------------------Second ${t}------------------`);
    for (const rob of robots) {
      let endPos = {
        x: (rob.px + rob.vx * t) % mapDimensions.x,
        y: (rob.py + rob.vy * t) % mapDimensions.y,
      };
      positions.push({
        x: endPos.x < 0 ? mapDimensions.x + endPos.x : endPos.x,
        y: endPos.y < 0 ? mapDimensions.y + endPos.y : endPos.y,
      });
    }

    let map = [];
    for (let y = 0; y < mapDimensions.y; y++) {
      map.push(new Array(mapDimensions.x).fill('.'));
    }

    for (const pos of positions) {
      if (map[pos.y][pos.x] === '.') {
        map[pos.y][pos.x] = 1;
      } else {
        map[pos.y][pos.x] += 1;
      }
    }

    for (let y = 0; y < mapDimensions.y; y++) {
      let line = '';
      for (let x = 0; x < mapDimensions.x; x++) {
        line += map[y][x];
      }
      lines.push(line);
    }
    lines.push('--------------------------------------------');
  }

  fs.writeFileSync('./outputTree.txt', linesTree.join('\n'));
  fs.writeFileSync(
    import.meta.dirname + './outputTree.txt',
    linesTree.join('\n')
  );
  fs.writeFileSync(
    import.meta.dirname + './outputSanta.txt',
    linesSanta.join('\n')
  );

  return;
}

function parseRobotInputs(robotInputs) {
  let lines = robotInputs.split('\n');
  if (lines[lines.length - 1] === '') {
    lines = lines.slice(0, -1);
  }

  return lines.map((l) => {
    const rx = l.match(/p=(\-?\d+\,\-?\d+)\sv=(\-?\d+,\-?\d+)/);
    return {
      px: parseInt(rx[1].split(',')[0]),
      py: parseInt(rx[1].split(',')[1]),
      vx: parseInt(rx[2].split(',')[0]),
      vy: parseInt(rx[2].split(',')[1]),
    };
  });
}
