const textData = Deno.readTextFileSync("input.txt");

const stones = textData.split(" ").map((num) => Number(num));

console.log(stones);

const blink = (stones: number[]) => {
  const newStones: number[] = [];
  for (const stone of stones) {
    if (stone === 0) {
      newStones.push(1);
      continue;
    }

    const digits = stone.toString();
    if (digits.length % 2 === 0) {
      newStones.push(Number(digits.substring(0, digits.length / 2)));
      newStones.push(Number(digits.substring(digits.length / 2)));
      continue;
    }

    newStones.push(stone * 2024);
  }
  return newStones;
};

let newStones = blink(stones);
for (let i = 2; i <= 25; i++) {
  newStones = blink(newStones);
  console.log(i, newStones.length);
}
