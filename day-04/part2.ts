const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");
const matrix = lines.map((line) => line.split(""));

const sequence = ["M", "A", "S"];

const isSequenceAt = (
  x: number,
  y: number,
  xi: number,
  yi: number,
): boolean => {
  for (let i = -1; i <= 1; i++) {
    if (matrix[x + i * xi]?.[y + i * yi] !== sequence[i + 1]) {
      return false;
    }
  }
  return true;
};

let acc = 0;

for (let x = 0; x < matrix.length; x++) {
  for (let y = 0; y < matrix[x].length; y++) {
    if (
      (isSequenceAt(x, y, 1, 1) || isSequenceAt(x, y, -1, -1)) &&
      (isSequenceAt(x, y, -1, 1) || isSequenceAt(x, y, 1, -1))
    ) acc++;
  }
}

console.log(sequence.join(""), acc);
