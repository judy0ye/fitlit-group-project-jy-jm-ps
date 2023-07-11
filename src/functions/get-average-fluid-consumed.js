function getAvgFluidConsumed(hydrationData, day, id) {
  if (day && id) {
   const specificUser = hydrationData.find(user => user.date === day && user.userID === id)
   return specificUser ? specificUser.numOunces : undefined;
  }

  const fluidConsumed = hydrationData.reduce((fluidOunces, user) => {
    return fluidOunces += user.numOunces
  }, 0)

  return Math.round(fluidConsumed/hydrationData.length) 
}

export { getAvgFluidConsumed };
