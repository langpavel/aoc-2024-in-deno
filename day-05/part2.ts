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

const incorrectUpdates = allUpdates.filter((u) => !isCorrectUpdate(u));

console.log("incorrectUpdates", incorrectUpdates);

const fixUpdate = (update: number[]) => {
  const fixedUpdate = [...update];
  let swap = true;
  while (swap) {
    swap = false;
    pageOrderingRules.forEach(([min, max]) => {
      const minIndex = fixedUpdate.indexOf(min);
      const maxIndex = fixedUpdate.indexOf(max);
      if (minIndex >= 0 && maxIndex >= 0 && minIndex > maxIndex) {
        fixedUpdate[minIndex] = max;
        fixedUpdate[maxIndex] = min;
        swap = true;
      }
    });
  }
  return fixedUpdate;
};

const fixedUpdates = incorrectUpdates.map(fixUpdate);

console.log("fixedUpdates", fixedUpdates);

const sumOfMiddleValues = fixedUpdates.reduce((acc, update) => {
  return acc + update[(update.length - 1) / 2];
}, 0);

console.log("sumOfMiddleValues", sumOfMiddleValues);
