function getAvgFluidConsumed(hydrationData) {
  let counter = 0;
  hydrationData.forEach(user => counter += user.numOunces)
  return Math.round(counter/hydrationData.length)
}

export { getAvgFluidConsumed };
  