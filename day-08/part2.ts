const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");

const grid = lines.map((line) => line.split(""));

type Coords = [number, number];
const antenaCoords = new Map<string, Coords[]>();

const addAntena = (key: string, x: number, y: number) => {
  const coords = antenaCoords.get(key) || [];
  coords.push([x, y]);
  antenaCoords.set(key, coords);
};

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const symbol = grid[y][x];
    if (symbol === ".") continue;
    addAntena(symbol, x, y);
  }
}

const maxY = grid.length;
const maxX = grid[0].length;

const isInsideGrid = (x: number, y: number) =>
  x >= 0 && x < maxX && y >= 0 && y < maxY;

const uniqueAntinodes = new Set<string>();

for (const [_, coords] of antenaCoords) {
  // permutation of coords X coords
  const antinodes = new Set<string>();
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[j];
      const dx = x2 - x1;
      const dy = y2 - y1;
      let antinodeX = x2;
      let antinodeY = y2;
      while (isInsideGrid(antinodeX, antinodeY)) {
        antinodes.add(`${antinodeX},${antinodeY}`);
        uniqueAntinodes.add(`${antinodeX},${antinodeY}`);
        antinodeX += dx;
        antinodeY += dy;
      }
      antinodeX = x1;
      antinodeY = y1;
      while (isInsideGrid(antinodeX, antinodeY)) {
        antinodes.add(`${antinodeX},${antinodeY}`);
        uniqueAntinodes.add(`${antinodeX},${antinodeY}`);
        antinodeX -= dx;
        antinodeY -= dy;
      }
    }
  }
}
console.log(uniqueAntinodes.size);
