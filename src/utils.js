/* ~~~~~ Days-JS ~~~~~*/

// import dayjs from 'dayjs';
// import calendar from 'dayjs/plugin/calendar';
// dayjs.extend(calendar);
// dayjs.extend(require('dayjs/plugin/utc'));

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

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
  const user = hydrationData.find(
    (user) => user.userID === id && user.date === day
  );

  if (!user) {
    return 0;
  }
  return user.numOunces;
}

// function getFluidOuncesPerDay(hydrationData, day, id) {
//   let invidualUser = []

//   hydrationData.filter(user => {
//     if (user.userID = id && dayjs(user.date).isSame(day, 'day')) {
//     invidualUser.push(user)
//     }

//   })
//   const days = hydrationData.reduce((allDays, user) => {
//   if (!allDays[user.date]) {
//   allDays[user.date] = 0
//   }
//   allDays[user.date] += user.numOunces
//   return allDays;
//   }, {});

//  // console.log(days)

//   const sortedDays = Object.entries(days)
//   // sortedDays = [['date', oz], ['date', oz]]
//   // .sort(([dateA], [dateB]) => dayjs(dateA).diff(dayjs(dateB)))
//   // * the above works too but I'm more comfortable with the the lines below *
//   .sort((a, b) => dayjs(a[0]).diff(dayjs(b[0]), 'day'))
//   .slice(0, 7)
//   .reduce((sevenDays, [date, ounces]) => {
//     sevenDays[date] = ounces;
//     return sevenDays;
//   }, {});
//  // console.log('sortedDays: ', sortedDays)
//   return sortedDays
// }

function getFluidPerWeek(hydrationData, userID, startDate) {
  const fluidEntries = hydrationData.filter((entry) => entry.userID === userID);
  const indexOfCurrentDayEntry = fluidEntries.findIndex(
    (entry) => entry.date === startDate
  );
  const weeklyFluid = fluidEntries
    .slice(indexOfCurrentDayEntry, indexOfCurrentDayEntry - 7)
    .reverse();
  const weeklyHydrationData = weeklyFluid.map((entry) => ({
    date: entry.date,
    numOunces: entry.numOunces + 'ounces consumed',
  }));
  return weeklyHydrationData;
}

/* ~~~~~ Sleep ~~~~~*/

function getAvgSleep(sleepData, userID) {
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const avgSleep = sleepEntries.reduce((acc, user) => {
    return (acc += user.hoursSlept);
  }, 0);
  return Math.round((avgSleep / sleepEntries.length) * 10) / 10;
}

// sleep quality all time - water for all time
function getAvgQuality(sleepData, userID) {
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const avgQuality = sleepEntries.reduce((acc, user) => {
    return (acc += user.sleepQuality);
  }, 0);
  return Math.round((avgQuality / sleepEntries.length) * 10) / 10;
}

//hours per day - oz per day
function getHoursByDay(sleepData, id, date) {
  console.log('getHoursByDay:', sleepData, id, date);
  const sleepEntries = sleepData.filter((entry) => entry.userID === id);
  console.log('sleepEntries:', sleepEntries);
  const dailyEntry = sleepEntries.find((entry) => entry.date === date);
  console.log('dailyEntry:', dailyEntry);
  return dailyEntry.hoursSlept;
}

function getQualityByDay(sleepData, userID, date) {
  console.log('getQualityByDay:', userID);
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const dailyEntry = sleepEntries.find((entry) => entry.date === date);
  return dailyEntry.sleepQuality;
}

//wekly sleep - weekly oz - working function from Parvin:
// function getWeekSleep(sleepData, userID, startDate) {
//   const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
//   console.log('SLEEP ENTRIES',sleepEntries);

//   const indexOfCurrentDayEntry = sleepEntries.findIndex(
//     (entry) => entry.date === startDate
//   );
//   const weeklySleep = sleepEntries
//     .slice(indexOfCurrentDayEntry, indexOfCurrentDayEntry - 7)
//     .reverse();
//   const weeklySleepData = weeklySleep.map((entry) => ({
//     date: entry.date,
//     hoursSlept: entry.hoursSlept + ' hours slept',
//     sleepQuality: ' a sleep quality rating of ' + entry.sleepQuality,
//   }));
//   return weeklySleepData;
// }

//Working Weekly Sleep Function for 7 most current days

function getWeekSleep(sleepData, userID) {
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const lastIndex = sleepEntries.length - 1;
  const weeklySleep = sleepEntries.slice(lastIndex - 6, lastIndex + 1);
  const weeklySleepData = weeklySleep.map((entry) => ({
    date: entry.date,
    hoursSlept: entry.hoursSlept + ' hours slept',
    sleepQuality: ' a sleep quality rating of ' + entry.sleepQuality,
  }));
  return weeklySleepData;
}

// Weekly Sleep Function for 7 most current days
function getWeeklyFluid(hydrationData, userID) {
  const hydrationEntries = hydrationData.filter(
    (entry) => entry.userID === userID
  );
  const lastIndex = hydrationEntries.length - 1;
  const weeklyHydration = hydrationEntries.slice(lastIndex - 6, lastIndex + 1);
  const weeklyHydrationData = weeklyHydration.map((entry) => ({
    date: entry.date,
    numOunces: entry.numOunces + ' ounces drank ',
  }));
  return weeklyHydrationData;
}

/* ~~~~~ Exports ~~~~~*/

export {
  getRandomUser,
  getUserById,
  getAvgStepGoal,
  getWeeklyFluid,
  // getFluidPerWeek,
  // getFluidOuncesPerDay,
  // getAvgFluidConsumed,
  // getFluidConsumedOnSpecificDay,
  getAvgSleep,
  getAvgQuality,
  getHoursByDay,
  getQualityByDay,
  //getSleepDataByDate,
  getWeekSleep,
};
