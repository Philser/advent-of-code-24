const INSTRUCTION_REGISTRY = {
  0: adv,
  1: bxl,
  2: bst,
  3: jnz,
  4: bxc,
  5: out,
  6: bdv,
  7: cdv,
};

export function bruteForceLowestRegisterAValue(input) {
  let { registers, instructions } = parseInput(input);

  let a = 200_000_000;
  let b = registers.B;
  let c = registers.C;
  let instrString = instructions.join(',');
  outer: while (a < 1_000_000_000) {
    registers.A = a;
    registers.B = b;
    registers.C = c;
    let ip = 0;
    let output = [];
    while (ip < instructions.length - 1) {
      const func = INSTRUCTION_REGISTRY[instructions[ip]];
      const input = instructions[ip + 1];

      switch (func) {
        case jnz:
          if (jnz(registers, input)) {
            ip = input;
            continue;
          }
          break;
        case out:
          let outputVal = out(registers, input);
          if (instructions[output.length] !== outputVal) {
            // outputted value is different from expected, we can stop trying this iteration
            a += 1;
            continue outer;
          }
          output.push(out(registers, input));
          break;
        default:
          func(registers, input);
      }

      ip += 2;
    }
    if (output.join(',') === instrString) {
      return a;
    }

    a += 1;
  }
  throw Error('Could not find feasible value until 1_000_000');
}

function parseInput(input) {
  let lines = input.split('\n');
  lines = lines[lines.lines - 1] === '' ? lines.slice(0, -1) : lines;

  let A = parseInt(lines[0].split(': ')[1]);
  let B = parseInt(lines[1].split(': ')[1]);
  let C = parseInt(lines[2].split(': ')[1]);
  let instructions = lines[4]
    .split('Program: ')[1]
    .split(',')
    .map((i) => parseInt(i));

  return {
    registers: {
      A,
      B,
      C,
    },
    instructions,
  };
}

function adv(registers, operand) {
  let denominator = Math.pow(2, getComboOperandValue(registers, operand));
  registers.A = Math.floor(registers.A / denominator);
}

function bxl(registers, operand) {
  registers.B = registers.B ^ operand;
}

function bst(registers, operand) {
  registers.B = getComboOperandValue(registers, operand) % 8;
}

function jnz(registers) {
  if (registers.A === 0) return false;

  return true;
}

function bxc(registers, operand) {
  registers.B = registers.B ^ registers.C;
}

function out(registers, operand) {
  return getComboOperandValue(registers, operand) % 8;
}

function bdv(registers, operand) {
  let denominator = Math.pow(2, getComboOperandValue(registers, operand));
  registers.B = Math.floor(registers.A / denominator);
}

function cdv(registers, operand) {
  let denominator = Math.pow(2, getComboOperandValue(registers, operand));
  registers.C = Math.floor(registers.A / denominator);
}

function getComboOperandValue(registers, operand) {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return registers.A;
    case 5:
      return registers.B;
    case 6:
      return registers.C;
    case 7:
      throw Error('Invalid program detected');
  }
}
