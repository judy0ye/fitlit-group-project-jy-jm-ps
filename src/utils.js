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
  console.log('Show ME: getAvgSleep', sleepData)
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const avgSleep = sleepEntries.reduce((acc, user) => {
    return (acc += user.hoursSlept);
  }, 0);
  return Math.round((avgSleep / sleepEntries.length) * 10) / 10;
}

function getAvgQuality(sleepData, userID) {
  console.log('Show ME: getAvgQuality and userID', sleepData, userID)
  const sleepEntries = sleepData.filter((entry) => entry.userID === userID);
  const avgQuality = sleepEntries.reduce((acc, user) => {
    return (acc += user.sleepQuality);
  }, 0);
  return Math.round((avgQuality / sleepEntries.length) * 10) / 10;
}

// // Create a new function to display the chart
// function displaySleepChart(sleepData, currentUser) {
//   let avgSleep = getAvgSleep(sleepData, currentUser.id);
//   let avgQuality = getAvgQuality(sleepData, currentUser.id);

// // Get a reference to the canvas element
// let sleepChartContext = document.getElementById('myChart').getContext('2d');

// // Create the chart
// let sleepChart = new Chart(sleepChartContext, {
//   type: 'bar',
//   data: {
//     labels: ['Avg Sleep', 'Avg Quality'],
//     datasets: [{
//       label: 'Hours / Rating',
//       data: [avgSleep, avgQuality],
//       backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)'],
//       borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });
// }

// Call the function when you want to display the chart
// displaySleepChart(sleepData, currentUser);
// This code should create a bar chart with two bars. One bar represents the average hours slept, and the other bar represents the average sleep quality.

// The chart is created in the "myChart" canvas element, and the colors and layout of the chart can be customized to fit your needs.

// Remember to include this code in your main JavaScript file where the "currentUser" object and "sleepData" array are defined. Also, make sure you've correctly included the Chart.js library. You need to call the displaySleepChart function after your sleep data is fetched and available.



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
