const textData = Deno.readTextFileSync("input.txt");

const lines = textData.split("\n");

const parsedLines: number[][] = lines.map((line) =>
  line.split(/\s+/).map((num) => parseInt(num, 10))
);

const col1: number[] = [];
const col2: Map<number, number> = new Map();

for (const [a, b] of parsedLines) {
  col1.push(a);
  col2.set(b, (col2.get(b) ?? 0) + 1);
}

let score = 0;

for (const a of col1) {
  score += a * (col2.get(a) ?? 0);
}

console.log(score);
