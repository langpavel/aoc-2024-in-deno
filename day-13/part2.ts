import { loadData, type Machine } from "./loadData.ts";

const BIG_OFFSET = 10000000000000;
const data: Machine[] = loadData("input.txt", BIG_OFFSET);

const getMinCost = (machine: Machine): number => {
  const { buttons: [x, y], prize } = machine;

  const [x1, x2] = x.increment;
  const [y1, y2] = y.increment;
  const [c1, c2] = prize;

  const b = (x1 * c2 - x2 * c1) / (x1 * y2 - x2 * y1);
  if (!Number.isInteger(b)) return 0;
  const a = (c1 - y1 * b) / x1;
  if (!Number.isInteger(a)) return 0;
  const costA = x.cost * a;
  const costB = y.cost * b;
  return costA + costB;
};

let tokens = 0;

for (const machine of data) {
  // console.log(machine);
  const cost = getMinCost(machine);
  console.log(`Cost: ${cost}`);
  tokens += cost;
}

console.log(tokens);
