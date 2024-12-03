const corruptedMemory = Deno.readTextFileSync("input.txt");

console.log(corruptedMemory);

let acc = 0;
let enabled = true;
for (
  const match of corruptedMemory.matchAll(
    /(?:(?<op>mul)\((?<a>\d{1,3}),(?<b>\d{1,3})\)|(?<op>do)\(\)|(?<op>don't)\(\))/g,
  )
) {
  const { op, a, b } = match.groups!;
  console.log(op, a, b);
  switch (op) {
    case "do":
      enabled = true;
      break;
    case "don't":
      enabled = false;
      break;
    case "mul":
      if (enabled) {
        acc += parseInt(a, 10) * parseInt(b, 10);
      }
      break;
  }
}

console.log(acc);
