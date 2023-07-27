/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

import {
  getAvgSleep,
  getAvgQuality,
  getHoursByDay,
  getWeekSleep,
  getFluidDrankForSpecificDay,
  getWeeklyFluid,
  weeklySteps,
  getAvgStepGoal,
  calculateMilesUserWalked,
  stepsPerDay,
  milesPerDay,
  activeMinutesPerDay,
} from './utils';

import {
  activity,
  hydration,
  currentUser,
  sleep,
  users,
  currentDate,
} from './scripts';
import quotes from './data/quotes';

import { createHydrationChart, createSleepChart } from './charts';
import { Chart } from 'chart.js';

/* ~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~*/

const personalData = document.querySelector('.user-data');
const personalGoal = document.querySelector('.goals');
const personalGreeting = document.querySelector('.greeting');
const hydrationInfo = document.querySelector('.hydration');
let dailySleep = document.querySelector('#dailySleep');
let weeklySleep = document.querySelector('#weeklySleepHours');
let averageSleep = document.querySelector('#averageSleep');
const oneWeekHydrationChart = document.querySelector('.weekly-hydration-data');
const weeklyActivityData = document.querySelector(
  '.weekly-activity-from-calendar-data'
);
const dailySteps = document.querySelector('.activity-daily-steps');
const dailyMinutes = document.querySelector('.activity-daily-minutes');
const dailyMiles = document.querySelector('.activity-daily-miles');
const oneWeekSleepChart = document.querySelector('.weekly-sleep-data');
const oneWeekSleepFromCalendar = document.querySelector(
  '.weekly-sleep-from-calendar-data'
);
const weeklyHydrationButton = document.querySelector('.hydration-button');
const sleepButton = document.querySelector('.sleep-button');
const chickenImage = document.querySelector('.graphs-bg-img');
const inputField = document.getElementById('start-date-input');
const dataField = document.querySelector('.data-view');
const sleepFromCalendarButton = document.querySelector(
  '.sleep-from-calendar-button'
);
const oneWeekHydrationFromCalendar = document.querySelector(
  '.weekly-hydration-from-calendar-data'
);
const hydrationFromCalendarButton = document.querySelector(
  '.hydration-from-calendar-button'
);
const dailyActivityData = document.querySelector('.activity');
const oneWeekActivityDataFromCalendarButton = document.querySelector(
  '.activity-from-calendar-button'
);
const form = document.querySelector('#form');
const formInput = document.querySelector('.water-intake')
const quote = document.querySelector('#headerQuote');

function displayRandomQuote() {
  quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
};

/* ~~~~ DOM MANIPULATION FUNCTIONS ~~~~*/
const getWeeklyInfo = (wellnessInfo) => {
  oneWeekSleepFromCalendar.innerHTML = '';
  oneWeekHydrationFromCalendar.innerHTML = '';
  weeklyActivityData.innerHTML = '';

  const startDate = new Date(inputField.value + ' 12:00:00');

  let entries = [];
  for (let i = 0; i < 7; i++) {
    let nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + i);
    let date =
      nextDate.getFullYear() +
      '/' +
      ('0' + (nextDate.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + nextDate.getDate()).slice(-2);
    let entry = wellnessInfo.find(
      (info) => info.date === date && info.userID === currentUser.id
    );
    if (entry) {
      entries.push(entry);
    }
  }
  return entries
};

//goof working function before chart implementation.

// const getWeeklyHydration = () => {
//   const waterEntries = getWeeklyInfo(hydration)

//   let numOz = waterEntries.reduce((acc, entry) => {
//     return acc + entry.numOunces;
//   }, 0);

//   if (waterEntries.length === 0) {
//     return 0;
//   }

//   let avg = Math.round(numOz / waterEntries.length);

//   waterEntries.forEach((entry) => {
//     oneWeekHydrationFromCalendar.innerHTML += `<p>On ${entry.date} you drank ${entry.numOunces} ounces of water</p></p>`;
//   });
//   oneWeekHydrationFromCalendar.innerHTML += `<p>Your average water consumption was ${avg} ounces</p>`;
// };

//modifyed function for chart.

const getWeeklyHydration = () => {
  const waterEntries = getWeeklyInfo(hydration);
  console.log('About to call createHydrationChart...');

  let numOz = waterEntries.reduce((acc, entry) => {
    return acc + entry.numOunces;
  }, 0);

  if (waterEntries.length === 0) {
    return 0;
  }

  let avg = Math.round(numOz / waterEntries.length);

  oneWeekHydrationFromCalendar.innerHTML = ''; // clear previous entries for chart part

  waterEntries.forEach((entry) => {
    oneWeekHydrationFromCalendar.innerHTML += `<p>On ${entry.date} you drank ${entry.numOunces} ounces of water</p></p>`;
  });
  oneWeekHydrationFromCalendar.innerHTML += `<p>Your average water consumption was ${avg} ounces</p>`;

  createHydrationChart(waterEntries); // create the chart with the fetched data
};

const displaySevenDayHydration = () => {
  oneWeekHydrationFromCalendar.classList.remove('hidden');
  hydrationFromCalendarButton.disabled = true;
  hydrationFromCalendarButton.classList.add('disable-button');
};

const displaySevenDayActivity = () => {
  weeklyActivityData.classList.remove('hidden');
  oneWeekActivityDataFromCalendarButton.disabled = true;
  oneWeekActivityDataFromCalendarButton.classList.add('disable-button');

};

const getWeeklySleep = () => {
  const sleepHourEntries = getWeeklyInfo(sleep)
  let hoursSlept = sleepHourEntries.reduce((acc, entry) => {
    return acc + entry.hoursSlept;
  }, 0);

  let sleepQuality = sleepHourEntries.reduce((acc, entry) => {
    return acc + entry.sleepQuality;
  }, 0);

  if (sleepHourEntries.length === 0) {
    return 0;
  }

  let avgHoursSlept = Math.round(hoursSlept / sleepHourEntries.length);
  let avgSleepQuality = Math.round(sleepQuality / sleepHourEntries.length);

  sleepHourEntries.forEach((entry) => {
    oneWeekSleepFromCalendar.innerHTML += `<p>On ${entry.date}, you slept ${entry.hoursSlept} hours and your sleep quality was rated: ${entry.sleepQuality}</p>`;
  });
  oneWeekSleepFromCalendar.innerHTML += `<p>Your average hours slept was ${avgHoursSlept} hours</p>`;
  oneWeekSleepFromCalendar.innerHTML += `<p>Your average sleep quality has a rating of ${avgSleepQuality}</p>`;

  createSleepChart(sleepHourEntries); // create the chart with the fetched data
};

const displaySevenDaySleep = () => {
  oneWeekSleepFromCalendar.classList.remove('hidden');
  sleepFromCalendarButton.disabled = true;
  sleepFromCalendarButton.classList.add('disable-button');
};

const activateButtons = () => {
  sleepFromCalendarButton.disabled = false;
  sleepFromCalendarButton.classList.remove('disable-button');
  hydrationFromCalendarButton.disabled = false;
  hydrationFromCalendarButton.classList.remove('disable-button');
  oneWeekActivityDataFromCalendarButton.disabled = false;
  oneWeekActivityDataFromCalendarButton.classList.remove('disable-button');
};

/* ~~~~~ Display Random User Data Functions ~~~~~*/

const displayRandomUser = (activity, currentUser) => {
  const allUserStepGoalAvg = getAvgStepGoal(users);
  const userActivity = activity
    .filter((activityEachDay) => activityEachDay.userID === currentUser.id)
    .filter((each) => each.date === currentDate)[0];

  const currentUserMilesWalked = calculateMilesUserWalked(
    userActivity,
    currentUser
  );

  personalGreeting.innerHTML = `<article><h3>Welcome</h3>${currentUser.name}</article>`;

  personalData.innerHTML = `<article><h3>Name:</h3>${currentUser.name}
  <h3>Address: </h3>${currentUser.address}
  <h3>E-mail: </h3>${currentUser.email}
  <h3>Stride Length: </h3>${currentUser.strideLength}
  </article>`;

  personalGoal.innerHTML = `<article><h3>Daily Step Goal:</h3>${currentUser.dailyStepGoal}
  <h3>Miles Walked Today:</h3>${currentUserMilesWalked}
  <h3>All User's Average Step Goal:</h3>${allUserStepGoalAvg}</article>`;
};


const hideChickenImage = () => {
  chickenImage.classList.remove('graphs-bg-img');
};

const showChickenImage = () => {
  chickenImage.classList.add('graphs-bg-img');
};

function displayFluidConsumedToday(hydration, currentUser, currentDate) {
  const fluidToday = getFluidDrankForSpecificDay(
    hydration,
    currentUser.id,
    currentDate
  );

  hydrationInfo.innerHTML += `<p>You drank ${fluidToday} ounces today</p>`;
}

function displayWeeklyHydrationData(hydration, currentUser) {
  const weeklyHydrationEntries = getWeeklyFluid(hydration, currentUser.id);

  weeklyHydrationEntries.forEach((entry) => {
    oneWeekHydrationChart.innerHTML += `<p>${entry.date}: ${entry.numOunces} ounces</p>`;
  });
}

function displayHydrationGraphs() {
  oneWeekHydrationChart.classList.remove('hidden');
  weeklyHydrationButton.disabled = true;
  weeklyHydrationButton.classList.add('disable-button');
}
function hideHydrationGraphs() {
  oneWeekHydrationChart.classList.add('hidden');
  weeklyHydrationButton.disabled = false;
  weeklyHydrationButton.classList.remove('disable-button');
}

/* ~~~~~ Display Sleep Data Functions ~~~~~*/

function displayDailySleep(sleep, currentUser, currentDate) {
  const currentDayEntry = getHoursByDay(sleep, currentUser.id, currentDate);
  if (currentDayEntry) {
    dailySleep.innerText = `You slept ${currentDayEntry} hours last night.`;
  } else {
    dailySleep.innerText = 'You need to get more sleep!';
  }
}

function displayWeeklySleep(sleep, currentUser, currentDate) {
  const weeklySleepEntries = getWeekSleep(sleep, currentUser.id, currentDate);
  weeklySleepEntries.forEach((entry) => {
    oneWeekSleepChart.innerHTML += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}`;
  });
}

function displaySleepGraphs() {
  oneWeekSleepChart.classList.remove('hidden');
  sleepButton.disabled = true;
  sleepButton.classList.add('disable-button');
}

function hideSleepGraphs() {
  oneWeekSleepChart.classList.add('hidden');
  sleepButton.disabled = false;
  sleepButton.classList.remove('disable-button');
}

function displayAverageSleep(sleep, currentUser) {
  averageSleep.innerText += `You average ${getAvgSleep(
    sleep,
    currentUser.id
  )} hours of sleep each night and a 
  ${getAvgQuality(sleep, currentUser.id)} sleep quality rating!`;
}

/* ~~~~~ Display Activity Data Functions ~~~~~*/

function displayWeeklyStepCount(activityData, currentUser, currentDate) {
  const activityEntries = getWeeklyInfo(activity)

  activityEntries.forEach((entry) => {
    if (entry.numSteps >= currentUser.dailyStepGoal) {
      weeklyActivityData.innerHTML += `<p>On ${entry.date}, you walked ${entry.numSteps} of steps. You met your goal.  Take a nap!
      </p>  `;
    } else {
      weeklyActivityData.innerHTML += `<p>On ${entry.date}, you walked ${entry.numSteps} steps. You have not met your goal.  STEP IT UP!
      </p> `;
    }
  });
}

function displayActivity(activityData, currentUser, currentDate) {
  dailySteps.innerText = `You took ${stepsPerDay(
    activityData,
    currentUser,
    currentDate
  )} steps today!`;
  dailyMiles.innerText = `You have walked ${milesPerDay(
    activityData,
    currentUser,
    currentDate
  )} miles today!`;
  dailyMinutes.innerText = `You were active for ${activeMinutesPerDay(
    activityData,
    currentUser,
    currentDate
  )} minutes today!`;
}

/* ~~~~~~~~~~ EXPORTS ~~~~~~~~~~*/

export {
  displayRandomUser,
  displayDailySleep,
  displayWeeklySleep,
  displayAverageSleep,
  displayFluidConsumedToday,
  displayWeeklyHydrationData,
  weeklyHydrationButton,
  displayHydrationGraphs,
  hideHydrationGraphs,
  sleepButton,
  displayWeeklyStepCount,
  hideSleepGraphs,
  hideChickenImage,
  showChickenImage,
  getWeeklySleep,
  inputField,
  displaySevenDaySleep,
  dataField,
  displaySleepGraphs,
  sleepFromCalendarButton,
  activateButtons,
  getWeeklyHydration,
  displaySevenDayHydration,
  hydrationFromCalendarButton,
  oneWeekActivityDataFromCalendarButton,
  displayActivity,
  displaySevenDayActivity,
  displayRandomQuote,
  form,
  hydrationInfo
};
