const PRICE_A = 3;
const PRICE_B = 1;

// I only found this out by reading comments, but we can treat the inputs as linear equations, because apparently
// there is only one solution per machine. Since the text wants you to find the MINIMUM amount of tokens for the most prizes
// this is unexpected as I thought there would be multiple solutions and we had to optimize. But this way it's rather trivial.
// (Or maybe I am just dumb.)
export function determineFewestTokensToWinAllPrizes2(input) {
  const machines = parseInput(input);
  let totalCosts = 0;
  for (const machine of machines) {
    // m * ax + n * bx = prizeX
    // m * ay + n * by = prizeY
    // m = (prize.y - n * b.y) / a.y
    // n = (-a.x * b.y + b.x * a.y) / (prize.x * a.y - prize.y * a.x)
    const n =
      (machine.prize.x * machine.A.y - machine.prize.y * machine.A.x) /
      (-1 * machine.A.x * machine.B.y + machine.B.x * machine.A.y);
    if (n % 1 !== 0) continue;
    const m = (machine.prize.y - n * machine.B.y) / machine.A.y;
    if (m % 1 !== 0) continue;

    totalCosts += PRICE_A * m + PRICE_B * n;
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
          x: parseInt(prizeMatch[1]) + 10_000_000_000_000,
          y: parseInt(prizeMatch[2]) + 10_000_000_000_000,
        },
      };
    });
}
