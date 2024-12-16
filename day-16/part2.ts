const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");
const field = lines.map((line) => line.split(""));

console.log(field.map((row) => row.join("")).join("\n"));

const getCharAt = (x: number, y: number) => {
  return field[y][x];
};

const findChar = (char: string): [number, number] | undefined => {
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (getCharAt(x, y) === char) {
        return [x, y] as [number, number];
      }
    }
  }
};

const start = findChar("S")!;
const finish = findChar("E")!;
console.log(start, finish);

const visited: Map<string, number> = new Map();

const seats = new Map<number, [number, number][]>();

const stack: [number, number, number, number, number, [number, number][]][] = [
  [start[0], start[1], 1, 0, 0, [start]],
];

const consumeStack = () => {
  while (stack.length > 0) {
    stack.sort((a, b) => a[4] - b[4]);
    const [x, y, dx, dy, prevCost, path] = stack.shift()!;

    // console.log("Visiting", x, y, dx, dy, prevCost);

    const charAtPos = getCharAt(x, y);

    if (charAtPos === "E") {
      console.log("Found finish at", x, y, prevCost);
      const pathSeg = seats.get(prevCost) ?? [];
      seats.set(prevCost, [...pathSeg, ...path]);
    } else if (charAtPos === "#") {
      throw new Error("Invalid path, hit wall");
    }

    const key = `${x},${y},${dx},${dy}`;
    if (visited.has(key)) {
      if (visited.get(key)! < prevCost) {
        continue;
      }
    }
    visited.set(key, prevCost);

    // Check straight
    if (getCharAt(x + dx, y + dy) !== "#") {
      stack.push([x + dx, y + dy, dx, dy, prevCost + 1, [...path, [
        x + dx,
        y + dy,
      ]]]);
    }

    // Check left
    if (getCharAt(x + dy, y - dx) !== "#") {
      stack.push([x + dy, y - dx, dy, -dx, prevCost + 1001, [...path, [
        x + dy,
        y - dx,
      ]]]);
    }

    // Check right
    if (getCharAt(x - dy, y + dx) !== "#") {
      stack.push([x - dy, y + dx, -dy, dx, prevCost + 1001, [...path, [
        x - dy,
        y + dx,
      ]]]);
    }
  }
};

consumeStack();

for (const [cost, path] of seats) {
  console.log(cost, new Set(path.map(([x, y]) => `${x},${y}`)).size);
}
