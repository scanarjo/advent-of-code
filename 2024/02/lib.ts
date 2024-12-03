type Report = number[];

const removeAt = (target: number, report: Report) =>
  report.filter((_, i) => i !== target);

export const isSafe = (report: Report): boolean => {
  const isIncreasing = report[1] > report[0];

  return report.every((current, i) => {
    const next = report.at(i + 1);

    if (!next) return true;

    const diff = next - current;

    if (isIncreasing ? diff < 0 : diff > 0) {
      return false;
    }

    if (![1, 2, 3].includes(Math.abs(diff))) {
      return false;
    }

    return true;
  });
};

export const isSafeEnough = (report: Report): boolean => {
  return report.some((_, i) => isSafe(removeAt(i, report)));
};

export const parseReport = (report: string): Report => {
  return report.split(' ').map((entry) => parseInt(entry, 10));
};
