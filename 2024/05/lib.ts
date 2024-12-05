type PrintingRules = Map<number, Set<number>>;
type Update = number[];

export const parseInput = (input: string[]) => {
  const rules: PrintingRules = new Map();

  const splitIndex = input.findIndex((line) => {
    if (line === '') return true;

    const [first, second] = line.split('|');

    const ruleSubject = parseInt(first, 10);
    const restriction = parseInt(second, 10);

    const existingRule = rules.get(ruleSubject);

    if (!existingRule) {
      rules.set(ruleSubject, new Set([restriction]));
    } else {
      existingRule.add(restriction);
    }

    return false;
  });

  const updates: Update[] = input.slice(splitIndex + 1).map((line) =>
    line.split(',').map((page) => parseInt(page, 10))
  );

  return {
    rules,
    updates,
  };
};

const isUpdateValid = (rules: PrintingRules) => (update: Update): boolean => {
  const seen = new Set<number>();

  for (const page of update) {
    const restrictions = rules.get(page);

    if (!restrictions) {
      seen.add(page);
      continue;
    }

    if (!seen.isDisjointFrom(restrictions)) {
      return false;
    }

    seen.add(page);
  }

  return true;
};

export const validateUpdates = (
  rules: PrintingRules,
  updates: Update[],
): Update[] => {
  return updates.filter(isUpdateValid(rules));
};

export const getInvalidUpdates = (
  rules: PrintingRules,
  updates: Update[],
): Update[] => {
  const isValid = isUpdateValid(rules);

  return updates.filter((update) => !isValid(update));
};

export const fixInvalidUpdates = (
  rules: PrintingRules,
  updates: Update[],
): Update[] => {
  return updates.map((update) => {
    let seen: Update = [];

    let page = update.shift();
    while (page) {
      const restrictions = rules.get(page);

      if (!restrictions) {
        seen.push(page);

        page = update.shift();
        continue;
      }

      if (!restrictions.isDisjointFrom(new Set(seen))) {
        update.unshift(...seen);

        seen = [];

        continue;
      }

      seen.push(page);

      page = update.shift();
    }

    return seen;
  });
};

export const calculateUpdatesScore = (updates: Update[]): number => {
  return updates.reduce((sum, update) => {
    return sum + update[Math.floor(update.length / 2)];
  }, 0);
};
