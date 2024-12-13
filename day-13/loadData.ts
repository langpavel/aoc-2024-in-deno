const btnToCost: Record<string, number> = {
  A: 3,
  B: 1,
};

export type Vec2D = [number, number];

export type Button = {
  increment: Vec2D;
  cost: number;
};

export type Machine = {
  buttons: [Button, Button];
  prize: Vec2D;
};

const parseButton = (line: string): Button => {
  const re = /Button (?<btn>[A-Z]): X(?<x>\+\d+), Y(?<y>\+\d+)/;
  const match = line.match(re);
  if (!match) {
    throw new Error("Invalid button line");
  }
  const { btn, x, y } = match.groups!;
  return { increment: [parseInt(x), parseInt(y)], cost: btnToCost[btn] };
};

const parsePrize = (line: string): Vec2D => {
  const re = /Prize: X=(?<x>\d+), Y=(?<y>\d+)/;
  const match = line.match(re);
  if (!match) {
    throw new Error("Invalid button line");
  }
  const { x, y } = match.groups!;
  return [parseInt(x), parseInt(y)];
};

export const loadData = (
  filename: string,
  offset = 0,
): Machine[] => {
  const textData = Deno.readTextFileSync(filename);
  const sentences = textData.split("\n\n");

  const data = sentences.map((sentence) => {
    const [buttonAline, buttonBline, prizeLine] = sentence.split("\n");

    const [prizeX, prizeY] = parsePrize(prizeLine);

    return {
      buttons: [parseButton(buttonAline), parseButton(buttonBline)],
      prize: [prizeX + offset, prizeY + offset],
    } as Machine;
  });

  return data;
};
