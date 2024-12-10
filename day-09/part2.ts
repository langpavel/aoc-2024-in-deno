const input = Deno.readTextFileSync("input.txt");

const denseMap = input.split("").map(Number);

let maxFileId = 0;
function* getFileId() {
  let index = 0;
  let fileId = 0;
  while (index < denseMap.length) {
    let len = denseMap[index];
    for (let i = 0; i < len; i++) {
      yield fileId;
    }
    index++;
    len = denseMap[index];
    for (let i = 0; i < len; i++) {
      yield null;
    }
    index++;
    maxFileId = fileId;
    fileId++;
  }
}
const diskMap = Array.from(getFileId());

// const writeDiskMap = (map = diskMap) => {
//   console.log(map.map((x) => x ?? ".").join(" "));
// };

const getFileSize = (fileId: number) => {
  return denseMap[fileId * 2];
};

const getFileIndex = (fileId: number) => {
  return diskMap.indexOf(fileId);
};

const findFreeSpace = (size: number): number => {
  let index = 0;
  while (index < diskMap.length) {
    if (diskMap[index] === null) {
      let i = index;
      while (diskMap[i] === null) {
        i++;
      }
      if (i - index >= size) {
        return index;
      }
      index = i;
    } else {
      index++;
    }
  }
  return -1;
};

// writeDiskMap(diskMap);

const moveFile = (fileId: number, from: number, to: number) => {
  const size = getFileSize(fileId);
  for (let i = 0; i < size; i++) {
    diskMap[from + i] = null;
    diskMap[to + i] = fileId;
  }
};

const defrag = () => {
  for (let i = maxFileId; i > 0; i--) {
    const size = getFileSize(i);
    const freeSpaceIndex = findFreeSpace(size);
    const fileIndex = getFileIndex(i);
    if (freeSpaceIndex >= 0 && freeSpaceIndex < fileIndex) {
      moveFile(i, getFileIndex(i), freeSpaceIndex);
      // writeDiskMap(diskMap);
    }
  }
};
defrag();

// writeDiskMap(diskMap);

const getChecksum = () => {
  let checksum = 0;
  for (let i = 0; i < diskMap.length; i++) {
    const fileId = diskMap[i];
    if (fileId !== null) {
      checksum += fileId * i;
    }
  }
  return checksum;
};
console.log(getChecksum());
