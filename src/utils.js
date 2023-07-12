/* ~~~~~ Get Random User ~~~~~*/
function getRandomUser(users) {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

/* ~~~~~ Get User By ID ~~~~~*/

function getUserById(users, id) {
  return users.find((user) => user.id === id);
}

// if API call gives undefined/gives back just an array
// on line 2, remove 'users' from
// userData.users

/* ~~~~~ Get Average Step Goal ~~~~~*/

const getAvgStepGoal = (users) => {
  if (!users) {
    return undefined;
  }

  let counter = 0;
  users.forEach((user) => (counter += user.dailyStepGoal));
  return Math.round(counter / users.length);
};

/* ~~~~~ Get Average Fluid ~~~~~*/

function getAvgFluidConsumed(hydrationData, id) {
  const days = hydrationData.reduce((days, user) => {
    if (user.userID === id) {
      days.push(user.date);
    }
    return days;
  }, []);

  const fluidConsumed = hydrationData.reduce((fluidOunces, user) => {
    if (user.userID === id) {
      fluidOunces += user.numOunces;
    }
    return fluidOunces;
  }, 0);

  return Math.round(fluidConsumed / days.length);
}

function getAvgFluidConsumedOnSpecifcDay(hydrationData, day, id) {
  const days = hydrationData.reduce((days, user) => {
    if (user.userID === id && user.date === day) {
      days.push(user.date);
    }
    return days;
  }, []);

  const ouncesConsumed = hydrationData.reduce((water, user) => {
    if (user.userID === id && user.date === day) {
      water = water + user.numOunces;
    }
    return water;
  }, 0);

  const user = hydrationData.find(
    (user) => user.userID === id && user.date === day
  );
  if (user.userID === id && user.date === day) {
    return Math.round(ouncesConsumed / days.length);
  }
}

/* ~~~~~ Exports ~~~~~*/
export {
  getRandomUser,
  getUserById,
  getAvgStepGoal,
  getAvgFluidConsumed,
  getAvgFluidConsumedOnSpecifcDay,
};
