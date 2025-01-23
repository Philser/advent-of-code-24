export function countAllValidDesignCombinations(input) {
  const { designs, towels } = parseInput(input);

  let valid = 0;
  for (const des of designs) {
    let subPossible = new Array(des.length + 1).fill(0);
    subPossible[0] = 1;
    outer: for (let i = 1; i < des.length + 1; i++) {
      for (const t of towels) {
        let sub = des.substring(i - t.length, i);
        if (i >= t.length && sub === t && subPossible[i - t.length]) {
          subPossible[i] += subPossible[i - t.length];
        }
      }
    }

    if (subPossible[des.length]) {
      valid += subPossible[des.length];
    }
  }

  return valid;
}

function parseInput(input) {
  const lines = input.split('\n\n');
  const towels = new Set();
  lines[0].split(', ').forEach((d) => towels.add(d));

  let designs = lines[1].split('\n');
  designs =
    designs[designs.length - 1] === ''
      ? (designs = designs.slice(0, -1))
      : designs;

  return { towels, designs };
}
