const readInput = (file: string) => {
  const input = Deno.readTextFileSync(file);
  const [allPatterns, allTowels] = input.split("\n\n");

  const patterns = allPatterns.split(", ");
  const towels = allTowels.split("\n");
  return { patterns, towels };
};

const { patterns, towels } = readInput("input.txt");
console.log(patterns);
console.log(towels);

const possibleTowels = new Set<string>(patterns);
let maxLen = [...possibleTowels].reduce(
  (acc, curr) => Math.max(acc, curr.length),
  0,
);

const isPossible = (towel: string) => {
  if (possibleTowels.has(towel)) {
    return true;
  }
  for (let i = maxLen; i > 0; i--) {
    const subTowel = towel.slice(0, i);
    const restTowel = towel.slice(i);
    if (possibleTowels.has(subTowel) && isPossible(restTowel)) {
      possibleTowels.add(towel);
      return true;
    }
  }
};

const possibles = new Set<string>();
for (const towel of towels) {
  if (isPossible(towel)) {
    possibles.add(towel);
  }
}

console.log(possibles.size);
