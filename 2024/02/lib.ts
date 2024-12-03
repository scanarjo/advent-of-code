type Report = number[];

const removeAt = (target: number, report: Report) =>
  report.filter((_, i) => i !== target);

export const isSafe = (report: Report): boolean => {
  const isIncreasing = report[1] > report[0];

  for (let i = 0; i < report.length - 1; i++) {
    if (isIncreasing && report[i + 1] < report[i]) {
      return false;
    }

    if (!isIncreasing && report[i + 1] > report[i]) {
      return false;
    }

    const diff = Math.abs(report[i + 1] - report[i]);

    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
};

export const isSafeEnough = (report: Report): boolean => {
  for (let i = 0; i < report.length; i++) {
    if (isSafe(removeAt(i, report))) return true;
  }

  return false;
};

export const parseReport = (report: string): Report => {
  return report.split(' ').map((entry) => parseInt(entry, 10));
};
