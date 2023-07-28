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
    return undefined;
  }

  const totalStepGoal = users.reduce((acc, userInfo) => {
    return acc + userInfo.dailyStepGoal;
  }, 0);
  return Math.round(totalStepGoal / users.length);
};

/* ~~~~~ Get Average Fluid ~~~~~*/

function getAvgFluidForAllTime(hydrationData, id) {
  if (!hydrationData || !id) {
    return undefined;
  }

  const hydrationEntries = hydrationData.filter((entry) => entry.userID === id);
  const avgHydration = hydrationEntries.reduce((acc, user) => {
    return (acc += user.numOunces);
  }, 0);
  return Math.round(avgHydration / hydrationEntries.length);
}

function getFluidDrankForSpecificDay(hydrationData, id, date) {
  if (!hydrationData || !id || !date) {
    return undefined;
  }
  const hydrationEntries = hydrationData.filter((entry) => entry.userID === id);
  const dailyEntry = hydrationEntries.find((entry) => entry.date === date);
  return dailyEntry.numOunces;
}

function getWeeklyFluid(hydrationData, userID) {
  if (!hydrationData || !userID) {
    return undefined;
  }

  const hydrationEntries = hydrationData.filter(
    (entry) => entry.userID === userID
  );
  const lastIndex = hydrationEntries.length - 1;
  const weeklyHydration = hydrationEntries.slice(lastIndex - 6, lastIndex + 1);
  const weeklyHydrationData = weeklyHydration.map((entry) => ({
    date: entry.date,
    numOunces: entry.numOunces
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
  if(!dailyEntry){
    return 0;
  }
  return dailyEntry.hoursSlept;
}

function getQualityByDay(sleepData, userID, date) {
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const dailyEntry = sleepEntries.find((entry) => entry.date === date);
  if(!dailyEntry){
    return 0;
  }
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

function findLastEntry(userID, data) { 
  const entries = data.filter(
    (entry) => entry.userID === userID
  );

  const lastEntry = entries.slice(-1)[0];
  const lastDate = lastEntry.date;

  return lastDate
}

function findCurrentDate(userID, hydrationData, sleepData, activityData) {
  let dateChoices = [];
  const lastHydrationEntry = findLastEntry(userID, hydrationData);
  const lastSleepEntry = findLastEntry(userID, sleepData);
  const lastActivityEntry = findLastEntry(userID, activityData)

  dateChoices.push(lastHydrationEntry, lastSleepEntry, lastActivityEntry);
  dateChoices.sort();
  let currentDate = dateChoices.slice(-1)[0];
  console.log('DATE', currentDate);
  return currentDate;
}

// pass in one data for hydration, sleep (find current date )
// anything repeated- take out
// lastHydrationDate, lastSleepDate, lastActivityDate
// filter data by user, 

/* ~~~~~ Activity ~~~~~*/

const stepsPerDay = (activityData, currentUser, currentDate) => {
  const activityEntries = activityData.filter(
    (entry) => entry.userID === currentUser.id
  );
  const dailySteps = activityEntries.find((entry) => {
    return entry.date === currentDate;
  });
  if(!dailySteps){
    return 0;
  }
  return dailySteps.numSteps;
};

const activeMinutesPerDay = (activityData, currentUser, currentDate) => {
  const activityEntries = activityData.filter(
    (entry) => entry.userID === currentUser.id
  );
  const dailyMinutes = activityEntries.find((entry) => {
    return entry.date === currentDate;
  });
  if(!dailyMinutes){
    return 0;
  }
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
  if(!activity){
    return 0;
  };
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
  getAvgFluidForAllTime
};
