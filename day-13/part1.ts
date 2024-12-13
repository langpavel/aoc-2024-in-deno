import { loadData, type Machine } from "./loadData.ts";

const data: Machine[] = loadData("input.txt");

const getMinCost = (machine: Machine): number => {
  const { buttons: [a, b], prize } = machine;

  const [px, py] = prize;
  const [ax, ay] = a.increment;
  const [bx, by] = b.increment;

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (px === ax * i + bx * j && py === ay * i + by * j) {
        const costA = a.cost * i;
        const costB = b.cost * j;
        return costA + costB;
      }
    }
  }

  return 0;
};

let tokens = 0;

for (const machine of data) {
  const cost = getMinCost(machine);
  console.log(machine, cost);
  tokens += cost;
}

console.log(tokens);
