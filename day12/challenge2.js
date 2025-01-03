const PARSED = '!';

export function calculateDiscountedPlotCosts(input) {
  let map = input.split('\n');
  if (map[map.length - 1] === '') {
    map = map.slice(0, -1);
  }
  map = map.map((row) => row.split(''));
  const plotMaps = parsePlotMaps(map);

  let costs = 0;
  for (const plotMap of plotMaps) {
    let area = 0;
    let topFences = [];
    let bottomFences = [];
    let leftFences = [];
    let rightFences = [];
    for (let y = 0; y < plotMap.length; y++) {
      for (let x = 0; x < plotMap[0].length; x++) {
        let curr = plotMap[y][x];
        // find plot borders and add perimiter for each one
        if (curr === 1) {
          area += 1;
          if (x === 0) leftFences.push({ x, y });
          if (x > 0 && plotMap[y][x - 1] === 0) leftFences.push({ x, y });

          if (x === plotMap[0].length - 1) rightFences.push({ x, y });
          if (x + 1 < plotMap[0].length && plotMap[y][x + 1] === 0)
            rightFences.push({ x, y });

          if (y === 0) topFences.push({ x, y });
          if (y > 0 && plotMap[y - 1][x] === 0) topFences.push({ x, y });

          if (y === plotMap.length - 1) bottomFences.push({ x, y });
          if (y + 1 < plotMap.length && plotMap[y + 1][x] === 0)
            bottomFences.push({ x, y });
        }
      }
    }

    let sides = 0;
    function countHorizontalFences(fences) {
      fences.sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y));

      let sides = 1;
      let prev = fences[0];
      for (let i = 1; i < fences.length; i++) {
        if (fences[i].y !== prev.y || fences[i].x !== prev.x + 1) sides += 1;
        prev = fences[i];
      }
      return sides;
    }
    function countVerticalFences(fences) {
      fences.sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));

      let sides = 1;
      let prev = fences[0];
      for (let i = 1; i < fences.length; i++) {
        if (fences[i].x !== prev.x || fences[i].y !== prev.y + 1) sides += 1;
        prev = fences[i];
      }
      return sides;
    }
    sides += countHorizontalFences(topFences);
    sides += countHorizontalFences(bottomFences);
    sides += countVerticalFences(rightFences);
    sides += countVerticalFences(leftFences);

    costs += area * sides;
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
