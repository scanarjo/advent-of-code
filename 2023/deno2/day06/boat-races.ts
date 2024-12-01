export const waysToWin = (
  availableTime: number,
  distanceToBeat: number,
): number => {
  let waysToWin = 0;

  for (
    let timeHoldingButton = 1;
    timeHoldingButton < availableTime;
    timeHoldingButton++
  ) {
    const timeToReachTheFinish = availableTime - timeHoldingButton;
    const distanceCovered = timeHoldingButton * timeToReachTheFinish;

    if (distanceCovered > distanceToBeat) {
      waysToWin++;
    }
  }

  return waysToWin;
};

export const marginForError = (
  availableTimes: number[],
  distancesToBeat: number[],
) => {
  let margin = 1;

  for (
    let currentRace = 0;
    currentRace < availableTimes.length;
    currentRace++
  ) {
    margin *= waysToWin(
      availableTimes[currentRace],
      distancesToBeat[currentRace],
    );
  }

  return margin;
};
