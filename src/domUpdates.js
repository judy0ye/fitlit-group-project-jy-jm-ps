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
  getAvgStepGoal
} from './utils';
//import { fetchApiData } from './apiCalls';

import { hydration, currentUser, sleep, users } from './scripts';
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

const oneWeekSleepChart = document.querySelector('.weekly-sleep-data')
const oneWeekSleepFromCalendar = document.querySelector('.weekly-sleep-from-calendar-data')
const weeklyHydrationButton = document.querySelector('.hydration-button');
const sleepButton = document.querySelector('.sleep-button')
const chickenImage = document.querySelector('.main-image')
const inputField = document.getElementById('start-date-input')
const dataField = document.querySelector('.data-view')
const sleepFromCalendarButton = document.querySelector('.sleep-from-calendar-button')
const oneWeekHydrationFromCalendar = document.querySelector('.weekly-hydration-from-calendar-data')
const hydrationFromCalendarButton = document.querySelector('.hydration-from-calendar-button')

/* ~~~~~~~~~~ DOM MANIPULATION FUNCTIONS ~~~~~~~~~~*/

const getWeeklyHydration = () => {
  oneWeekHydrationFromCalendar.innerHTML = ''
  oneWeekSleepFromCalendar.innerHTML = ''
  const startDate = new Date(inputField.value + ' 12:00:00');
  // 0-11 (+ 1) (1-12 01-012) slices from back 2

  let waterEntries = []
  for (let i = 0; i < 7; i++) {
    let nextDate = new Date(startDate)
    nextDate.setDate(nextDate.getDate()+i) 
    let date = nextDate.getFullYear() + "/" + ("0" + (nextDate.getMonth()+1)).slice(-2)
   + "/"+ ("0" + nextDate.getDate()).slice(-2);
    let waterEntry = hydration.find(entry => entry.date === date && entry.userID === currentUser.id)
    if (waterEntry) {
      waterEntries.push(waterEntry)
    }
  }
  
  let numOz = waterEntries.reduce((acc, entry) => {
    return acc + entry.numOunces
  }, 0)

  if (waterEntries.length === 0) {
    return 0
  }
  
  let avg = numOz/waterEntries.length
 

  waterEntries.forEach((entry) => {
    oneWeekHydrationFromCalendar.innerHTML += `<p>On ${entry.date} you drank ${entry.numOunces} ounces of water</p></p>`
  }); 
  oneWeekHydrationFromCalendar.innerHTML += `<p>Your average water consumption was ${avg} ounces</p>`
}  

const displaySevenDayHydration = () => {
  oneWeekHydrationFromCalendar.classList.remove('hidden')
  hydrationFromCalendarButton.disabled = true
  hydrationFromCalendarButton.classList.add('disable-button')
}

// Return how many hours a user slept each day over the course of a given week (7 days)
// This function should be able to calculate this for any week, not just the latest week
const getWeeklySleep= () => {
  oneWeekSleepFromCalendar.innerHTML = ''
  oneWeekHydrationFromCalendar.innerHTML = ''
  const startDate = new Date(inputField.value + ' 12:00:00');
  // 0-11 (+ 1) (1-12 01-012) slices from back 2

  let sleepHourEntries = []
  for (let i = 0; i < 7; i++) {
    let nextDate = new Date(startDate)
    nextDate.setDate(nextDate.getDate()+i) 
    let date = nextDate.getFullYear() + "/" + ("0" + (nextDate.getMonth()+1)).slice(-2)
   + "/"+ ("0" + nextDate.getDate()).slice(-2);
    let sleepHourEntry = sleep.find(entry => entry.date === date && entry.userID === currentUser.id)
    if (sleepHourEntry) {
      sleepHourEntries.push(sleepHourEntry)
    }
  }
  let hoursSlept = sleepHourEntries.reduce((acc, entry) => {
      return acc + entry.hoursSlept
    }, 0)

    if (sleepHourEntries.length === 0) {
      return 0
    }
    
    let avg = Math.round(hoursSlept/sleepHourEntries.length)

 sleepHourEntries.forEach((entry) => {
    oneWeekSleepFromCalendar.innerHTML += `<p>On ${entry.date}, you slept ${entry.hoursSlept} 
    hours and your sleep quality was rated: ${entry.sleepQuality}</p>`
  }); 
 oneWeekSleepFromCalendar.innerHTML += `<p>Your average hours slept was ${avg} hours</p>`
  
  

console.log('7day sleep', sleepHourEntries)
}  

const displaySevenDaySleep = () => {
  oneWeekSleepFromCalendar.classList.remove('hidden')
  sleepFromCalendarButton.disabled = true
  sleepFromCalendarButton.classList.add('disable-button')
}

const activateButtons = () => {
  sleepFromCalendarButton.disabled = false
  sleepFromCalendarButton.classList.add('disable-button')
  hydrationFromCalendarButton.disabled = false
  hydrationFromCalendarButton.classList.add('disable-button')
}




/* ~~~~~ Display Random User Data Functions ~~~~~*/

const displayRandomUser = (currentUser) => {
  const allUserStepGoalAvg = getAvgStepGoal(users)

  personalGreeting.innerHTML = `<article><h3>Welcome</h3>${currentUser.name}</article>`;

  personalData.innerHTML = `<article><h3>Name:</h3>${currentUser.name}
  <h3>Address: </h3>${currentUser.address}
  <h3>E-mail: </h3>${currentUser.email}
  <h3>Stride Length: </h3>${currentUser.strideLength}
  </article>`;

  personalGoal.innerHTML = `<article><h3>Daily Step Goal:</h3>${currentUser.dailyStepGoal}
  <h3>All User's Average Step Goal:</h3>${allUserStepGoalAvg}</article>`;
};

const displayUserData = (currentUser) => {
  console.log('DISPLAY CURRENT USER:', currentUser);
};

const hideChickenImage = () => {
  chickenImage.classList.add('hidden');
};

const showChickenImage = () => {
  chickenImage.classList.remove('hidden');
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
}

// DO THIS
// get average of data based upon user's input
// grab input from input field
//

// section.innerHTML = groupedSleep.join()

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

// function displayActivity() {
//   dailySteps.innerText = `You took ${activity.returnDailySteps(
//     currentUser.id,
//     currentDate
//   )} steps today!`;
//   dailyMiles.innerText = `You have walked ${activity.returnMiles(
//     newUser.id,
//     currentDate
//   )} miles today!`;
//   dailyMinutes.innerText = `You were active for ${activity.returnMinutesActive(
//     newUser.id,
//     currentDate
//   )} minutes today!`;
// }

// function displayWeeklyStepCount() {
//   const weeklyActivityEntries = activity.returnWeeklySteps(
//     newUser.id,
//     currentDate
//   );
//   weeklyActivityEntries.forEach((entry) => {
//     if (activity.returnMetStepGoal(newUser.id, entry.date)) {
//       weeklyStepCount.innerText += `${entry.date}: ${entry.steps}. You met your goal.  Take a nap!
//         `;
//     } else {
//       weeklyStepCount.innerText += `${entry.date}: ${entry.steps}. You have not met your goal.  STEP IT UP!
//         `;
//     }
//   });
// }

// function displayActivity() {
//   dailySteps.innerText = `You took ${activity.returnDailySteps(currentUser.id, currentDate)} steps today!`;
//   dailyMiles.innerText = `You have walked ${activity.returnMiles(currentUser.id, currentDate)} miles today!`;
//   dailyMinutes.innerText = `You were active for ${activity.returnMinutesActive(currentUser.id, currentDate)} minutes today!`;
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
  displayHydrationGraphs,
  hideHydrationGraphs,
  sleepButton,
  
  hideSleepGraphs,
  groupedHydration,
  hideChickenImage,
  showChickenImage,

  // displayActivity,
  // displayWeeklyStepCount,
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
};
