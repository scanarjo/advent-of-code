import { parseDenaryInt } from 'utils';

export function findMaxJoltage(
  batteryBank: string,
  batteryCount: number = 2
): number {
  if (batteryBank.length < batteryCount) return 0;

  const batteries = [];

  let cursorPosition = -1;
  for (let n = 0; n < batteryCount; n++) {
    let currentBatteryValue = 0;
    for (
      let index = cursorPosition + 1;
      index < batteryBank.length - (batteryCount - batteries.length - 1);
      index++
    ) {
      const battery = parseDenaryInt(batteryBank.charAt(index));

      if (battery > currentBatteryValue) {
        currentBatteryValue = battery;
        cursorPosition = index;
      }

      if (currentBatteryValue === 9) break;
    }

    batteries.push(currentBatteryValue);
  }

  return parseDenaryInt(batteries.join(''));
}

export function findTotalJoltage(
  batterBanks: string[],
  batteryCount: number = 2
): number {
  return batterBanks.reduce(
    (total, batteryBank) => total + findMaxJoltage(batteryBank, batteryCount),
    0
  );
}
