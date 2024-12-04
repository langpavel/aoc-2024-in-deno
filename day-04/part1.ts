const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");
const matrix = lines.map((line) => line.split(""));

const sequence = ["X", "M", "A", "S"];

const isSequenceAt = (
  x: number,
  y: number,
  xi: number,
  yi: number,
): boolean => {
  for (let i = 0; i < sequence.length; i++) {
    if (matrix[x + i * xi]?.[y + i * yi] !== sequence[i]) {
      return false;
    }
  }
  return true;
};

let acc = 0;

for (let x = 0; x < matrix.length; x++) {
  for (let y = 0; y < matrix[x].length; y++) {
    if (isSequenceAt(x, y, 1, 0)) acc++;
    if (isSequenceAt(x, y, 0, 1)) acc++;
    if (isSequenceAt(x, y, 1, 1)) acc++;
    if (isSequenceAt(x, y, 1, -1)) acc++;

    if (isSequenceAt(x, y, -1, 0)) acc++;
    if (isSequenceAt(x, y, 0, -1)) acc++;
    if (isSequenceAt(x, y, -1, -1)) acc++;
    if (isSequenceAt(x, y, -1, 1)) acc++;
  }
}

console.log(sequence.join(""), acc);
