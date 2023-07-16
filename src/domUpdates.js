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
} from './utils';
//import { fetchApiData } from './apiCalls';

import {hydration, currentUser} from './scripts'

/* ~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~*/

const personalData = document.querySelector('.user-data');
const personalGoal = document.querySelector('.goals');
const personalGreeting = document.querySelector('.greeting');
const hydrationInfo = document.querySelector('.hydration');
//const hydrationButton = document.querySelector('.water');
let dailySleep = document.querySelector('#dailySleep');
let weeklySleep = document.querySelector('#weeklySleepHours');
let averageSleep = document.querySelector('#averageSleep');
const oneWeekHydrationChart = document.querySelector('.graphs')
const weeklyHydrationButton = document.querySelector('.water')


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
  const fluidToday = getFluidDrankForSpecificDay(hydration, currentUser.id, currentDate);
  console.log('waterDrankToday:', fluidToday)
  hydrationInfo.innerHTML = `You drank ${fluidToday} ounces today`
  // if (currentDayEntry) {
  //   hydrationInfo.innerHTML = `You drank ${currentDayEntry} hours last night.`;
  // } else {
  //   dailySleep.innerText = 'You need to get more sleep!';
  // }
  // CURRENT DATE IS THE HARD CODED DATE RIGHT NOW SO THE DATE WE HAVE FOR WEEKLY DISPLAY 
  // JUST HAS 7 DAYS FROM ARRAY COUNTING BACKWARDS
}
let sections
function displayWeeklyHydrationData(hydration, currentUser) {
  console.log('CURRENT USER:', currentUser);
  const weeklyHydrationEntries = getWeeklyFluid(hydration, currentUser.id);
  console.log('WEEKLY HYD ENTRIES:', weeklyHydrationEntries);

  sections = []

  weeklyHydrationEntries.forEach((entry) => {
    const section = document.createElement('section')
    section.innerHTML += `${entry.date}: ${entry.numOunces} ounces`
    section.classList.add('hidden')
    sections.push(section)
    oneWeekHydrationChart.appendChild(section)
   
  //  const eachEntry = oneWeekHydrationChart.innerHTML = `<section class='hidden'> ${entry.date}: ${entry.numOunces} </section>
  //  `;
  sections.push(section)
 
//   console.log(section)
//   // oneWeekHydrationChart.innerHTML = ''
//   sections.forEach(section => oneWeekHydrationChart.appendChild(section))
// console.log(sections)
 
  });
}
// function backToMain() {
//   hide([savedPostersPage, posterForm]);
//   show([mainPoster]);
// }


function displayGraphs() {
  show(sections)
}
// function hide(elements) {
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].classList.add('hidden');
//   }
// }
function hide(section) {
  section.forEach(individualSection => individualSection.classList.add('hidden'))
}

// function show(elements) {
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].classList.remove('hidden');
//   }
// }
function show(section) {
  section.forEach(individualSection => individualSection.classList.remove('hidden'))
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
    weeklySleep.innerText += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}
   `;
  });
}

function displayAverageSleep(sleep, currentUser) {
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
  show, 
  hide,
  displayGraphs,
};
