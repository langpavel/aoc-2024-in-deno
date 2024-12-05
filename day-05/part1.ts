const input = Deno.readTextFileSync("input.txt");

const [part1, part2] = input.split("\n\n");

const toInt = (str: string) => parseInt(str, 10);

const pageOrderingRules = part1.split("\n").map((rule) =>
  rule.split("|").map(toInt)
) as [number, number][];

const allUpdates = part2.split("\n").map((update) =>
  update.split(",").map(toInt)
);

console.log("pageOrderingRules", pageOrderingRules);
console.log("allUpdates", allUpdates);

const isCorrectUpdate = (update: number[]) => {
  for (const [min, max] of pageOrderingRules) {
    const minIndex = update.indexOf(min);
    const maxIndex = update.indexOf(max);
    if (minIndex >= 0 && maxIndex >= 0) {
      if (minIndex > maxIndex) {
        return false;
      }
    }
  }
  return true;
};

const correctUpdates = allUpdates.filter(isCorrectUpdate);

console.log("correctUpdates", correctUpdates);

const sumOfMiddleValues = correctUpdates.reduce((acc, update) => {
  return acc + update[(update.length - 1) / 2];
}, 0);

console.log("sumOfMiddleValues", sumOfMiddleValues);
