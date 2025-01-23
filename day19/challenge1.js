export function countValidDesigns(input) {
  const { designs, towels } = parseInput(input);

  // Word Break Problem
  let valid = 0;
  for (const des of designs) {
    let subPossible = new Array(des.length + 1).fill(false);
    subPossible[0] = true;
    outer: for (let i = 1; i < des.length + 1; i++) {
      for (const t of towels) {
        if (
          i >= t.length &&
          des.substring(i - t.length, i) === t &&
          subPossible[i - t.length]
        ) {
          subPossible[i] = true;
          continue outer;
        }
      }
    }

    if (subPossible[des.length]) {
      valid += 1;
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
