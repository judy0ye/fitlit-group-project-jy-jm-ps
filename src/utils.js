/* ~~~~~ Days-JS ~~~~~*/

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

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

  const totalStepGoal= users.reduce((acc, userInfo) => {
    return acc + userInfo.dailyStepGoal
  }, 0)
  return Math.round(totalStepGoal/users.length)
};


/* ~~~~~ Get Average Fluid ~~~~~*/
//???????
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
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SAVE FOR PART TWO
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getFluidOuncesPerDay(hydrationData, day, id) {
  let invidualUser = []

  hydrationData.filter(user => {
    if (user.userID = id && dayjs(user.date).isSame(day, 'day')) {
    invidualUser.push(user)
    }

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
  sortedDays = [['date', oz], ['date', oz]]
  .sort(([dateA], [dateB]) => dayjs(dateA).diff(dayjs(dateB)))
  * the above works too but I'm more comfortable with the the lines below *
  .sort((a, b) => dayjs(a[0]).diff(dayjs(b[0]), 'day'))
  .slice(0, 7)
  .reduce((sevenDays, [date, ounces]) => {
    sevenDays[date] = ounces;
    return sevenDays;
  }, {});
 console.log('sortedDays: ', sortedDays)
  return sortedDays
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SAVE ABOVE FOR PART 2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

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
  // console.log('getHoursByDay:', sleepData, id, date);
  const sleepEntries = sleepData.filter((entry) => entry.userID === id);
  // console.log('sleepEntries:', sleepEntries);
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
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ASK SAM - Need a Function to help us get a global currentDATE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function getUserDates(userData) {
    let userID = userData.user.id;
    let userHydrationDates = [];
    // let userSleepDates = [];
    // let userActivityDates = [];

    return {
      hydrationsDates(hydrationData) {
        const hydrationEntries = hydrationData.filter(
          (entry) => entry.userID === userID.id
        );
        userHydrationDates.push(hydrationEntries.date);
        console.log(userHydrationDates);
        return userHydrationDates;
      },
    };
    return hydrationsDates;
  }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SEND TO SAM
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
JAN - FIX THIS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const weeklySleepData = weeklySleep.map((entry) => {
    return {
      date: entry.date,
      hoursSlept: entry.hoursSlept + ' hours slept',
      sleepQuality: ' a sleep quality rating of ' + entry.sleepQuality,
    };
  });
  return weeklySleepData;
}

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~ Activity ~~~~~*/
//bullet #2 -- change the name to dailySteps
const stepsPerDay = (activityData, userID, currentDate) => {
  const activityEntries = activityData.filter(
    (entry) => entry.userID === userID.id
  );
  const dailySteps = activityEntries.find((entry) => {
    return entry.date === currentDate;
  });
  return dailySteps.numSteps;
};

const activeMinutesPerDay = (activityData, userID, currentDate) => {
  const activityEntries = activityData.filter(
    (entry) => entry.userID === userID.id
  );
  const dailyMinutes = activityEntries.find((entry) => {
    return entry.date === currentDate;
  });
  return dailyMinutes.minutesActive;
};

//Might be able to use some of this logic for step calculations:
// const returnActiveMinutesByDay = (activityData, userID) => {
//   const activityEntries = activityData.filter(
//     (entry) => entry.userID === userID.id
//   );
//   const totalMinutes = activityEntries.reduce((acc, user) => {
//     return (acc += user.minutesActive);
//   }, 0);
//   // const avgActivityHours = Math.floor(totalMinutes / 60 / activityEntries.length);
//   // console.log('AVERAGE ACTIVITY (HOURS):', avgActivityHours);
//   console.log('TOTAL MINUTES', totalMinutes);
//   return totalMinutes;
// };

// const weeklySteps = (activityData, userID, activityDate) => {
//   const userActivityData = activityData.filter(())
//   const startDataIndex = userActivityData.findIndex(
//     (entry) => entry.date === startDate
//   );
//   const weeklyData = userActivityData
//     .slice(startDataIndex - 6, startDataIndex + 1)
//     .reverse();

//   return weeklyData.map((entry) => ({
//     date: entry.date,
//     steps: entry.numSteps + ' steps taken',
//   }));
// };

const weeklySteps = (activityData, userID) => {
  
  const activityEntries = activityData
  .filter((entry) => {entry.userID === userID.id})
  const lastIndex = activityEntries.length - 1;
  const lastWeekOfActivity = activityEntries.slice(lastIndex - 6, lastIndex + 1);
  const weeklyStepData = lastWeekOfActivity.map((entry) => ({
    date: entry.date,
    numSteps: entry.numSteps + ' number of steps ',
  }));
  return weeklyStepData;
}
//still need to be able to choose 7 days from the calendar
//compare steps by day to step goal and return

  // const startDataIndex = userActivityData.findIndex(
  //   (entry) => entry.date === startDate
  // );
  // const weeklyData = userActivityData
  //   .slice(startDataIndex - 6, startDataIndex + 1)
  //   .reverse();

  // return weeklyData.map((entry) => ({
  //   date: entry.date,
  //   steps: entry.numSteps + ' steps taken',
  // }));





const metStepGoal = (activityData, userData, userID, date) => {
  const userInfo = findUserData(userData, userID);
  const userActivityData = findUserActivityData(activityData, userID);
  const dailyData = findUserDailyData(userActivityData, date);

  return dailyData.numSteps >= userInfo.dailyStepGoal;
};

const returnMiles = (activityData, userData, userID, date) => {
  const userInfo = findUserData(userData, userID);
  const userActivityData = findUserActivityData(activityData, userID);
  const dailyData = findUserDailyData(userActivityData, date);

  return Math.round((userInfo.strideLength * dailyData.numSteps) / 5280);
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
  //getSleepDataByDate,
  getWeekSleep,
  activeMinutesPerDay,
  stepsPerDay,
  weeklySteps,
};
