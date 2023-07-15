// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// SCRIPTS //

// IMPORTS //
import './css/normalize.css';
import './css/styles.css';
import './images/turing-logo.png';
import { fetchApiData } from './apiCalls';
import { displayRandomUser, displayWeeklySleep, displayUserData, displayDailySleep, displayAverageSleep, displayWeeklyHydrationData } from './domUpdates';
import { getRandomUser } from './utils';

// EXPORTS //

// FETCHED DATA //

// EVENT LISTENERS //

let currentDate = "2023/03/24"
//date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
let users, hydration, sleep, activity, newUser;

window.addEventListener('load', function () {
  Promise.all([fetchApiData('users'), fetchApiData('hydration'), fetchApiData('sleep'), fetchApiData('activity')])
    .then(data => {
      console.log('onload from fetch data:', data)
      users = data[0].users;
      hydration = data[1].hydrationData;
      sleep = data[2].sleepData;
      activity = data[3].activityData;
      initializeApp();
    });
});

const initializeApp = () => {
  console.log('initializeApp:', users, hydration, activity, sleep)
  newUser = getRandomUser(users);
  displayRandomUser(newUser);
  // displaySleepData(sleep, newUser);
  // displayHydrationData();
  //displayHydrationData(hydration, newUser);
  displayWeeklyHydrationData(hydration, newUser, currentDate)
  // displayActivityData(activity, newUser);
  displayUserData();
  displayDailySleep(sleep, newUser, currentDate);
  displayWeeklySleep(sleep, newUser, currentDate);
  displayAverageSleep(sleep, newUser, currentDate);
  // displayCalendar()
};

// const displayCalendar = () => {
//     calendar.innerHTML = `<input id="dateInput" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
//     calendar2.innerHTML = `<input id="dateInput2" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
//   };
