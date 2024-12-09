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
console.log(maxFileId, diskMap);

const defarg = () => {
  let fileId = maxFileId;
  while (fileId > 0) {
    const lastIndexOfFileId = diskMap.lastIndexOf(fileId);
    const firstIndexOfEmpty = diskMap.indexOf(null);
    if (firstIndexOfEmpty > lastIndexOfFileId) {
      fileId--;
      continue;
    }
    diskMap[firstIndexOfEmpty] = fileId;
    diskMap[lastIndexOfFileId] = null;
  }
};

defarg();

console.log(diskMap);

const getChecksum = () => {
  let checksum = 0;
  for (let i = 0; i < diskMap.length; i++) {
    const fileId = diskMap[i];
    if (fileId === null) {
      break;
    }
    checksum += fileId * i;
  }
  return checksum;
};

console.log(getChecksum());
