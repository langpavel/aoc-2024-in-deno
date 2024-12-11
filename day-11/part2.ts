const textData = Deno.readTextFileSync("input.txt");

const stones = textData.split(" ").map((num) => Number(num));

const cache = new Map<string, number>();
const blinkNumberTimes = (stone: number, times: number): number => {
  if (times === 0) {
    return 1;
  }

  const digits = stone.toString();
  const chacheKey = `${digits}x${times}`;
  let result = cache.get(chacheKey);
  if (result) {
    return result;
  }

  if (stone === 0) {
    result = blinkNumberTimes(1, times - 1);
    cache.set(chacheKey, result);
    return result;
  }

  if (digits.length % 2 === 0) {
    result = blinkNumberTimes(
      Number(digits.substring(0, digits.length / 2)),
      times - 1,
    ) +
      blinkNumberTimes(Number(digits.substring(digits.length / 2)), times - 1);
    cache.set(chacheKey, result);
    return result;
  }
  result = blinkNumberTimes(stone * 2024, times - 1);
  cache.set(chacheKey, result);
  return result;
};

let totalStones = 0;

for (const stone of stones) {
  const stones = blinkNumberTimes(stone, 75);
  totalStones += stones;
}

console.log(totalStones);
