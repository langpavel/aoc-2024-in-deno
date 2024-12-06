// const input = Deno.readTextFileSync("input-desc.txt");
const input = Deno.readTextFileSync("input.txt");

const lines = input.split("\n");
const getMatrix = () => lines.map((line) => line.split(""));

const matrix = getMatrix();
const maxX = matrix[0].length;
const maxY = matrix.length;

const origY = lines.findIndex((line) => line.includes("^"));
const origX = matrix[origY].findIndex((cell) => cell === "^");

function isCycle(
  matrix: string[][],
  startX: number,
  startY: number,
  dx: number,
  dy: number,
) {
  const visited = new Set<string>();
  let curY = startY;
  let curX = startX;
  let dirX = dx;
  let dirY = dy;
  while (curX >= 0 && curX < maxX && curY >= 0 && curY < maxY) {
    const positionDirection = `${curX} ${dirX},  ${curY} ${dirY}`;
    if (visited.has(positionDirection)) {
      return true;
    }
    visited.add(positionDirection);
    // console.log(`\n\n${positionDirection}\n`);
    // console.log(matrix.map((line) => line.join("")).join("\n"));

    const nextX = curX + dirX;
    const nextY = curY + dirY;
    const nextCell = matrix[nextY]?.[nextX];
    if (nextCell === "." || nextCell === "^") {
      curX += dirX;
      curY += dirY;
    } else if (nextCell === "#") {
      const tmp = dirX;
      dirX = -dirY;
      dirY = tmp;
    } else {
      return false;
    }
  }
}

let obstaclesCount = 0;

for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
    const matrix = getMatrix();
    if (matrix[y][x] === ".") {
      matrix[y][x] = "#";
      if (isCycle(matrix, origX, origY, 0, -1)) {
        obstaclesCount++;
      }
    }
  }
  console.log("y", y);
}

console.log("obstacles", obstaclesCount);
