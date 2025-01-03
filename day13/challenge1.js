const PRICE_A = 3;
const PRICE_B = 1;

export function determineFewestTokensToWinAllPrizes(input) {
  const machines = parseInput(input);
  let totalCosts = 0;
  for (const machine of machines) {
    let solutionPrice = Infinity;
    for (let a = 0; a <= 100; a++) {
      for (let b = 0; b <= 100; b++) {
        if (
          a * machine.A.x + b * machine.B.x === machine.prize.x &&
          a * machine.A.y + b * machine.B.y === machine.prize.y
        ) {
          let tokens = PRICE_A * a + PRICE_B * b;
          if (tokens < solutionPrice) solutionPrice = tokens;
        }
      }
    }
    if (solutionPrice !== Infinity) totalCosts += solutionPrice;
  }

  return totalCosts;
}

function parseInput(input) {
  return input
    .split('\n\n')
    .filter((i) => i !== '')
    .map((machineText) => {
      const lines = machineText.split('\n');
      const aMatch = lines[0].match(/X\+(\d+), Y\+(\d+)/);
      const bMatch = lines[1].match(/X\+(\d+), Y\+(\d+)/);
      const prizeMatch = lines[2].match(/X=(\d+), Y=(\d+)/);

      return {
        A: {
          x: parseInt(aMatch[1]),
          y: parseInt(aMatch[2]),
        },
        B: {
          x: parseInt(bMatch[1]),
          y: parseInt(bMatch[2]),
        },
        prize: {
          x: parseInt(prizeMatch[1]),
          y: parseInt(prizeMatch[2]),
        },
      };
    });
}
