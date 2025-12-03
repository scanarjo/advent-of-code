function parseDenaryInt(n: string): number {
  return Number.parseInt(n, 10);
}

export function findMaxJoltage(batteryBank: string): number {
  if (batteryBank.length < 2) return 0;

  let firstBatteryIndex = 0;
  let secondBatteryIndex = batteryBank.length - 1;

  let firstBatteryValue = parseDenaryInt(batteryBank.charAt(firstBatteryIndex));
  let secondBatteryValue = parseDenaryInt(
    batteryBank.charAt(secondBatteryIndex)
  );

  for (let index = firstBatteryIndex; index < batteryBank.length - 1; index++) {
    if (firstBatteryValue === 9) break;

    const battery = parseDenaryInt(batteryBank.charAt(index));

    if (battery <= firstBatteryValue) continue;

    firstBatteryIndex = index;
    firstBatteryValue = battery;
  }

  for (let index = secondBatteryIndex; index > firstBatteryIndex; index--) {
    if (secondBatteryValue === 9) break;

    const battery = parseDenaryInt(batteryBank.charAt(index));

    if (battery <= secondBatteryValue) continue;

    secondBatteryIndex = index;
    secondBatteryValue = battery;
  }

  console.log(batteryBank, firstBatteryValue * 10 + secondBatteryValue);
  return firstBatteryValue * 10 + secondBatteryValue;
}

export function findTotalJoltage(batterBanks: string[]): number {
  return batterBanks.reduce(
    (total, batteryBank) => total + findMaxJoltage(batteryBank),
    0
  );
}
