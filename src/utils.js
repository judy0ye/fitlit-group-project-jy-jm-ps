/* ~~~~~ Days-JS ~~~~~*/

// import dayjs from 'dayjs';
// import calendar from 'dayjs/plugin/calendar';
// dayjs.extend(calendar);
// dayjs.extend(require('dayjs/plugin/utc'));

import  dayjs  from 'dayjs';
import  calendar  from 'dayjs/plugin/calendar';

dayjs.extend(calendar);
// dayjs.extend(utc)

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

function getFluidConsumedOnSpecificDay(hydrationData, day, id) {
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

function getFluidOuncesPerDay(hydrationData, day, id) {
  // console.log('individual User:', hydrationData)
  let invidualUser = []
  
  // hydrationData.filter(user => {
  // if (user.userID = id) {
  // invidualUser.push(user)
  // }

  hydrationData.filter(user => {
    if (user.userID = id && dayjs(user.date).isSame(day, 'day')) {
    invidualUser.push(user)
    }

  // console.log('individual User:', invidualUser)
  })
  const days = hydrationData.reduce((allDays, user) => {
  if (!allDays[user.date]) {
  allDays[user.date] = 0
  }
  allDays[user.date] += user.numOunces
  return allDays;
  }, {});

  console.log(days)

  const sortedDays = Object.entries(days)
  // sortedDays = [['date', oz], ['date', oz]]
  // .sort(([dateA], [dateB]) => dayjs(dateA).diff(dayjs(dateB)))
  .sort((a, b) => dayjs(a[0]).diff(dayjs(b[0]), 'day'))
  .slice(0, 7)
  .reduce((sevenDays, [date, ounces]) => {
    sevenDays[date] = ounces;
    return sevenDays;
  }, {});
  console.log('sortedDays: ', sortedDays)
  return sortedDays
}
// get date object, parse it, sort it in ascending order and return




/* ~~~~~ Exports ~~~~~*/
export {
  getRandomUser,
  getUserById,
  getAvgStepGoal,
  getAvgFluidConsumed,
  getFluidConsumedOnSpecificDay,
  getFluidOuncesPerDay
};
