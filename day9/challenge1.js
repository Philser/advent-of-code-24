export function calculateFilesystemChecksum(input) {
  const filesystem = createFilesystemFromInput(input);
  defragmentFilesystem(filesystem);

  return filesystem;
}

function createFilesystemFromInput(input) {
  let filesystem = '';
  let currType = 'file';
  let fileId = 0;

  for (let i = 0; i < input.length; i++) {
    if (currType === 'file') {
      let num = parseInt(input[i]);
      while (num > 0) {
        filesystem += fileId;
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

  return filesystem;
}

function defragmentFilesystem(filesystem) {}
