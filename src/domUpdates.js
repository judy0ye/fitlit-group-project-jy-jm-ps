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
} from './utils';
//import { fetchApiData } from './apiCalls';

import { hydration, currentUser } from './scripts';
/* ~~~~~~~~~~ GLOBAL VARIABLE ~~~~~~~~~~*/
let groupedHydration, groupedSleep, weeklyWaterIntake

/* ~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~*/

const personalData = document.querySelector('.user-data');
const personalGoal = document.querySelector('.goals');
const personalGreeting = document.querySelector('.greeting');
const hydrationInfo = document.querySelector('.hydration');
let dailySleep = document.querySelector('#dailySleep');
let weeklySleep = document.querySelector('#weeklySleepHours');
let averageSleep = document.querySelector('#averageSleep');
const oneWeekHydrationChart = document.querySelector('.weekly-hydration-data');
const oneWeekSleepChart = document.querySelector('.weekly-sleep-data')
const weeklyHydrationButton = document.querySelector('.hydration-button');
const sleepButton = document.querySelector('.sleep-button')
const chickenImage = document.querySelector('.main-image')

/* ~~~~~~~~~~ DOM MANIPULATION FUNCTIONS ~~~~~~~~~~*/

/* ~~~~~ Display Random User Data Functions ~~~~~*/

const displayRandomUser = (currentUser) => {
  personalGreeting.innerHTML = `<article><h3>Welcome</h3>${currentUser.name}</article>`;

  personalData.innerHTML = `<article><h3>Name:</h3>${currentUser.name}
  <h3>Address: </h3>${currentUser.address}
  <h3>E-mail: </h3>${currentUser.email}
  <h3>Stride Length: </h3>${currentUser.strideLength}
  </article>`;

  personalGoal.innerHTML = `<article><h3>Daily Step Goal:</h3>${currentUser.dailyStepGoal}</article>`;
};

const displayUserData = (currentUser) => {
  console.log('DISPLAY CURRENT USER:', currentUser);
};

const hideChickenImage = () => {
  chickenImage.classList.add('hidden')
}

const showChickenImage = () => {
  chickenImage.classList.remove('hidden')
}

/* ~~~~~ Display Hydration Data Functions ~~~~~*/
// function displayAverageFluidConsumed(hydration, currentUser) {
//   const avgFluid = getAvgFluidForAllTime(hydration, currentUser.id)
//   console.log('avgFluidFORALLTIME', avgFluid)
//   // averageSleep.innerText += `You average ${getAvgSleep(
//   //   sleep,
//   //   currentUser.id
//   // )} hours of sleep each night and a
//   // ${getAvgQuality(sleep, currentUser.id)} sleep quality rating!`;
// }

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

  // groupedHydration = [];

  // weeklyHydrationEntries.forEach((entry) => {
  //   const section = document.createElement('section');
  //   section.innerHTML = `${entry.date}: ${entry.numOunces} ounces`;
  //   section.classList.add('hidden');
  //   groupedHydration.push(section);
  //   oneWeekHydrationChart.appendChild(section);
  // });
  weeklyHydrationEntries.forEach((entry) => {
    oneWeekHydrationChart.innerHTML += `<p>${entry.date}: ${entry.numOunces} ounces</p>`
  }); 
  console.log('l',oneWeekHydrationChart)
}

// DO THIS
// get average of data based upon user's input
// grab input from input field
// 

// section.innerHTML = groupedSleep.join()


function displayHydrationGraphs() {
  oneWeekHydrationChart.classList.remove('hidden')
  weeklyHydrationButton.disabled = true
  weeklyHydrationButton.classList.add('disable-button')
}
function hideHydrationGraphs() {
  oneWeekHydrationChart.classList.add('hidden')
  weeklyHydrationButton.disabled = false
  weeklyHydrationButton.classList.remove('disable-button')
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

// function displayWeeklySleep(sleep, currentUser, currentDate) {
//   const weeklySleepEntries = getWeekSleep(sleep, currentUser.id, currentDate);
//   // weeklySleepEntries.forEach((entry) => {
//   //   weeklySleep.innerText += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}
//   //  `;

//    groupedSleep = []

//    weeklySleepEntries.forEach((entry) => {
//      const section = document.createElement('section')
//      section.innerHTML += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}`
//      section.classList.add('hidden')
//      groupedSleep.push(section)
//      oneWeekChart.appendChild(section)
// console.log('groupedSleep', oneWeekChart)
//   });
// }
function displayWeeklySleep(sleep, currentUser, currentDate) {
  const weeklySleepEntries = getWeekSleep(sleep, currentUser.id, currentDate);
  //  groupedSleep = []
 
  //  weeklySleepEntries.forEach((entry) => {
  //   groupedSleep.push(`${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}`)   
  // }); 
  // const section = document.createElement('section') 
  // section.innerHTML = groupedSleep.join()
  // oneWeekSleepChart.appendChild(section)
  weeklySleepEntries.forEach((entry) => {
    oneWeekSleepChart.innerHTML += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}`
  }); 
  console.log(oneWeekSleepChart)
}


function displaySleepGraphs() {
  oneWeekSleepChart.classList.remove('hidden')
  sleepButton.disabled = true
  sleepButton.classList.add('disable-button')
}

function hideSleepGraphs() {
  oneWeekSleepChart.classList.add('hidden')
  sleepButton.disabled = false
  sleepButton.classList.remove('disable-button')
}

function displayAverageSleep(sleep, currentUser) {
  // oneWeekSleepChart.innerHTML += `You average ${getAvgSleep(
  //   sleep,
  //   currentUser.id
  // )} hours of sleep each night and a 
  // ${getAvgQuality(sleep, currentUser.id)} sleep quality rating!`;

  averageSleep.innerText += `You average ${getAvgSleep(
    sleep,
    currentUser.id
  )} hours of sleep each night and a 
  ${getAvgQuality(sleep, currentUser.id)} sleep quality rating!`;
}



/* ~~~~~ Display Activity Data Functions ~~~~~*/

// const displayActivityData = () => {
//   fetchApiData('activity')
//     .then((activityEntries) => {
//       console.log(activityEntries);
//     })
//     .catch((error) => console.error('Error:', error));
// };

function displayActivity() {
  dailySteps.innerText = `You took ${activity.returnDailySteps(
    newUser.id,
    currentDate
  )} steps today!`;
  dailyMiles.innerText = `You have walked ${activity.returnMiles(
    newUser.id,
    currentDate
  )} miles today!`;
  dailyMinutes.innerText = `You were active for ${activity.returnMinutesActive(
    newUser.id,
    currentDate
  )} minutes today!`;
}

function displayWeeklyStepCount() {
  const weeklyActivityEntries = activity.returnWeeklySteps(
    newUser.id,
    currentDate
  );
  weeklyActivityEntries.forEach((entry) => {
    if (activity.returnMetStepGoal(newUser.id, entry.date)) {
      weeklyStepCount.innerText += `${entry.date}: ${entry.steps}. You met your goal.  Take a nap!
        `;
    } else {
      weeklyStepCount.innerText += `${entry.date}: ${entry.steps}. You have not met your goal.  STEP IT UP!
        `;
    }
  });
}

/* ~~~~~~~~~~ EXPORTS ~~~~~~~~~~*/

export {
  displayRandomUser,
  displayUserData,
  displayDailySleep,
  displayWeeklySleep,
  displayAverageSleep,
  displayFluidConsumedToday,
  // displayAverageFluidConsumed, DO WE EVEN NEED THIS
  displayWeeklyHydrationData,
  weeklyHydrationButton,
  // displayHydrationData,
  // getUserById,
  // getAvgStepGoal,
  // getAvgFluidConsumed,
  // getAvgFluidConsumedOnSpecifcDay
  displayHydrationGraphs,
  hideHydrationGraphs,
  sleepButton,
  displaySleepGraphs,
  hideSleepGraphs,
  groupedHydration,
  hideChickenImage,
  showChickenImage,
  displayActivity,
  displayWeeklyStepCount,
};
