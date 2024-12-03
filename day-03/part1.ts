const corruptedMemory = Deno.readTextFileSync("input.txt");

console.log(corruptedMemory);

let acc = 0;
for (const match of corruptedMemory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)) {
  const [_, a, b] = match;
  console.log(match[0], a, b);
  acc += parseInt(a, 10) * parseInt(b, 10);
}

console.log(acc);
