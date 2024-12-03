type Report = number[];

export const isSafe = (report: Report, tolerance = 0): boolean => {
  const isIncreasing = report[1] > report[0];

  let failures = 0;
  for (let i = 0; i < report.length - 1; i++) {
    if (isIncreasing && report[i + 1] < report[i]) {
      failures++;
    }

    if (!isIncreasing && report[i + 1] > report[i]) {
      failures++;
    }

    const diff = Math.abs(report[i + 1] - report[i]);

    if (diff < 1 || diff > 3) {
      failures++;
    }

    if (failures > tolerance) {
      break;
    }
  }

  if (failures === 0) return true;

  if (tolerance === 0 && failures > 0) return false;

  for (let i = 0; i < report.length; i++) {
    if (i === 0 && isSafe(report.slice(1))) return true;

    if (i === report.length - 1 && isSafe(report.slice(0, i))) return true;

    if (isSafe([...report.slice(0, i), ...report.slice(i + 1)])) return true;
  }

  return false;
};

export const parseReport = (report: string): Report => {
  return report.split(' ').map((entry) => parseInt(entry, 10));
};
