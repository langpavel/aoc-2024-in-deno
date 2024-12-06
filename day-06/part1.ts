const input = Deno.readTextFileSync("input.txt");

const lines = input.split("\n");
const matrix = lines.map((line) => line.split(""));

console.log(matrix);

const maxX = matrix[0].length;
const maxY = matrix.length;

console.log(maxX, maxY);

let curY = lines.findIndex((line) => line.includes("^"));
let curX = matrix[curY].findIndex((cell) => cell === "^");
console.log(curX, curY);
matrix[curY][curX] = "X";

let dirX = 0;
let dirY = -1;

let steps = 0;

while (curX >= 0 && curX < maxX && curY >= 0 && curY < maxY) {
  const nextCell = matrix[curY + dirY]?.[curX + dirX];
  if (nextCell === "." || nextCell === "X") {
    steps++;
    curX += dirX;
    curY += dirY;
    matrix[curY][curX] = "X";
  } else if (nextCell === "#") {
    const tmp = dirX;
    dirX = -dirY;
    dirY = tmp;
  } else {
    console.log("nextCell", nextCell);
    break;
  }

  console.log(matrix.map((line) => line.join("")).join("\n"));
  console.log("curX", curX, "curY", curY);
}

let visitedCount = 0;
for (const line of matrix) {
  for (const cell of line) {
    if (cell === "X") {
      visitedCount++;
    }
  }
}

console.log("steps", steps);
console.log("visitedCount", visitedCount);
