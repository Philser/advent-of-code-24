import fs from 'fs';

export function calculateFilesystemChecksum2(input) {
  const { filesystem } = createFilesystemFromInput(input);
  const reorderedFilesystem = defragmentFilesystem(filesystem);
  fs.writeFileSync('./output.txt', reorderedFilesystem);
  const checksum = calulcateChecksum(reorderedFilesystem);

  return checksum;
}

// Use ASCII characters as file IDs to be able to represent more than 10 values
function createFilesystemFromInput(input) {
  let filesystem = '';
  let currType = 'file';
  let fileId = 48; // ASCII 0
  let totalDigitsInFs = 0;
  for (let i = 0; i < input.length; i++) {
    if (currType === 'file') {
      let num = parseInt(input[i]);
      while (num > 0) {
        filesystem += String.fromCharCode(fileId);
        totalDigitsInFs += 1;
        num -= 1;
      }
      fileId += 1;
      currType = 'freeSpace';
    } else {
      let num = parseInt(input[i]);
      while (num > 0) {
        filesystem += '.';
        num -= 1;
      }
      currType = 'file';
    }
  }

  return { filesystem, totalDigitsInFs };
}

function defragmentFilesystem(filesystem) {
  let fsArray = filesystem.split('');
  let leftCounter = 0;
  let rightCounter = filesystem.length - 1;
  let currFileId = null;
  const seenFiles = new Set();
  while (currFileId != fsArray[0]) {
    while (
      fsArray[rightCounter] === '.' ||
      seenFiles.has(fsArray[rightCounter])
    ) {
      rightCounter -= 1;
    }

    currFileId = fsArray[rightCounter];
    seenFiles.add(currFileId);
    let requiredSpace = 1;
    let rightTmp = rightCounter - 1;
    while (fsArray[rightTmp] === currFileId) {
      requiredSpace += 1;
      rightTmp -= 1;
    }

    let freeSpace = 0;
    leftCounter = 0;

    while (leftCounter <= rightTmp) {
      if (fsArray[leftCounter] === '.') {
        freeSpace += 1;
      } else {
        freeSpace = 0;
      }
      if (freeSpace >= requiredSpace) {
        for (let i = 0; i < requiredSpace; i++) {
          fsArray[leftCounter - requiredSpace + 1 + i] =
            fsArray[rightCounter - i];
          fsArray[rightCounter - i] = '.';
        }
        break;
      }

      leftCounter += 1;
    }

    rightCounter = rightTmp;
  }

  return fsArray.join('');
}

function calulcateChecksum(filesystem) {
  let checksum = 0;
  for (let i = 0; i < filesystem.length; i++) {
    if (filesystem[i] === '.') continue;
    checksum += (filesystem.charCodeAt(i) - 48) * i;
  }

  return checksum;
}

