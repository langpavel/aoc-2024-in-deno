const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");

type Equation = [number, number[]];

const equations: Equation[] = lines.map((line) => {
  const [expected, vals] = line.split(/:\s+/, 2);
  return [Number(expected), vals.split(/\s+/).map((x) => Number(x))];
});

const ops = [
  (a: number, b: number) => a + b,
  (a: number, b: number) => a * b,
  (a: number, b: number) => Number(a.toString() + b.toString()),
];

function* getCombinations(vals: number[]): Generator<number> {
  if (vals.length === 1) {
    yield vals[0];
    return;
  }

  const last = vals[vals.length - 1];
  const firsts = vals.slice(0, -1);

  for (const compination of getCombinations(firsts)) {
    for (const op of ops) {
      yield op(compination, last);
    }
  }
}

const testVals = (expected: number, vals: number[]) => {
  for (const result of getCombinations(vals)) {
    if (result === expected) {
      return true;
    }
  }
};

let matches = 0;
let sum = 0;

for (const [expected, vals] of equations) {
  if (testVals(expected, vals)) {
    matches++;
    // sum += vals.reduce((acc, val) => acc + val);
    sum += expected;
  }
}

console.log(matches);
console.log(sum);
