const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");
const field = lines.map((line) =>
  line.split("").map((cell) => [cell, 0] as [string, number])
);

console.log(field);

const maxX = field[0].length;
const maxY = field.length;

console.log(maxX, maxY);

const prices = new Map<string, number>();
const addPrice = (plant: string, price: number) => {
  const count = prices.get(plant) || 0;
  prices.set(plant, count + price);
};

const floodFill = (
  x: number,
  y: number,
  plant: string,
  color: number,
  counters: { area: number; perimeter: number },
) => {
  if (field[y]?.[x]?.[1] === color) {
    return;
  }
  if (field[y]?.[x]?.[0] !== plant) {
    counters.perimeter++;
    return;
  }

  field[y][x][1] = color;
  counters.area++;

  floodFill(x - 1, y, plant, color, counters);
  floodFill(x + 1, y, plant, color, counters);
  floodFill(x, y - 1, plant, color, counters);
  floodFill(x, y + 1, plant, color, counters);
};

let color = 1;

for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
    if (field[y][x][1] === 0) {
      const counters = { area: 0, perimeter: 0 };
      floodFill(x, y, field[y][x][0], color++, counters);
      const price = counters.area * counters.perimeter;
      console.log(counters, price);
      addPrice(field[y][x][0], price);
    }
  }
}

console.log(field);

let totalPrice = 0;
for (const [_, price] of prices) {
  totalPrice += price;
}

console.log(totalPrice);
