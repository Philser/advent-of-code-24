// iterate through all once
// one state holder for each:
//  - horizontal forwards
//  - horizontal backwards
//  - vertical
//  - diagonal
export function findEveryXmas(input) {
  const lines = input.split('\n');

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
      if (isLegible(forwardTemp, forwardTarget, char)) {
        forwardTemp += char;
        if (forwardTemp === forwardTarget) {
          forwardTemp = '';
          counter += 1;
        }
      }

      if (isLegible(backwardsTemp, backwardsTarget, char)) {
        backwardsTemp += char;
        if (backwardsTemp === backwardsTarget) {
          backwardsTemp = '';
          counter += 1;
        }
      }

      let tempRowCol = { row, col };
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
        tempRowCol = { row: tempRowCol.row + 1, col: tempRowCol.col + 1 };
        if (
          tempRowCol.col >= lines[0].length ||
          tempRowCol.row >= lines.length
        ) {
          diagonalTemp = '';
          break;
        }
      }

      tempRowCol = { row, col };
      while (
        isLegible(
          diagonalTemp,
          backwardsTarget,
          lines[tempRowCol.row][tempRowCol.col]
        )
      ) {
        diagonalTemp += lines[tempRowCol.row][tempRowCol.col];
        if (diagonalTemp === backwardsTarget) {
          diagonalTemp = '';
          counter += 1;
          break;
        }
        tempRowCol = { row: tempRowCol.row + 1, col: tempRowCol.col + 1 };
        if (
          tempRowCol.col >= lines[0].length ||
          tempRowCol.row >= lines.length
        ) {
          diagonalTemp = '';
          break;
        }
      }

      tempRowCol = { row, col };
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

      tempRowCol = { row, col };
      while (
        isLegible(
          diagonalTemp,
          backwardsTarget,
          lines[tempRowCol.row][tempRowCol.col]
        )
      ) {
        diagonalTemp += lines[tempRowCol.row][tempRowCol.col];
        if (diagonalTemp === backwardsTarget) {
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
    }
  }

  // scan vertically
  for (let col = 0; col < lines[0].length; col++) {
    let forwardTemp = '';
    let backwardsTemp = '';

    for (let row = 0; row < lines.length; row++) {
      const char = lines[row][col];
      if (isLegible(forwardTemp, forwardTarget, char)) {
        forwardTemp += char;
        if (forwardTemp === forwardTarget) {
          forwardTemp = '';
          counter += 1;
        }
      }

      if (isLegible(backwardsTemp, backwardsTarget, char)) {
        backwardsTemp += char;
        if (backwardsTemp === backwardsTarget) {
          backwardsTemp = '';
          counter += 1;
        }
      }
    }
  }

  return counter;
}

function isLegible(forwardTemp, targetWord, char) {
  if (targetWord.startsWith(forwardTemp + char)) {
    return true;
  }
}
