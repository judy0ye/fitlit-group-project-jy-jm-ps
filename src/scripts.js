/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

import './css/normalize.css';
import './css/styles.css';
import './images/turing-logo.png';
import { fetchApiData } from './apiCalls';
import {
  displayRandomUser,
  displayWeeklySleep,
  displayUserData,
  displayDailySleep,
  displayAverageSleep,
  displayFluidConsumedToday,
  // displayAverageFluidConsumed, DO WE EVEN NEED THIS
  displayWeeklyHydrationData,
} from './domUpdates';
import { getRandomUser } from './utils';

/* ~~~~~~~~~~ DATA MODEL ~~~~~~~~~~*/

let currentDate = '2023/03/24';
//date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
let users, hydration, sleep, activity, currentUser;

/* ~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~*/

window.addEventListener('load', function () {
  Promise.all([
    fetchApiData('users'),
    fetchApiData('hydration'),
    fetchApiData('sleep'),
    fetchApiData('activity'),
  ]).then((data) => {
    console.log('onload from fetch data:', data);
    users = data[0].users;
    hydration = data[1].hydrationData;
    sleep = data[2].sleepData;
    activity = data[3].activityData;
    initializeApp();
  });
});

/* ~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~*/

const initializeApp = () => {
  // console.log('initializeApp:', users, hydration, activity, sleep);
  currentUser = getRandomUser(users);
  displayRandomUser(currentUser);
  // displaySleepData(sleep, currentUser);
  // displayHydrationData();
  //displayHydrationData(hydration, currentUser);
  // displayAverageFluidConsumed(hydration, currentUser); DO WE EVEN NEED THIS
  displayFluidConsumedToday(hydration, currentUser, currentDate)
  displayWeeklyHydrationData(hydration, currentUser);
  // displayActivityData(activity, currentUser);
  displayUserData();
  displayDailySleep(sleep, currentUser, currentDate);
  displayWeeklySleep(sleep, currentUser, currentDate);
  displayAverageSleep(sleep, currentUser, currentDate);
  // displayCalendar()
};

// const displayCalendar = () => {
//     calendar.innerHTML = `<input id="dateInput" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
//     calendar2.innerHTML = `<input id="dateInput2" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
//   };
