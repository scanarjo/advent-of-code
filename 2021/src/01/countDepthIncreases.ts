const sum = (list: number[]) => {
  let sum = 0;
  for (const x of list) {
    sum += x;
  }
  return sum;
}

export const countDepthIncreases = (list: number[], window = 1) => {
  if(list.length <= window) return 0;

  let count = 0;
  for (let i = window; i < list.length; i++) {
    const previousWindow = list.slice(i - window, i);
    const currentWindow = list.slice(i - window + 1, i + 1);

    if(sum(previousWindow) < sum(currentWindow)) count++;
  }

  return count;
}
