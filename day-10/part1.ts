const input = Deno.readTextFileSync("input.txt");

const lines = input.split("\n");
const matrix = lines.map((line) => line.split("").map((cell) => Number(cell)));

console.log(matrix);

const maxX = matrix[0].length;
const maxY = matrix.length;

console.log(maxX, maxY);

const searchPaths = (
  search: number,
  x: number,
  y: number,
  tops: Set<string>,
): void => {
  const tryWalk = (x: number, y: number) => {
    if (matrix[y]?.[x] === search) {
      if (search < 9) {
        searchPaths(search + 1, x, y, tops);
      } else {
        tops.add(`${x},${y}`);
      }
    }
  };

  tryWalk(x - 1, y);
  tryWalk(x + 1, y);
  tryWalk(x, y - 1);
  tryWalk(x, y + 1);
};

let totalPaths = 0;

for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
    const cell = matrix[y][x];
    if (cell === 0) {
      const tops = new Set<string>();
      searchPaths(1, x, y, tops);
      console.log(x, y, tops);
      totalPaths += tops.size;
    }
  }
}

console.log(totalPaths);
