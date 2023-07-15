/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

//import { currentUser } from './dataModel';
//import { getAvgStepGoal, getRandomUser  } from './utils';
import { getFluidPerWeek } from './utils';
import {
  getAvgSleep,
  getAvgQuality,
  getHoursByDay,
  getWeekSleep,
} from './utils';
//import { fetchApiData } from './apiCalls';

/* ~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~*/

const personalData = document.querySelector('.user-data');
const personalGoal = document.querySelector('.goals');
const personalGreeting = document.querySelector('.greeting');
const hydrationInfo = document.querySelector('.hydration');
//const hydrationButton = document.querySelector('.water');
let dailySleep = document.querySelector('#dailySleep');
let weeklySleep = document.querySelector('#weeklySleepHours');
let averageSleep = document.querySelector('#averageSleep');

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
  console.log('displayUserData:', currentUser);
};

/* ~~~~~ Display Hydration Data Functions ~~~~~*/

// const displayHydrationData = (hydration, currentUser) => {
//   // fetchApiData('hydration')
//   // .then((hydrationEntries) => {
//   const userWater = hydration.hydrationData;
//   const displayUser = currentUser.user;

//   // console.log('data.data from API:', userWater);
//   // console.log('displayUser:', displayUser); // object
//   let current = userWater.find((user) => user.userID === displayUser.id);

//   // console.log('current:', currentUser);

//   const fluidConsumed = getFluidConsumedOnSpecificDay(
//     userWater,
//     current.date,
//     current.userID
//   );

//   hydrationInfo.innerHTML = `<article>
//     <h3>Fluid Consumed:</h3> ${fluidConsumed} ounces of water was consumed on ${current.date}
//   </article>`;
//   // })
//   // .catch((error) => console.error('Error:', error));
// };

function displayWeeklyHydrationData(hydration, currentUser, currentDate) {
  console.log('displayWeeklyHydrationData:', currentUser);
  const weeklyHydrationEntries = getFluidPerWeek(
    hydration,
    currentUser.userID,
    currentDate
  );
  console.log('weeklyHydrationEntries:', weeklyHydrationEntries);
  hydrationInfo.innerText = `<p>This is TatBobo</p>`;
  //weeklyHydrationEntries.forEach(entry => {
  // //   hydrationInfo.innerHTML = `<section> ${entry.date}: ${entry.numOunces} </section>
  // //  `
  // weeklySleep.innerText += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}
  // `;
  // });
}

// const displayWeeklyHydrationData = () => {
//   fetchApiData('hydration')
//     .then((hydrationData) => {
//       console.log(hydrationEntries);
//     })
//     .catch((error) => console.error('Error:', error));
// };

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
  displayWeeklyHydrationData,
  // displayHydrationData,
  // getUserById,
  // getAvgStepGoal,
  // getAvgFluidConsumed,
  // getAvgFluidConsumedOnSpecifcDay
};
