export const clamp = (min: number, max: number) => (value: number) => {
  return Math.min(max, Math.max(min, value));
};

const gcd = (...arr: number[]): number => {
  const _gcd = (x: number, y: number) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};

export const lcm = (...arr: number[]): number => {
  const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b), 1);
};
