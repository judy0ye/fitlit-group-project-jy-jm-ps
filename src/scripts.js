/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

import './css/normalize.css';
import './css/styles.css';
import './images/FitChicks_title.png';
// import './images/boiled-egg.avif';
import './images/FitChicks_scene_lg.png';
import './images/FitChicks_scene_sm.png';
import './images/hydration.png';
import './images/sleep.png';
import './images/activity.png';
import { fetchApiData, postSavedHydration} from './apiCalls';
import {
  displayRandomUser,
  displayWeeklySleep,
  displayDailySleep,
  displayAverageSleep,
  displayFluidConsumedToday,
  displayWeeklyHydrationData,
  weeklyHydrationButton,
  displayHydrationGraphs,
  hideHydrationGraphs,
  sleepButton,
  displaySleepGraphs,
  displayActivity,
  displayWeeklyStepCount,
  hideChickenImage,
  showChickenImage,
  hideSleepGraphs,
  getWeeklySleep,
  inputField,
  displaySevenDaySleep,
  dataField,
  sleepFromCalendarButton,
  activateButtons,
  getWeeklyHydration,
  displaySevenDayHydration,
  hydrationFromCalendarButton,
  oneWeekActivityDataFromCalendarButton,
  displaySevenDayActivity,
  displayRandomQuote,
  form,
  hydrationInfo
} from './domUpdates';

import {
  getRandomUser,
  getAvgSleep,
  getAvgQuality,
  stepsPerDay,
  activeMinutesPerDay,
  findCurrentDate,
} from './utils';

/* ~~~~~~~~~~ CHARTS ~~~~~~~~~~*/

import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from 'chart.js';

Chart.register(
  BarController,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

/* ~~~~~~~~~~ DATA MODEL ~~~~~~~~~~*/

let users, hydration, sleep, activity, currentUser, currentDate;

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

const onClickHydration = () => {
  hideChickenImage();
  hideSleepGraphs();
  displayHydrationGraphs();
};

const onClickSleep = () => {
  hideChickenImage();
  hideHydrationGraphs();
  displaySleepGraphs();
  if (hydrationFromCalendarButton.disabled === true) {
    hydrationFromCalendarButton.classList.remove('disable-button');
    hydrationFromCalendarButton.disabled = false;
  }
};
weeklyHydrationButton.addEventListener('click', onClickHydration);
sleepButton.addEventListener('click', onClickSleep);

const onChangeInputField = () => {
  activateButtons();
};

weeklyHydrationButton.addEventListener('click', onClickHydration);
sleepButton.addEventListener('click', onClickSleep);
inputField.addEventListener('change', onChangeInputField);
dataField.addEventListener('click', function (e) {
  if (e.target.classList.contains('sleep-from-calendar-button')) {
    hideChickenImage();
    getWeeklySleep();
    displaySevenDaySleep();
    if (hydrationFromCalendarButton.disabled === true) {
      hydrationFromCalendarButton.classList.remove('disable-button');
      hydrationFromCalendarButton.disabled = false;
    }
    if (oneWeekActivityDataFromCalendarButton.disabled === true) {
      oneWeekActivityDataFromCalendarButton.classList.remove('disable-button');
      oneWeekActivityDataFromCalendarButton.disabled = false;
    }
  }
  if (e.target.classList.contains('hydration-from-calendar-button')) {
    hideChickenImage();
    getWeeklyHydration();
    displaySevenDayHydration();
    if (sleepFromCalendarButton.disabled === true) {
      sleepFromCalendarButton.classList.remove('disable-button');
      sleepFromCalendarButton.disabled = false;
    }
  if (oneWeekActivityDataFromCalendarButton.disabled === true) {
      oneWeekActivityDataFromCalendarButton.classList.remove('disable-button');
      oneWeekActivityDataFromCalendarButton.disabled = false;
    }
  }
  if (e.target.classList.contains('activity-from-calendar-button')) {
    hideChickenImage();
    displayWeeklyStepCount(activity, currentUser, currentDate);
    displaySevenDayActivity();
    if (sleepFromCalendarButton.disabled === true) {
      sleepFromCalendarButton.classList.remove('disable-button');
      sleepFromCalendarButton.disabled = false;
    }
    if (hydrationFromCalendarButton.disabled === true) {
      hydrationFromCalendarButton.classList.remove('disable-button');
      hydrationFromCalendarButton.disabled = false;
    }
  }
});

function displayNewHydrationEntry(response) { 

  console.log('Response from server:', response);

  const hydrationInfo = document.getElementById('hydrationInfo');
  hydrationInfo.innerHTML += `<p>Your submission of ${response.numOunces} ounces consumed has been recorded. Great job on your hydration efforts!</p>`;
};

/* ~~~~~~~~~~ Motivation Track ~~~~~~~~~~*/
const motivationDropdown = document.getElementById('motivation-levels');
const motivationCard = document.getElementById('motivation-card');

motivationDropdown.addEventListener('change', (event) => {
  let motivationLevel = event.target.value;
  let motivationText;
  let imageSrc;

  switch(motivationLevel) {
    case "1":
      motivationText = "Not Motivated";
      imageSrc = "./images/level1.png";  // update with actual path
      break;
    case "2":
      motivationText = "Slightly Motivated";
      imageSrc = "./images/level2.png";  // update with actual path
      break;
    case "3":
      motivationText = "Moderately Motivated";
      imageSrc = "./images/level3.png";  // update with actual path
      break;
    case "4":
      motivationText = "Highly Motivated";
      imageSrc = "./images/level4.png";  // update with actual path
      break;
    case "5":
      motivationText = "Extremely Motivated";
      imageSrc = "./images/level5.png";  // update with actual path
      break;
  }

  motivationCard.innerHTML = `<h2>${motivationText}</h2><img src="${imageSrc}" alt="${motivationText}">`;
});

// const motivationDropdown = document.getElementsByClassName('motivation-level-dropdown')[0];
// const motivationCard = document.getElementsByClassName('motivation-card')[0];

// motivationDropdown.addEventListener('change', (event) => {
//   let motivationLevel = event.target.value;
//   let motivationText;
//   let imageSrc;

//   switch(motivationLevel) {
//     case "level1":
//       motivationText = "Not Motivated";
//       imageSrc = "./images/level1.png";  
//       break;
//     case "level2":
//       motivationText = "Slightly Motivated";
//       imageSrc = "./images/level2.png";  
//       break;
//     case "level3":
//       motivationText = "Moderately Motivated";
//       imageSrc = "./images/level3.png";  
//       break;
//     case "level4":
//       motivationText = "Highly Motivated";
//       imageSrc = "./images/level4.png";  
//       break;
//     case "level5":
//       motivationText = "Extremely Motivated";
//       imageSrc = "./images/level5.png";  
//       break;
//   }

//   motivationCard.innerHTML = `<h2>${motivationText}</h2><img src="${imageSrc}" alt="${motivationText}">`;
// });


/* ~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~*/

const initializeApp = () => {
  currentUser = getRandomUser(users);
  currentDate = findCurrentDate(currentUser.id, hydration, sleep, activity);
  displayRandomUser(currentUser);
  displayFluidConsumedToday(hydration, currentUser, currentDate);
  displayWeeklyHydrationData(hydration, currentUser);
  displayActivity(activity, currentUser, currentDate);
  displayDailySleep(sleep, currentUser, currentDate);
  displayWeeklySleep(sleep, currentUser, currentDate);
  displayAverageSleep(sleep, currentUser, currentDate);
  //displaySleepChart(sleep, currentUser);
  stepsPerDay(activity, currentUser, currentDate);
  activeMinutesPerDay(activity, currentUser, currentDate);
  // getUserDates(currentUser);
  displayWeeklyStepCount(activity, currentUser, currentDate);
  displayRandomQuote()
  //postSavedHydration()

  const formElement = document.getElementById('form').addEventListener('submit', function(event) {
    console.log('Form submitted!')
    event.preventDefault();
  
    const formData = new FormData(event.target);
    
    const postUserInput = {
      userID: currentUser.id,
      date: "2023/07/02",
      numOunces: formData.get('waterIntake')
    };
    
    console.log('Form submitted!');
    
    postSavedHydration(postUserInput)
    .then(json => {
      displayNewHydrationEntry(json);
      console.log(json);
    })
    .catch(err => console.error(`Error at: ${err}`));
  
    console.log('Data sent in the request:', postUserInput);
    
    event.target.reset();
  });
};

export {
  currentDate,
  activity,
  users,
  hydration,
  currentUser,
  sleep
};
