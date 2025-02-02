// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+
const keypad = {
  A: { x: 2, y: 3 },
  0: { x: 1, y: 3 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
  forbidden: { x: 0, y: 3 },
};

//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+
const dirpad = {
  '<': { x: 0, y: 1 },
  v: { x: 1, y: 1 },
  '>': { x: 2, y: 1 },
  '^': { x: 1, y: 0 },
  A: { x: 2, y: 0 },
  forbidden: { x: 0, y: 0 },
};

function getSequenceToKey(curr, destChar, forbidden) {
  let moveIsForbidden = (newX, newY) =>
    newX === forbidden.x && newY === forbidden.y;

  // move one dimension first, then the other
  // check if forbidden is on line
  // if so, move other dimension first

  let tryMoveX = (currX, currY, destX) => {
    if (currX != destX) {
      if (currX < destX && !moveIsForbidden(currX + 1, currY)) {
        return { move: '>', x: 1 };
      } else if (currX > destX && !moveIsForbidden(currX - 1, currY)) {
        return { move: '<', x: -1 };
      }
    }
    return null;
  };

  let tryMoveY = (currX, currY, destY) => {
    if (currY != destY) {
      if (currY < destY && !moveIsForbidden(currX, currY + 1)) {
        return { move: 'v', y: 1 };
      } else if (currY > destY && !moveIsForbidden(currX, currY - 1)) {
        return { move: '^', y: -1 };
      }
    }
    return null;
  };

  let sequence = '';
  let { x: currX, y: currY } = curr;
  while (currY !== destChar.y || currX !== destChar.x) {
    while (currX !== destChar.x) {
      let moveX = tryMoveX(currX, currY, destChar.x);
      if (moveX === null) {
        // we hit forbidden, rewind and start moving along Y
        currX = curr.x;
        sequence = '';
        break;
      }
      sequence += moveX.move;
      currX += moveX.x;
    }

    while (currY !== destChar.y) {
      let moveY = tryMoveY(currX, currY, destChar.y);
      if (!moveY) {
        throw Error('Impossible movement expected');
      }
      sequence += moveY.move;
      currY += moveY.y;
    }
  }

  sequence += 'A';
  return sequence;
}

export function calculateComplexitiesSum(input) {
  let codes = input.split('\n');
  codes = codes[codes.length - 1] === '' ? codes.slice(0, -1) : codes;

  let pads = ['key', 'dir', 'dir'];
  let sum = 0;
  for (const code of codes) {
    let endSequence = '';
    for (const pad of pads) {
      if (pad === 'key') {
        let curr = keypad.A;
        let sequence = '';
        for (const char of code) {
          sequence += getSequenceToKey(curr, keypad[char], keypad.forbidden);
          curr = keypad[char];
        }
        endSequence = sequence;
      }

      if (pad === 'dir') {
        let curr = dirpad.A;
        let sequence = '';
        for (const char of endSequence) {
          sequence += getSequenceToKey(curr, dirpad[char], dirpad.forbidden);
          curr = dirpad[char];
        }
        endSequence = sequence;
      }
      console.log(endSequence);
    }
    console.log(`${endSequence.length} * ${parseInt(code.replace('A', ''))}`);
    sum += endSequence.length * parseInt(code.replace('A', ''));
    console.log('------------------');
  }

  return sum;
}
