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
  tops: Map<string, Set<string>>,
  route: string[] = [],
): void => {
  const newRoute = [...route, `${x},${y}`];
  const tryWalk = (x: number, y: number) => {
    if (matrix[y]?.[x] === search) {
      if (search < 9) {
        searchPaths(search + 1, x, y, tops, newRoute);
      } else {
        const routes = tops.get(`${x},${y}`) ?? new Set<string>();
        routes.add(newRoute.join(":"));
        tops.set(`${x},${y}`, routes);
      }
    }
  };

  tryWalk(x - 1, y);
  tryWalk(x + 1, y);
  tryWalk(x, y - 1);
  tryWalk(x, y + 1);
};

let totalPaths = 0;
let totalScore = 0;

for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
    const cell = matrix[y][x];
    if (cell === 0) {
      const tops = new Map<string, Set<string>>();
      searchPaths(1, x, y, tops);

      let trailHeadRating = 0;
      for (const [_, value] of tops.entries()) {
        trailHeadRating += value.size;
      }
      console.log(`${x},${y}: rating ${trailHeadRating}`);

      totalScore += trailHeadRating;

      totalPaths += tops.size;
    }
  }
}

console.log(totalPaths, totalScore);
