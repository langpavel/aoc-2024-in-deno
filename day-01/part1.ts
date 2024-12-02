const textData = Deno.readTextFileSync("input.txt");

const lines = textData.split("\n");

const parsedLines: number[][] = lines.map((line) =>
  line.split(/\s+/).map((num) => parseInt(num, 10))
);

const col1: number[] = [];
const col2: number[] = [];

for (const line of parsedLines) {
  col1.push(line[0]);
  col2.push(line[1]);
}

const col1Sorted = col1.toSorted();
const col2Sorted = col2.toSorted();

let totalDistance = 0;

for (let i = 0; i < col1Sorted.length; i++) {
  const distance = Math.abs(col1Sorted[i] - col2Sorted[i]);
  totalDistance += distance;
}

console.log(totalDistance);
