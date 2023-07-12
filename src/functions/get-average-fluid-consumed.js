// function getAvgFluidConsumed(hydrationData, day, id) {
//   if (day && id) {
//    const specificUser = hydrationData.find(user => user.date === day && user.userID === id)
//    return specificUser ? specificUser.numOunces : undefined;
//   }

//   const fluidConsumed = hydrationData.reduce((fluidOunces, user) => {
//     return fluidOunces += user.numOunces
//   }, 0)

//   return Math.round(fluidConsumed/hydrationData.length) 
// }

// function getAvgFluidConsumed(hydrationData, day, id) {
//   hydrationData.find(user => {
//     if (user.userID === id && user.date === day) {
//       return user.numOunces
//     }
//   })
// }
function getAvgFluidConsumed(hydrationData, id) {
  const days = hydrationData.reduce((days, user) => {
    if (user.userID === id) {
      days.push(user.date)
    }
    return days
  }, [])

  const fluidConsumed = hydrationData.reduce((fluidOunces, user) => {
    if (user.userID === id) {
      fluidOunces += user.numOunces
    }
    return fluidOunces
  }, 0)
  
  return Math.round(fluidConsumed/days.length) 
}

function getAvgFluidConsumedOnSpecifcDay(hydrationData, day, id) {
  const days = hydrationData.reduce((days, user) => {
    if (user.userID === id && user.date === day) {
      days.push(user.date)
    }
    return days
  }, [])
    
  const ouncesConsumed = hydrationData.reduce((water, user) => {
    if (user.userID === id && user.date === day) {
      water = water + user.numOunces
    }
      return water
  }, 0)

  const user = hydrationData.find(user => user.userID === id && user.date === day)
    if (user.userID === id && user.date === day) {
      return Math.round(ouncesConsumed/ days.length)
    }
}


export { 
  getAvgFluidConsumed,
  getAvgFluidConsumedOnSpecifcDay 
};

