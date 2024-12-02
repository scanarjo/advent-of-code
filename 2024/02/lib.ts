export const isSafe = (report: number[]): boolean => {
  const isIncreasing = report[1] > report[0];
  for (let i = 0; i < report.length - 1; i++) {
    if (isIncreasing && report[i + 1] < report[i]) return false;

    if (!isIncreasing && report[i + 1] > report[i]) return false;

    const diff = Math.abs(report[i + 1] - report[i]);

    if (diff < 1 || diff > 3) return false;
  }

  return true;
};

export const parseReport = (report: string): number[] => {
  return report.split(' ').map((entry) => parseInt(entry, 10));
};
