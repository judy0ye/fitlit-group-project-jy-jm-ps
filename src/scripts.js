// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// SCRIPTS //

// IMPORTS //
import './css/normalize.css';
import './css/styles.css';
import './images/turing-logo.png';
import { fetchApiData } from './apiCalls';
import { displayRandomUser, displaySleepData, displayHydrationData, displayActivityData, displayUserData } from './domUpdates';

// EXPORTS //

// FETCHED DATA //

// EVENT LISTENERS //
// FETCHED DATA //

// EVENT LISTENERS //

let date = new Date();
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
let users, hydration, sleep, activity;


window.addEventListener('load', function () {
  Promise.all([fetchApiData('users'), fetchApiData('hydration'), fetchApiData('sleep'), fetchApiData('activity')])
    .then(data => {
      console.log(data)
      users = data[0].users;
      hydration = data[1].hydrationData;
      sleep = data[2].sleepData;
      activity = data[3].activityData;
      initializeApp();
    });
});

const initializeApp = () => {
  displayRandomUser();
  displaySleepData();
  displayHydrationData();
  displayActivityData();
  displayUserData();
};

