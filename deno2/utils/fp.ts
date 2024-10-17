export const always = <T>(value: T) => () => value;

export const cond = <TValue, TReturn>(
  conditions: [(val: TValue) => boolean, (val: TValue) => TReturn][],
): (val: TValue) => TReturn | undefined =>
(val: TValue) => {
  for (const [predicate, transform] of conditions) {
    if (predicate(val)) {
      return transform(val);
    }
  }
};

export const equals = <T>(value: T) => (other: unknown) => value === other;

export const matchArrayElementsFromStart = <T>(array1: T[], array2: T[]) => {
  const shortestArray = array1.length < array2.length ? array1 : array2;
  const longestArray = array1.length < array2.length ? array2 : array1;

  for (let i = 0; i < shortestArray.length; i++) {
    if (shortestArray[i] !== longestArray[i]) {
      return false;
    }
  }

  return true;
};
