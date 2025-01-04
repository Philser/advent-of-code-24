export function determineSafetyFactor(mapDimensions, ticks, robotInputs) {
  const robots = parseRobotInputs(robotInputs);
  const positions = [];
  for (const mov of robots) {
    let endPos = {
      x: (mov.px + mov.vx * ticks) % mapDimensions.x,
      y: (mov.py + mov.vy * ticks) % mapDimensions.y,
    };
    positions.push({
      x: endPos.x < 0 ? mapDimensions.x + endPos.x : endPos.x,
      y: endPos.y < 0 ? mapDimensions.y + endPos.y : endPos.y,
    });
  }
  const quadrants = [
    {
      x1: 0,
      x2: Math.floor(mapDimensions.x / 2) - 1,
      y1: 0,
      y2: Math.floor(mapDimensions.y / 2) - 1,
      robots: 0,
    },
    {
      x1: Math.floor(mapDimensions.x / 2) + 1,
      x2: mapDimensions.x - 1,
      y1: 0,
      y2: Math.floor(mapDimensions.y / 2) - 1,
      robots: 0,
    },
    {
      x1: 0,
      x2: Math.floor(mapDimensions.x / 2) - 1,
      y1: Math.floor(mapDimensions.y / 2) + 1,
      y2: mapDimensions.y - 1,
      robots: 0,
    },
    {
      x1: Math.floor(mapDimensions.x / 2) + 1,
      x2: mapDimensions.x - 1,
      y1: Math.floor(mapDimensions.y / 2) + 1,
      y2: mapDimensions.y - 1,
      robots: 0,
    },
  ];

  for (const pos of positions) {
    for (const q of quadrants) {
      if (pos.x >= q.x1 && pos.x <= q.x2 && pos.y >= q.y1 && pos.y <= q.y2) {
        q.robots += 1;
      }
    }
  }

  return quadrants.reduce((factor, q) => {
    return (factor *= q.robots);
  }, 1);
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
