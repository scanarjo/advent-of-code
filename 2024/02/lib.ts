type Report = number[];

const removeAt = (target: number, report: Report) =>
  report.filter((_, i) => i !== target);

export const isSafe = (report: Report): boolean => {
  const isIncreasing = report[1] > report[0];

  for (let i = 0; i < report.length - 1; i++) {
    const current = report.at(i)!;
    const next = report.at(i + 1)!;

    const diff = next - current;

    if (isIncreasing ? diff < 0 : diff > 0) {
      return false;
    }

    if (![1, 2, 3].includes(Math.abs(diff))) {
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
