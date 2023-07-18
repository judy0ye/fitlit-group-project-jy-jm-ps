/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

//import { currentUser } from './dataModel';
//import { getAvgStepGoal, getRandomUser  } from './utils';
// import { getFluidPerWeek } from './utils';
import {
  getAvgSleep,
  getAvgQuality,
  getHoursByDay,
  getWeekSleep,
  // getAvgFluidForAllTime, DO WE EVEN NEED THIS
  getFluidDrankForSpecificDay,
  getWeeklyFluid,
  returnDailySteps,
  weeklySteps,
  getAvgStepGoal,
  calculateMilesUserWalked,
} from './utils';
//import { fetchApiData } from './apiCalls';

import { activity, hydration, currentUser, sleep, users, currentDate} from './scripts';
/* ~~~~~~~~~~ GLOBAL VARIABLE ~~~~~~~~~~*/

let groupedHydration, groupedSleep, weeklyWaterIntake;

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

const oneWeekSleepChart = document.querySelector('.weekly-sleep-data');
const oneWeekSleepFromCalendar = document.querySelector(
  '.weekly-sleep-from-calendar-data'
);
const weeklyHydrationButton = document.querySelector('.hydration-button');
const sleepButton = document.querySelector('.sleep-button');
const chickenImage = document.querySelector('.main-image');
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
// const oneWeekActivityDataFromCalendar = document.querySelector('.weekly-activity-from-calendar-data')
const oneWeekActivityDataFromCalendarButton = document.querySelector('.activity-from-calendar-button')
/* ~~~~~~~~~~ DOM MANIPULATION FUNCTIONS ~~~~~~~~~~*/

const getWeeklyHydration = () => {
  oneWeekHydrationFromCalendar.innerHTML = '';
  oneWeekSleepFromCalendar.innerHTML = '';

  const startDate = new Date(inputField.value + ' 12:00:00');

  let waterEntries = [];
  for (let i = 0; i < 7; i++) {
    let nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + i);
    let date =
      nextDate.getFullYear() +
      '/' +
      ('0' + (nextDate.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + nextDate.getDate()).slice(-2);
    let waterEntry = hydration.find(
      (entry) => entry.date === date && entry.userID === currentUser.id
    );
    if (waterEntry) {
      waterEntries.push(waterEntry);
    }
  }

  let numOz = waterEntries.reduce((acc, entry) => {
    return acc + entry.numOunces;
  }, 0);

  if (waterEntries.length === 0) {
    return 0;
  }

  let avg = Math.round(numOz / waterEntries.length);

  waterEntries.forEach((entry) => {
    oneWeekHydrationFromCalendar.innerHTML += `<p>On ${entry.date} you drank ${entry.numOunces} ounces of water</p></p>`;
  });
  oneWeekHydrationFromCalendar.innerHTML += `<p>Your average water consumption was ${avg} ounces</p>`;
};

const displaySevenDayHydration = () => {
  oneWeekHydrationFromCalendar.classList.remove('hidden');
  hydrationFromCalendarButton.disabled = true;
  hydrationFromCalendarButton.classList.add('disable-button');
};

const getWeeklySleep = () => {
  oneWeekSleepFromCalendar.innerHTML = '';
  oneWeekHydrationFromCalendar.innerHTML = '';
  weeklyActivityData.innerHTML = ''

  const startDate = new Date(inputField.value + ' 12:00:00');

  let sleepHourEntries = [];
  for (let i = 0; i < 7; i++) {
    let nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + i);
    let date =
      nextDate.getFullYear() +
      '/' +
      ('0' + (nextDate.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + nextDate.getDate()).slice(-2);
    let sleepHourEntry = sleep.find(
      (entry) => entry.date === date && entry.userID === currentUser.id
    );
    if (sleepHourEntry) {
      sleepHourEntries.push(sleepHourEntry);
    }
  }
  let hoursSlept = sleepHourEntries.reduce((acc, entry) => {
    return acc + entry.hoursSlept;
  }, 0);

  let avg = Math.round(hoursSlept / sleepHourEntries.length);

  let sleepQuality = sleepHourEntries.reduce((acc, entry) => {
    return acc + entry.sleepQuality;
  }, 0);

  if (sleepHourEntries.length === 0) {
    return 0;
  }

  let avgHoursSlept = Math.round(hoursSlept / sleepHourEntries.length);
  let avgSleepQuality = Math.round(sleepQuality / sleepHourEntries.length);

  sleepHourEntries.forEach((entry) => {
    oneWeekSleepFromCalendar.innerHTML += `<p>On ${entry.date}, you slept ${entry.hoursSlept} 

    hours and your sleep quality was rated: ${entry.sleepQuality}</p>`;
  });
  oneWeekSleepFromCalendar.innerHTML += `<p>Your average hours slept was ${avgHoursSlept} hours</p>`;
  oneWeekSleepFromCalendar.innerHTML += `<p>Your average sleep quality has a rating of ${avgSleepQuality}</p>`;
};

const displaySevenDaySleep = () => {
  oneWeekSleepFromCalendar.classList.remove('hidden');
  sleepFromCalendarButton.disabled = true;
  sleepFromCalendarButton.classList.add('disable-button');
};

const displaySevenDayActivity = () => {
  weeklyActivityData.classList.remove('hidden');
  oneWeekActivityDataFromCalendarButton.disabled = true;
  oneWeekActivityDataFromCalendarButton.classList.add('disable-button');
};

const activateButtons = () => {
  sleepFromCalendarButton.disabled = false;
  sleepFromCalendarButton.classList.remove('disable-button');
  hydrationFromCalendarButton.disabled = false;
  hydrationFromCalendarButton.classList.remove('disable-button');
  oneWeekActivityDataFromCalendarButton.disabled = false;
  oneWeekActivityDataFromCalendarButton.classList.remove('disable-button');
};

// const getWeeklyActivity = () => {
//   oneWeekSleepFromCalendar.innerHTML = '';
//   oneWeekHydrationFromCalendar.innerHTML = '';

//   const startDate = new Date(inputField.value + ' 12:00:00');
//   // step count, flights of stairs climbed, and minutes active
//   let activityEntries = [];
//   for (let i = 0; i < 7; i++) {
//     let nextDate = new Date(startDate);
//     nextDate.setDate(nextDate.getDate() + i);
//     let date =
//       nextDate.getFullYear() +
//       '/' +
//       ('0' + (nextDate.getMonth() + 1)).slice(-2) +
//       '/' +
//       ('0' + nextDate.getDate()).slice(-2);
//     let activityEntry = activity.find(
//       (entry) => entry.date === date && entry.userID === currentUser.id
//     );
//     if (activityEntry) {
//       activityEntries.push(activityEntry);
//     }
//   }

//   let numSteps = activityEntries.reduce((acc, entry) => {
//     return acc + entry.numSteps;
//   }, 0);

//   let minutesActive = activityEntries.reduce((acc, entry) => {
//     return acc + entry.minutesActive;
//   }, 0);

//   let flightOfStairsTaken = activityEntries.reduce((acc, entry) => {
//     return acc + entry.flightsOfStairs;
//   }, 0);

//   if (activityEntries.length === 0) {
//     return 0;
//   }

//   let avgNumSteps = Math.round(numSteps / activityEntries.length);
//   let avgMinutesActive = Math.round(minutesActive/ activityEntries.length);
//   let avgFlightOfStairsTaken = Math.round(flightOfStairsTaken/ activityEntries.length);

//   activityEntries.forEach((entry) => {
//     oneWeekActivityDataFromCalendar.innerHTML += `<p>On ${entry.date}, you walked for ${entry.minutesActive}
//     minutes and went up ${entry.flightsOfStairs}</p>`;
//   });
//   oneWeekActivityDataFromCalendar.innerHTML += `<p>Your average number of steps were ${avgNumSteps}</p>`;
//   oneWeekActivityDataFromCalendar.innerHTML += `<p>Your average minutes active were ${avgMinutesActive}</p>`;
//   oneWeekActivityDataFromCalendar.innerHTML += `<p>Your average minutes active were ${avgFlightOfStairsTaken}</p>`;
// };





/* ~~~~~ Display Random User Data Functions ~~~~~*/

const displayRandomUser = (currentUser) => {
  const allUserStepGoalAvg = getAvgStepGoal(users)
  const userActivity = activity
    .filter(activityEachDay => activityEachDay.userID === currentUser.id)
    .filter(each => each.date === currentDate)[0]

  const currentUserMilesWalked = calculateMilesUserWalked(userActivity, currentUser) 
  
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
  chickenImage.classList.add('hidden');
};

const showChickenImage = () => {
  chickenImage.classList.remove('hidden');
};

function displayFluidConsumedToday(hydration, currentUser, currentDate) {
  const fluidToday = getFluidDrankForSpecificDay(
    hydration,
    currentUser.id,
    currentDate
  );

  hydrationInfo.innerHTML = `You drank ${fluidToday} ounces today`;
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
  const weeklyActivityEntries = weeklySteps(
    activityData,
    currentUser.id,
    currentDate
  );
  weeklyActivityData.innerHTML = ''
  weeklyActivityEntries.forEach((entry) => {
    if (entry.numSteps >= currentUser.dailyStepGoal) {
      weeklyActivityData.innerHTML += `<p>${entry.date}: You took ${entry.numSteps} steps. You met your goal.  Take a nap!
        </p>`;
    } else {
      weeklyActivityData.innerHTML += `<p>${entry.date}: You took ${entry.numSteps} steps. You have not met your goal.  STEP IT UP!</p> `;
    }
  });
}


function displayActivity() {
  dailySteps.innerText = `You took ${activity.returnDailySteps(
    currentUser.id,
    currentDate
  )} steps today!`;
  dailyMiles.innerText = `You have walked ${activity.returnMiles(
    currentUser.id,
    currentDate
  )} miles today!`;
  dailyMinutes.innerText = `You were active for ${activity.returnMinutesActive(
    currentUser.id,
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
  // getWeeklyActivity,
  displaySevenDayActivity,
  oneWeekActivityDataFromCalendarButton  
};
