const PARSED = '!';

export function calculatePlotCosts(input) {
  let map = input.split('\n');
  if (map[map.length - 1] === '') {
    map = map.slice(0, -1);
  }
  map = map.map((row) => row.split(''));
  const plotMaps = parsePlotMaps(map);

  let costs = 0;
  for (const plotMap of plotMaps) {
    let area = 0;
    let perimiter = 0;
    for (let y = 0; y < plotMap.length; y++) {
      for (let x = 0; x < plotMap[0].length; x++) {
        let curr = plotMap[y][x];
        // find plot borders and add perimiter for each one
        if (curr === 1) {
          area += 1;
          const conditions = [
            x === 0,
            x === plotMap[0].length - 1,
            y === 0,
            y === plotMap.length - 1,
          ];
          conditions.forEach((c) => {
            if (c) {
              perimiter += 1;
            }
          });
        } else {
          const conditions = [
            y + 1 < plotMap.length && plotMap[y + 1][x] === 1,
            x + 1 < plotMap[0].length && plotMap[y][x + 1] === 1,
            y > 0 && plotMap[y - 1][x] === 1,
            x > 0 && plotMap[y][x - 1] === 1,
          ];
          conditions.forEach((c) => {
            if (c) {
              perimiter += 1;
            }
          });
        }
      }
    }
    costs += perimiter * area;
  }

  return costs;
}

function parsePlotMaps(map) {
  // Create a map for each plot of its shape
  // return all maps plot
  let plots = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      let curr = map[y][x];
      if (curr === PARSED) continue;
      let newPlot = [];
      visitPlotPos(map, curr, newPlot, { x, y });
      plots.push(newPlot);
    }
  }

  let plotMaps = [];
  for (const plot of plots) {
    let lowX = map.length,
      lowY = map.length;
    let highX = 0,
      highY = 0;
    for (const pos of plot) {
      // figure out the plot measures
      if (pos.x < lowX) {
        lowX = pos.x;
      }
      if (pos.x > highX) {
        highX = pos.x;
      }

      if (pos.y < lowY) {
        lowY = pos.y;
      }
      if (pos.y > highY) {
        highY = pos.y;
      }
    }

    let plotMap = [];
    new Array(highY - lowY + 1).values().forEach(() => {
      plotMap.push(new Array(highX - lowX + 1).fill(0));
    });

    for (const pos of plot) {
      plotMap[pos.y - lowY][pos.x - lowX] = 1;
    }
    plotMaps.push(plotMap);
  }

  return plotMaps;
}

function visitPlotPos(map, plant, plot, pos) {
  if (map[pos.y][pos.x] === plant) {
    plot.push({ x: pos.x, y: pos.y });
    map[pos.y][pos.x] = PARSED;

    if (pos.y > 0) visitPlotPos(map, plant, plot, { x: pos.x, y: pos.y - 1 });
    if (pos.y < map.length - 1)
      visitPlotPos(map, plant, plot, { x: pos.x, y: pos.y + 1 });
    if (pos.x > 0) visitPlotPos(map, plant, plot, { x: pos.x - 1, y: pos.y });
    if (pos.x < map[0].length - 1)
      visitPlotPos(map, plant, plot, { x: pos.x + 1, y: pos.y });

    return;
  } else {
    return;
  }
}
