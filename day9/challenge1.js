export function calculateFilesystemChecksum(input) {
  const { filesystem, totalDigitsInFs } = createFilesystemFromInput(input);
  const reorderedFilesystem = defragmentFilesystem(filesystem, totalDigitsInFs);
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

function defragmentFilesystem(filesystem, totalDigitsInFs) {
  let leftCounter = 0;
  let rightCounter = filesystem.length - 1;
  let reorderedFilesystem = '';
  while (leftCounter < totalDigitsInFs) {
    if (filesystem[leftCounter] !== '.') {
      reorderedFilesystem += filesystem[leftCounter];
      leftCounter += 1;
      continue;
    }

    while (filesystem[rightCounter] === '.') {
      rightCounter -= 1;
    }

    reorderedFilesystem += filesystem[rightCounter];
    rightCounter -= 1;
    leftCounter += 1;
  }

  return reorderedFilesystem;
}

function calulcateChecksum(filesystem) {
  let checksum = 0;
  for (let i = 0; i < filesystem.length; i++) {
    checksum += (filesystem.charCodeAt(i) - 48) * i;
  }

  return checksum;
}
