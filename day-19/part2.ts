const readInput = (file: string) => {
  const input = Deno.readTextFileSync(file);
  const [allPatterns, allTowels] = input.split("\n\n");

  const patterns = allPatterns.split(", ");
  const towels = allTowels.split("\n");
  return { patterns, towels };
};

const { patterns, towels } = readInput("input.txt");

const possibleTowels = new Map<string, number>();
const possibleWays = (towel: string): number => {
  if (towel === "") {
    throw new Error("towel is empty");
  }
  if (possibleTowels.has(towel)) {
    return possibleTowels.get(towel)!;
  }
  let ways = 0;
  for (const start of patterns) {
    if (towel.startsWith(start)) {
      const restTowel = towel.slice(start.length);
      if (restTowel === "") {
        ways++;
        continue;
      }
      ways += possibleWays(restTowel);
    }
  }
  possibleTowels.set(towel, ways);
  return ways;
};

let variants = 0;
for (const towel of towels) {
  const currentVariants = possibleWays(towel);
  console.log(
    `X towel: ${towel}\tvariants: ${currentVariants}`,
  );
  variants += currentVariants;
}

console.log(variants);
