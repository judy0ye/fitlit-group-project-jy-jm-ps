/* ~~~~~ Days-JS ~~~~~*/

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
// import { currentUser } from './scripts';

dayjs.extend(calendar);

/* ~~~~~ Get Random User ~~~~~*/
function getRandomUser(users) {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

/* ~~~~~ Get User By ID ~~~~~*/

function getUserById(users, id) {
  return users.find((user) => user.id === id);
}

/* ~~~~~ Get Average Step Goal ~~~~~*/

const getAvgStepGoal = (users) => {
  if (!users) {
    return 0;
  }

  const totalStepGoal = users.reduce((acc, userInfo) => {
    return acc + userInfo.dailyStepGoal;
  }, 0);
  return Math.round(totalStepGoal / users.length);
};

/* ~~~~~ Get Average Fluid ~~~~~*/

function getAvgFluidForAllTime(hydrationData, id) {
  const hydrationEntries = hydrationData.filter((entry) => entry.userID === id);
  const avgHydration = hydrationEntries.reduce((acc, user) => {
    return (acc += user.numOunces);
  }, 0);
  return Math.round(avgHydration / hydrationEntries.length);
}

function getFluidDrankForSpecificDay(hydrationData, id, date) {
  const hydrationEntries = hydrationData.filter((entry) => entry.userID === id);
  const dailyEntry = hydrationEntries.find((entry) => entry.date === date);
  return dailyEntry.numOunces;
}

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

/* ~~~~~ Sleep ~~~~~*/

function getAvgSleep(sleepData, userID) {
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const avgSleep = sleepEntries.reduce((acc, user) => {
    return (acc += user.hoursSlept);
  }, 0);
  return Math.round((avgSleep / sleepEntries.length) * 10) / 10;
}

function getAvgQuality(sleepData, userID) {
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const avgQuality = sleepEntries.reduce((acc, user) => {
    return (acc += user.sleepQuality);
  }, 0);
  return Math.round((avgQuality / sleepEntries.length) * 10) / 10;
}

function getHoursByDay(sleepData, id, date) {
  const sleepEntries = sleepData.filter((entry) => entry.userID === id);
  const dailyEntry = sleepEntries.find((entry) => entry.date === date);

  return dailyEntry.hoursSlept;
}

function getQualityByDay(sleepData, userID, date) {
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const dailyEntry = sleepEntries.find((entry) => entry.date === date);
  return dailyEntry.sleepQuality;
}

function getWeekSleep(sleepData, userID, startDate) {
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const indexOfCurrentDayEntry = sleepEntries.findIndex(
    (entry) => entry.date === startDate
  );
  let weeklySleep = [];
  for (let i = indexOfCurrentDayEntry; i > indexOfCurrentDayEntry - 7; i--) {
    if (i >= 0 && sleepEntries[i]) {
      weeklySleep.push(sleepEntries[i]);
    }
  }
  return weeklySleep;
}

function findCurrentDate(userID, hydrationData, sleepData, activityData) {
  let dateChoices = [];
  const hydrationEntries = hydrationData.filter(
    (entry) => entry.userID === userID
  );
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const activityEntries = activityData.filter(
    (entry) => entry.userID === userID
  );

  const lastHydrationEntry = hydrationEntries.slice(-1)[0];
  const lastSleepEntry = sleepEntries.slice(-1)[0];
  const lastActivityEntry = activityEntries.slice(-1)[0];
  const lastHydrationDate = lastHydrationEntry.date;
  const lastSleepDate = lastSleepEntry.date;
  const lastActivityDate = lastActivityEntry.date;
  dateChoices.push(lastHydrationDate, lastSleepDate, lastActivityDate);
  dateChoices.sort();
  let currentDate = dateChoices.slice(-1)[0];
  console.log('DATE', currentDate);
  return currentDate;
}

/* ~~~~~ Activity ~~~~~*/

const stepsPerDay = (activityData, currentUser, currentDate) => {
  const activityEntries = activityData.filter(
    (entry) => entry.userID === currentUser.id
  );
  const dailySteps = activityEntries.find((entry) => {
    return entry.date === currentDate;
  });
  return dailySteps.numSteps;
};

const activeMinutesPerDay = (activityData, currentUser, currentDate) => {
  const activityEntries = activityData.filter(
    (entry) => entry.userID === currentUser.id
  );
  const dailyMinutes = activityEntries.find((entry) => {
    return entry.date === currentDate;
  });
  return dailyMinutes.minutesActive;
};

const milesPerDay = (activityData, currentUser, currentDate) => {
  const activityEntries = activityData.filter(
    (entry) => entry.userID === currentUser.id
  );
  const dailyActivity = activityEntries.find((entry) => {
    return entry.date === currentDate;
  });
  return calculateMilesUserWalked(dailyActivity, currentUser);
};

const weeklySteps = (activityData, userID, startDate) => {
  const activityEntries = activityData.filter(
    (entry) => entry.userID === userID
  );
  const startDateIndex = activityEntries.findIndex(
    (entry) => entry.date === startDate
  );
  const weeklyData = activityEntries
    .slice(startDateIndex - 6, startDateIndex + 1)
    .reverse();
  return weeklyData;
};

const calculateMilesUserWalked = (activity, users) => {
  const milesWalked = (activity.numSteps * users.strideLength) / 5280;
  return Number(milesWalked.toFixed(2));
};

/* ~~~~~ Exports ~~~~~*/

export {
  getRandomUser,
  getUserById,
  getAvgStepGoal,
  getFluidDrankForSpecificDay,
  getWeeklyFluid,
  getAvgSleep,
  getAvgQuality,
  getHoursByDay,
  getQualityByDay,
  getWeekSleep,
  activeMinutesPerDay,
  stepsPerDay,
  weeklySteps,
  findCurrentDate,
  calculateMilesUserWalked,
  milesPerDay,
};
