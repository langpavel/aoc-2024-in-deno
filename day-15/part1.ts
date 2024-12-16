const input = await Deno.readTextFile("input.txt");

const [mapInput, instructionsInput] = input.split("\n\n");

const warehouse = mapInput.split("\n").map((line) => line.split(""));
const HEIGHT = warehouse.length;
const WIDTH = warehouse[0].length;

const getItemAt = (x: number, y: number) => warehouse[y][x];
const setItemAt = (x: number, y: number, value: string) => {
  warehouse[y][x] = value;
};

let robotX = 0;
let robotY = 0;
const findRobot = () => {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (getItemAt(x, y) === "@") {
        robotX = x;
        robotY = y;
        // setItemAt(x, y, ".");
        return;
      }
    }
  }
};
findRobot();
console.log(robotX, robotY);

const instructionToIncrement: Record<string, [number, number]> = {
  "<": [-1, 0],
  ">": [1, 0],
  "^": [0, -1],
  "v": [0, 1],
};

const printWarehouse = () => {
  for (const row of warehouse) {
    console.log(row.join(""));
  }
};

const canMoveTo = (x: number, y: number, dx: number, dy: number): boolean => {
  const newX = x + dx;
  const newY = y + dy;
  const itemAtNew = getItemAt(newX, newY);
  switch (itemAtNew) {
    case "#":
      return false;
    case ".":
      return true;
    case "O":
      return canMoveTo(newX, newY, dx, dy);
    default:
      throw new Error(`Unexpected item: ${itemAtNew}`);
  }
};

const doMove = (x: number, y: number, dx: number, dy: number) => {
  const itemAtOld = getItemAt(x, y);
  const newX = x + dx;
  const newY = y + dy;
  const itemAtNew = getItemAt(newX, newY);
  switch (itemAtNew) {
    case ".":
      setItemAt(newX, newY, itemAtOld);
      return;
    case "O":
      doMove(newX, newY, dx, dy);
      setItemAt(newX, newY, itemAtOld);
      return;
    case "#":
      throw new Error("Cannot move to wall");
    default:
      throw new Error(`Unexpected item: ${itemAtNew}`);
  }
};

for (const instruction of instructionsInput) {
  const increment = instructionToIncrement[instruction];
  if (!increment) continue;

  const [dx, dy] = increment;
  if (canMoveTo(robotX, robotY, dx, dy)) {
    // printWarehouse();
    // setItemAt(robotX, robotY, ".");
    doMove(robotX, robotY, dx, dy);
    setItemAt(robotX, robotY, ".");
    robotX += dx;
    robotY += dy;
    setItemAt(robotX, robotY, "@");
  } else {
    // console.log("Cannot move");
  }
}
printWarehouse();

let sum = 0;
for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    if (getItemAt(x, y) === "O") {
      const coord = y * 100 + x;
      sum += coord;
    }
  }
}
console.log(sum);
