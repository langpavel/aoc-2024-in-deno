const textData = Deno.readTextFileSync("input.txt");

const reports = textData.split("\n");

const parsedReports: number[][] = reports.map((line) =>
  line.split(/\s+/).map((num) => parseInt(num, 10))
);

const isSafeReport = (report: number[]): boolean => {
  const increasing = report[0] < report[1];
  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];
    const currIncreasing = diff > 0;
    if (increasing !== currIncreasing) {
      return false;
    }
    const distance = Math.abs(diff);
    if (distance > 3 || distance < 1) {
      return false;
    }
  }
  return true;
};

const isSafeIfOneRemoved = (report: number[]): boolean => {
  for (let i = 0; i < report.length; i++) {
    const subarray = [...report];
    subarray.splice(i, 1);
    if (isSafeReport(subarray)) {
      return true;
    }
  }
  return false;
};

let safeReports = 0;
for (const report of parsedReports) {
  const safe = isSafeReport(report);
  console.log(safe, report.join(" "));
  if (isSafeReport(report) || isSafeIfOneRemoved(report)) {
    safeReports++;
  }
}

console.log(safeReports);
