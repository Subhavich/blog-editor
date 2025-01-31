const switchIndex = (array, index, increment) => {
  const targetedIndex = index;
  const targetedSwitchIndex = index + increment;
  const indexValid =
    targetedSwitchIndex >= 0 && targetedSwitchIndex < array.length;
  if (!indexValid) {
    return "forbidden";
  }
  const copiedArray = [...array];
  const saved = copiedArray[targetedIndex];
  copiedArray[targetedIndex] = copiedArray[targetedSwitchIndex];
  copiedArray[targetedSwitchIndex] = saved;
  return copiedArray;
};
