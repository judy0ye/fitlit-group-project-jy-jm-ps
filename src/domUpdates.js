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
  sleepCurrentDate,
  activityCurrentDate
} from './scripts';
import quotes from './data/quotes';

import { 
  createHydrationChart, 
  createSleepChart, 
  createActivityChart 
} from './charts';

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
const oneWeekActivityChart = document.querySelector('.weekly-activity-data')
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
  '.sleep-button'
);
const oneWeekHydrationFromCalendar = document.querySelector(
  '.weekly-hydration-from-calendar-data'
);
const hydrationFromCalendarButton = document.querySelector(
  '.hydration-button'
);
const dailyActivityData = document.querySelector('.activity');
const oneWeekActivityDataFromCalendarButton = document.querySelector(
  '.activity-button'
);
const form = document.querySelector('#form');
const formInput = document.querySelector('.water-intake')
const quote = document.querySelector('#headerQuote');

function displayRandomQuote() {
  quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
};

/* ~~~~ DOM MANIPULATION FUNCTIONS ~~~~*/

const hideChickenImage = () => {
  chickenImage.classList.remove('graphs-bg-img');
};

// const showChickenImage = () => {
//   chickenImage.classList.add('graphs-bg-img');
// };

const activateButtons = () => {
  sleepFromCalendarButton.disabled = false;
  sleepFromCalendarButton.classList.remove('disable-button');
  hydrationFromCalendarButton.disabled = false;
  hydrationFromCalendarButton.classList.remove('disable-button');
  oneWeekActivityDataFromCalendarButton.disabled = false;
  oneWeekActivityDataFromCalendarButton.classList.remove('disable-button');
};

/* ~~~~ Helper Functions ~~~~*/

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

const displaySevenDayData= (displayData, chartData, button, buttonClass) => {
  displayData.classList.remove('hidden');
  chartData.classList.remove('hidden')
  button.disabled = true;
  button.classList.add(buttonClass);
};

/* ~~~~~ Display Hydration Data Functions ~~~~~*/

const getWeeklyHydration = () => {
  const waterEntries = getWeeklyInfo(hydration);
  console.log('About to call createHydrationChart...');

  let numOz = waterEntries.reduce((acc, entry) => {
    return acc + entry.numOunces;
  }, 0);

  if (waterEntries.length === 0) {
    return waterEntries;
  }

  let avg = Math.round(numOz / waterEntries.length);

  oneWeekHydrationFromCalendar.innerHTML = ''; 

  waterEntries.forEach((entry) => {
    oneWeekHydrationFromCalendar.innerHTML += `<p>On ${entry.date} you drank <strong> ${entry.numOunces} </strong> ounces of water</p></p>`;
  });
  oneWeekHydrationFromCalendar.innerHTML += `<p>Your average water consumption was <strong> ${avg} <strong> ounces</p>`;

  createHydrationChart(waterEntries); // create the chart with the fetched data

  return waterEntries
};

const displaySevenDayHydration = () => {
  displaySevenDayData(oneWeekHydrationChart, oneWeekHydrationChart, hydrationFromCalendarButton, 'disable-button')
};

const hideWeeklyHydrationChart = () => {
  oneWeekHydrationChart.classList.add('hidden');
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

function displayFluidConsumedToday(hydration, currentUser, currentDate) {
  const fluidToday = getFluidDrankForSpecificDay(
    hydration,
    currentUser.id,
    currentDate
  );

  hydrationInfo.innerHTML += `<p>You drank <strong>${fluidToday}</strong> ounces yesterday</p>`;
}

// function displayHydrationGraphs() {
//   oneWeekHydrationChart.classList.remove('hidden');
//   weeklyHydrationButton.disabled = true;
//   weeklyHydrationButton.classList.add('disable-button');
// }

// function hideHydrationGraphs() {
//   oneWeekHydrationChart.classList.add('hidden');
//   weeklyHydrationButton.disabled = false;
//   weeklyHydrationButton.classList.remove('disable-button');
// }

/* ~~~~~ Display Sleep Data Functions ~~~~~*/

//NOTYE: changed currentDate to sleepCurrentDate
function displayDailySleep(sleep, currentUser, sleepCurrentDate) {

  console.log('displayDailySleep sleepCurrentDate:', sleepCurrentDate);

  const currentDayEntry = getHoursByDay(sleep, currentUser.id, sleepCurrentDate);

  if (currentDayEntry) {
    dailySleep.innerHTML = `You slept <strong>${currentDayEntry} </strong> hours last night.`;
  } else {
    dailySleep.innerHTML = 'You need to get more sleep!';
  }
  
  console.log('ZZZZZ currentDayEntry:', currentDayEntry);

}

// function displaySleepGraphs() {
//   oneWeekSleepChart.classList.remove('hidden');
//   sleepButton.disabled = true;
//   sleepButton.classList.add('disable-button');
// }

// function hideSleepGraphs() {
//   oneWeekSleepChart.classList.add('hidden');
//   sleepButton.disabled = false;
//   sleepButton.classList.remove('disable-button');
// }

function displayAverageSleep(sleep, currentUser) {
  averageSleep.innerHTML += `You average <strong> ${getAvgSleep(
    sleep,
    currentUser.id
  )}</strong> hours of sleep each night and a 
  <strong>${getAvgQuality(sleep, currentUser.id)} </strong> sleep quality rating!`;
}

const getWeeklySleep = () => {
  const sleepHourEntries = getWeeklyInfo(sleep)
  let hoursSlept = sleepHourEntries.reduce((acc, entry) => {
    return acc + entry.hoursSlept;
  }, 0);

  let sleepQuality = sleepHourEntries.reduce((acc, entry) => {
    return acc + entry.sleepQuality;
  }, 0);

  if (sleepHourEntries.length === 0) {
    return sleepHourEntries;
  }

  let avgHoursSlept = Math.round(hoursSlept / sleepHourEntries.length);
  let avgSleepQuality = Math.round(sleepQuality / sleepHourEntries.length);

  sleepHourEntries.forEach((entry) => {
    oneWeekSleepFromCalendar.innerHTML += `<p>On ${entry.date}, you slept ${entry.hoursSlept} hours and your sleep quality was rated: ${entry.sleepQuality}</p>`;
  });
  oneWeekSleepFromCalendar.innerHTML += `<p>Your average hours slept was ${avgHoursSlept} hours</p>`;
  oneWeekSleepFromCalendar.innerHTML += `<p>Your average sleep quality has a rating of ${avgSleepQuality}</p>`;

  createSleepChart(sleepHourEntries); // create the chart with the fetched data

  return sleepHourEntries
};

const displaySevenDaySleep = () => {
  displaySevenDayData(oneWeekSleepFromCalendar, oneWeekSleepChart, sleepFromCalendarButton, 'disable-button')
};

const hideWeeklySleepChart = () => {
  oneWeekSleepChart.classList.add('hidden');
};


/* ~~~~~ Display Activity Data Functions ~~~~~*/

function displayWeeklyStepCount(currentUser) {
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
  createActivityChart(activityEntries, currentUser); // call chart creation after displaying weekly data

  return activityEntries
};

// NOTE: replaced the currentDate with activityCurrentDate

function displayActivity(activityData, currentUser, activityCurrentDate) {

  //console.log('displayActivity called with activityData, currentUser, currentDate:', activityData, currentUser, currentDate);

  console.log('displayActivity called with activityData:', activityData);
  console.log('displayActivity called with currentUser:', currentUser);
  console.log('displayActivity currentDate:', activityCurrentDate);

  dailySteps.innerHTML = `You took <strong>${stepsPerDay(
    activityData,
    currentUser,
   // currentDate
    activityCurrentDate
  )}</strong> steps today!`;
  dailyMiles.innerHTML = `You have walked <strong>${milesPerDay(
    activityData,
    currentUser,
    activityCurrentDate
  )} </strong> miles today!`;
  dailyMinutes.innerHTML = `You were active for <strong>${activeMinutesPerDay(
    activityData,
    currentUser,
    activityCurrentDate
  )}</strong> minutes today!`;

  console.log('Steps today:', stepsPerDay(activityData, currentUser, activityCurrentDate));
  console.log('Miles today:', milesPerDay(activityData, currentUser, activityCurrentDate));
  console.log('Minutes today:', activeMinutesPerDay(activityData, currentUser, activityCurrentDate));
}



const displaySevenDayActivity = () => {
  displaySevenDayData(weeklyActivityData, oneWeekActivityChart, oneWeekActivityDataFromCalendarButton, 'disable-button' )
};

const hideWeeklyActivityChart = () => {
  oneWeekActivityChart.classList.add('hidden');
};

/* ~~~~~~~~~~ EXPORTS ~~~~~~~~~~*/

export {
  displayRandomUser,
  displayDailySleep,
  displayAverageSleep,
  displayFluidConsumedToday,
  weeklyHydrationButton,
  sleepButton,
  displayWeeklyStepCount,
  hideChickenImage,
  getWeeklySleep,
  inputField,
  displaySevenDaySleep,
  dataField,
  sleepFromCalendarButton,
  activateButtons,
  getWeeklyHydration,
  getWeeklyInfo,
  displaySevenDayHydration,
  hydrationFromCalendarButton,
  oneWeekActivityDataFromCalendarButton,
  displayActivity,
  displaySevenDayActivity,
  displayRandomQuote,
  form,
  hydrationInfo,
  hideWeeklyHydrationChart,
  hideWeeklyActivityChart,
  hideWeeklySleepChart 
};
