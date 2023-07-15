//NOTE: Your DOM manipulation will occur in this file

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.

// DOM MANIPULATION //

// IMPORTS //

//import { newUser } from './dataModel';
//import userData from './data/users'
//import { getAvgStepGoal, getRandomUser  } from './utils';
import {
  //getRandomUser,
  // getFluidConsumedOnSpecificDay
  getFluidPerWeek } from './utils';
//import { fetchApiData } from './apiCalls';
import { getAvgSleep, getAvgQuality, getHoursByDay, getWeekSleep } from './utils';;

// QUERY SELECTORS //
const personalData = document.querySelector('.user-data');
const personalGoal = document.querySelector('.goals');
const personalGreeting = document.querySelector('.greeting');
const hydrationInfo = document.querySelector('.hydration');
//const hydrationButton = document.querySelector('.water');
let dailySleep = document.querySelector("#dailySleep");
let weeklySleep = document.querySelector("#weeklySleepHours");
let averageSleep = document.querySelector("#averageSleep");

// DATAMODEL //

// MODIFIERS //

// ADD/REMOVE RECIPES //

// EXPORTS //

const displayRandomUser = (newUser) => {

  personalGreeting.innerHTML = `<article><h3>Welcome</h3>${newUser.name}</article>`;

  personalData.innerHTML = `<article><h3>Name:</h3>${newUser.name}
  <h3>Address: </h3>${newUser.address}
  <h3>E-mail: </h3>${newUser.email}
  <h3>Stride Length: </h3>${newUser.strideLength}
  </article>`;

  personalGoal.innerHTML = `<article><h3>Daily Step Goal:</h3>${newUser.dailyStepGoal}</article>`;
};

const displayUserData = (newUser) => {
  console.log('displayUserData:', newUser)
};

// const displayHydrationData = (hydration, newUser) => {
//   // fetchApiData('hydration')
//   // .then((hydrationEntries) => {
//   const userWater = hydration.hydrationData;
//   const displayUser = newUser.user;

//   // console.log('data.data from API:', userWater);
//   // console.log('displayUser:', displayUser); // object
//   let current = userWater.find((user) => user.userID === displayUser.id);

//   // console.log('current:', newUser);

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


function displayWeeklyHydrationData(hydration, newUser, currentDate) {
//  console.log('Judyn', newUser)
  const weeklyHydrationEntries = getFluidPerWeek(hydration, newUser.userID, currentDate);
  console.log('Judyn', weeklyHydrationEntries)
  hydrationInfo.innerText = `<p>This is BOB</p>`
  //weeklyHydrationEntries.forEach(entry => {
  // //   hydrationInfo.innerHTML = `<section> ${entry.date}: ${entry.numOunces} </section>
  // //  `
  // weeklySleep.innerText += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}
  // `;
 // });
};

// const displayWeeklyHydrationData = () => {
//   fetchApiData('hydration')
//     .then((hydrationData) => {
//       console.log(hydrationEntries);
//     })
//     .catch((error) => console.error('Error:', error));
// };

// const displayActivityData = () => {
//   fetchApiData('activity')
//     .then((activityEntries) => {
//       console.log(activityEntries);
//     })
//     .catch((error) => console.error('Error:', error));
// };

/* ~~~~~ Sleep ~~~~~*/

function displayDailySleep(sleep, newUser, currentDate) {
  const currentDayEntry = getHoursByDay(sleep, newUser.id, currentDate);
  if (currentDayEntry) {
    dailySleep.innerText = `You slept ${currentDayEntry} hours last night.`;
  } else {
    dailySleep.innerText = 'You need to get more sleep!';
  };
};

function displayWeeklySleep(sleep, newUser, currentDate) {
  const weeklySleepEntries = getWeekSleep(sleep, newUser.id, currentDate);
  weeklySleepEntries.forEach(entry => {
    weeklySleep.innerText += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}
   `;
  });
};

function displayAverageSleep(sleep, newUser) {
  averageSleep.innerText += `You average ${getAvgSleep(sleep, newUser.id)} hours of sleep each night and a 
  ${getAvgQuality(sleep, newUser.id)} sleep quality rating!`;
};


export {
  displayRandomUser,
  displayUserData,
  displayDailySleep,
  displayWeeklySleep,
  displayAverageSleep,
 // displayHydrationData,
  displayWeeklyHydrationData
  // getUserById,
  // getAvgStepGoal,
  // getAvgFluidConsumed,
  // getAvgFluidConsumedOnSpecifcDay
};