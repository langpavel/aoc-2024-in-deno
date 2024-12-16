// const lines = Deno.readTextFileSync("input-desc.txt").split("\n");
// const WIDTH = 11;
// const HEIGHT = 7;

const lines = Deno.readTextFileSync("input.txt").split("\n");
const WIDTH = 101;
const HEIGHT = 103;

type Robot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const parseLine = (line: string): Robot => {
  const match = /^p=(?<x>\d+),(?<y>\d+)\s*v=(?<vx>[+-]?\d+),(?<vy>[+-]?\d+)$/
    .exec(line);
  return {
    x: parseInt(match?.groups?.x || "0", 10),
    y: parseInt(match?.groups?.y || "0", 10),
    vx: parseInt(match?.groups?.vx || "0", 10),
    vy: parseInt(match?.groups?.vy || "0", 10),
  };
};

const robots: Robot[] = lines.map((line) => parseLine(line));

const teleport = (value: number, max: number) => {
  let result = value;
  result = value % max;
  if (result < 0) {
    result += max;
  }
  return result;
};

const moveRobot = (robot: Robot, times = 1) => {
  robot.x = teleport(robot.x + robot.vx * times, WIDTH);
  robot.y = teleport(robot.y + robot.vy * times, HEIGHT);
};

const robotsInRegion = (x1: number, y1: number, x2: number, y2: number) =>
  robots.filter((robot) =>
    robot.x >= x1 && robot.x <= x2 && robot.y >= y1 &&
    robot.y <= y2
  );

const printMap = () => {
  for (let y = 0; y < HEIGHT; y++) {
    let line = "";
    for (let x = 0; x < WIDTH; x++) {
      const inRegion = robotsInRegion(x, y, x, y);
      line += inRegion.length ? inRegion.length.toString() : ".";
    }
    console.log(line);
  }
};

for (const robot of robots) {
  moveRobot(robot, 100);
}
printMap();

const HALF_WIDTH = WIDTH / 2;
const HALF_HEIGHT = HEIGHT / 2;

const q1 = robotsInRegion(0, 0, HALF_WIDTH - 1, HALF_HEIGHT - 1).length;
const q2 = robotsInRegion(HALF_WIDTH, 0, WIDTH, HALF_HEIGHT - 1).length;
const q3 = robotsInRegion(0, HALF_HEIGHT, HALF_WIDTH - 1, HEIGHT).length;
const q4 = robotsInRegion(HALF_WIDTH, HALF_HEIGHT, WIDTH, HEIGHT).length;

console.log(q1, q2, q3, q4, q1 * q2 * q3 * q4);
