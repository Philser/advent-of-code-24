import fs from 'fs';

const f = fs.readFileSync(import.meta.dirname + '/input_day4.txt');
console.log(findEveryXmas(f.toString()));

export function findEveryXmas(input) {
  let lines = input.split('\n');
  if (lines[lines.length - 1] === '') {
    lines = lines.slice(0, -1);
  }

  let counter = 0;

  const forwardTarget = 'XMAS';
  const backwardsTarget = 'SAMX';

  // scan horizontally
  for (const [row, line] of lines.entries()) {
    let forwardTemp = '';
    let backwardsTemp = '';

    for (let col = 0; col < line.length; col++) {
      let diagonalTemp = '';
      const char = line[col];
      let scanResult;
      scanResult = handleChar(forwardTemp, forwardTarget, char);
      counter += scanResult.inc;
      forwardTemp = scanResult.newBuffer;

      scanResult = handleChar(backwardsTemp, backwardsTarget, char);
      counter += scanResult.inc;
      backwardsTemp = scanResult.newBuffer;

      // diagonal right-bound XMAS
      let tempRowCol = { row, col };
      diagonalTemp = '';
      while (
        isLegible(
          diagonalTemp,
          forwardTarget,
          lines[tempRowCol.row][tempRowCol.col]
        )
      ) {
        diagonalTemp += lines[tempRowCol.row][tempRowCol.col];
        if (diagonalTemp === forwardTarget) {
          counter += 1;
          break;
        }
        tempRowCol = { row: tempRowCol.row + 1, col: tempRowCol.col + 1 };
        if (
          tempRowCol.col >= lines[0].length ||
          tempRowCol.row >= lines.length
        ) {
          break;
        }
      }

      // diagonal right-bound SAMX
      tempRowCol = { row, col };
      diagonalTemp = '';
      while (
        isLegible(
          diagonalTemp,
          backwardsTarget,
          lines[tempRowCol.row][tempRowCol.col]
        )
      ) {
        diagonalTemp += lines[tempRowCol.row][tempRowCol.col];
        if (diagonalTemp === backwardsTarget) {
          counter += 1;
          break;
        }
        tempRowCol = { row: tempRowCol.row + 1, col: tempRowCol.col + 1 };
        if (
          tempRowCol.col >= lines[0].length ||
          tempRowCol.row >= lines.length
        ) {
          break;
        }
      }

      // diagonal left-bound XMAS
      tempRowCol = { row, col };
      diagonalTemp = '';
      while (
        isLegible(
          diagonalTemp,
          forwardTarget,
          lines[tempRowCol.row][tempRowCol.col]
        )
      ) {
        diagonalTemp += lines[tempRowCol.row][tempRowCol.col];
        if (diagonalTemp === forwardTarget) {
          diagonalTemp = '';
          counter += 1;
          break;
        }
        tempRowCol = { row: tempRowCol.row + 1, col: tempRowCol.col - 1 };
        if (tempRowCol.col < 0 || tempRowCol.row >= lines.length) {
          diagonalTemp = '';
          break;
        }
      }

      // diagonal left-bound SAMX
      tempRowCol = { row, col };
      diagonalTemp = '';
      while (
        isLegible(
          diagonalTemp,
          backwardsTarget,
          lines[tempRowCol.row][tempRowCol.col]
        )
      ) {
        diagonalTemp += lines[tempRowCol.row][tempRowCol.col];
        if (diagonalTemp === backwardsTarget) {
          counter += 1;
          break;
        }
        tempRowCol = { row: tempRowCol.row + 1, col: tempRowCol.col - 1 };
        if (tempRowCol.col < 0 || tempRowCol.row >= lines.length) {
          break;
        }
      }
    }
  }

  // scan vertically
  for (let col = 0; col < lines[0].length; col++) {
    let forwardTemp = '';
    let backwardsTemp = '';

    for (let row = 0; row < lines.length; row++) {
      const char = lines[row][col];
      let scanResult;
      scanResult = handleChar(forwardTemp, forwardTarget, char);
      counter += scanResult.inc;
      forwardTemp = scanResult.newBuffer;

      scanResult = handleChar(backwardsTemp, backwardsTarget, char);
      counter += scanResult.inc;
      backwardsTemp = scanResult.newBuffer;
    }
  }

  return counter;
}

function isLegible(forwardTemp, targetWord, char) {
  if (targetWord.startsWith(forwardTemp + char)) {
    return true;
  }
}

function handleChar(buffer, targetWord, char) {
  let newBuffer = char;
  let inc = 0;
  if (isLegible(buffer, targetWord, char)) {
    newBuffer = buffer + char;
    if (targetWord === newBuffer) {
      inc = 1;
      newBuffer = '';
    }
  }

  return {
    newBuffer,
    inc,
  };
}
