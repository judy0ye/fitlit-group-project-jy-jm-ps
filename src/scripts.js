/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

import './css/normalize.css';
import './css/styles.css';
import './images/FitChicks_title.png';
import './images/lazychicken.png';
import './images/happyrooster.jpg';
import './images/level-one.jpg';
import './images/level-two.jpg';
import './images/level-three.png';
import './images/level-four.jpg';
import './images/level-five.jpg';
import './images/FitChicks_scene_lg.png';
import './images/FitChicks_scene_sm.png';
import './images/hydration.png';
import './images/sleep.png';
import './images/activity.png';
import { fetchApiData, postSavedHydration } from './apiCalls';
import {
  displayRandomUser,
  displayDailySleep,
  displayAverageSleep,
  displayFluidConsumedToday,
  weeklyHydrationButton,
  sleepButton,
  displayActivity,
  displayWeeklyStepCount,
  hideChickenImage,
  // showChickenImage,
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
  hideWeeklyHydrationChart,
  hideWeeklyActivityChart,
  hideWeeklySleepChart
} from './domUpdates';

import {
  getRandomUser,
  getAvgSleep,
  getAvgQuality,
  stepsPerDay,
  activeMinutesPerDay,
  findCurrentDate,
  findCurrentDateInRange
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

let users, hydration, sleep, activity, currentUser, currentDate, activityCurrentDate, sleepCurrentDate;

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
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
});

/* ~~~~ Helper Functions ~~~~*/
const handleOnClicks = (hideChartOne, hideChartTwo, getData, displaySevenDayData, buttonOne, buttonTwo) => {
  hideChickenImage();
  hideChartOne();
  hideChartTwo();
  getData();
  displaySevenDayData();
  if (buttonOne.disabled === true) {
    buttonOne.classList.remove('disable-button');
    buttonOne.disabled = false;
  }
  if (buttonTwo.disabled === true) {
    buttonTwo.classList.remove('disable-button');
    buttonTwo.disabled = false;
  }
}

const onClickSleep = () => {
  handleOnClicks(hideWeeklyHydrationChart, hideWeeklyActivityChart, getWeeklySleep, displaySevenDaySleep, hydrationFromCalendarButton, oneWeekActivityDataFromCalendarButton)
};

const onClickHydration = () => {
  handleOnClicks(hideWeeklyActivityChart, hideWeeklySleepChart, getWeeklyHydration, displaySevenDayHydration, sleepFromCalendarButton, oneWeekActivityDataFromCalendarButton)
}

const onClickActivity = () => {
  handleOnClicks(hideWeeklyHydrationChart, hideWeeklySleepChart, () => displayWeeklyStepCount(currentUser), displaySevenDayActivity, sleepFromCalendarButton, hydrationFromCalendarButton)
 
};

const onChangeInputField = () => {
  activateButtons();
};

weeklyHydrationButton.addEventListener('click', onClickHydration);
sleepFromCalendarButton.addEventListener('click', onClickSleep);
hydrationFromCalendarButton.addEventListener('click', onClickHydration);
oneWeekActivityDataFromCalendarButton.addEventListener('click', onClickActivity)
inputField.addEventListener('change', onChangeInputField);


let totalWaterIntake = 0;

function displayNewHydrationEntry(response) {
  console.log('Response from server:', response);

  const hydrationInfo = document.getElementById('hydrationInfo');

  const existingMessage = hydrationInfo.querySelector('p');
  if (existingMessage) {
    hydrationInfo.removeChild(existingMessage);
  }

  totalWaterIntake += parseInt(response.numOunces);

  const newMessage = document.createElement('p');
  newMessage.innerHTML = `Your submission of <strong>${response.numOunces}</strong> ounces consumed has been recorded. Great job on your hydration efforts!<br/>🍒 Aim for approximately 3.7L (125 oz) for men and 2.7L (91 oz) for women daily from all sources. <br/>Total water intake entered: <strong>${totalWaterIntake}</strong> ounces`;

  hydrationInfo.appendChild(newMessage);
};


/* ~~~~~~~~~~ Motivation Track ~~~~~~~~~~*/

const motivationDropdown = document.querySelector('.motivation-level-dropdown');
const motivationImage = document.querySelector('.motivation-image');
const motivationText = document.querySelector('.motivation-text');
const motivationTitle = document.querySelector('.motivation-card h4');
const motivationAdvice = document.querySelector('.motivation-advice');

const motivationLevels = {
  "level1": { 
    title: "Not Motivated",
    description: "Fried!<br/><br/>Feeling completely unmotivated and burned out - lacking energy to even cluck", 
    image: "./images/level-one.jpg",
    advice: "Prioritize self-care. Uncover and conquer burnout's root causes."
  },
  "level2": { 
    title: "Slightly Motivated",
    description: "Fluttering Feathers.<br/><br/>Starting to feel some motivation, with small bursts of enthusiasm.",
    image: "./images/level-two.jpg",
    advice: "Celebrate the small wins and continue to build momentum."
  },
  "level3": { 
    title: "Moderately Motivated",
    description: "Cluck and Strut!<br/><br/>Stepping up to the challenge.", 
    image: "./images/happyrooster.jpg",
    advice: "Stay focused and consistent in your efforts. Surround yourself with positive influences!"
  },
  "level4": { 
    title: "Highly Motivated",
    description: "Cock-a-doodle Can-Do!<br/><br/>Feeling eggs-cited and energized to progress further.", 
    image: "./images/level-four.jpg",
    advice: "Embrace challenges and maintain a can-do attitude."
  },
  "level5": { 
    title: "Extremely Motivated",
    description: "Hard-Boiled Dynamo!<br/><br/>Maximum motivation achieved! Channeling unstoppable energy.",
    image: "./images/level-five.jpg",
    advice: "Use this unstoppable motivation my friend! Keep pushing your limits and inspiring others."
  },
};

const setMotivationLevel = (level) => {
  let motivationLevel = motivationLevels[level];
  if (motivationLevel) {
    motivationTitle.textContent = motivationLevel.title;
    motivationText.innerHTML = motivationLevel.description;
    motivationImage.src = motivationLevel.image;
    motivationImage.alt = motivationLevel.description;
    motivationAdvice.innerHTML = motivationLevel.advice;
    motivationDropdown.value = level;
  } else {
   
    motivationTitle.textContent = "How Motivated Are You Feeling to be 'Beak'-tastic!";
    motivationText.innerHTML = "The only limit to your greatness is the extent of your determination.";
    motivationImage.src = "./images/level-three.png";
    motivationImage.alt = "Motivation Image";
    motivationAdvice.innerHTML = "";
    motivationDropdown.value = "";
  }
};

motivationDropdown.addEventListener('change', (event) => {
  setMotivationLevel(event.target.value);
});


/* ~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~*/

const initializeApp = () => {
  currentUser = getRandomUser(users);

  // Find current dates for sleep and activity within the desired date range
  sleepCurrentDate = findCurrentDateInRange(currentUser.id, sleep, activity);
  activityCurrentDate = findCurrentDateInRange(currentUser.id, sleep, activity);

  // Use the original findCurrentDate for hydration data
  currentDate = findCurrentDate(currentUser.id, hydration, sleep, activity);

  console.log('BEFORE POST. Hydration current date:', currentDate);
  console.log('Sleep current date:', sleepCurrentDate);
  console.log('Activity current date:', activityCurrentDate);

  displayRandomUser(activity, currentUser);
  displayFluidConsumedToday(hydration, currentUser, currentDate);

  displayDailySleep(sleep, currentUser, sleepCurrentDate);
  displayAverageSleep(sleep, currentUser, sleepCurrentDate);
  // displayDailySleep(sleep, currentUser, currentDate);
  // displayAverageSleep(sleep, currentUser, currentDate);
 // displayActivity(activity, currentUser, currentDate);

  displayActivity(activity, currentUser, activityCurrentDate);
  stepsPerDay(activity, currentUser, currentDate); 
  activeMinutesPerDay(activity, currentUser, activityCurrentDate);
  displayWeeklyStepCount(activity, currentUser, activityCurrentDate);
  // displayActivity(activity, currentUser, currentDate);
  //stepsPerDay(activity, currentUser, currentDate);
 // activeMinutesPerDay(activity, currentUser, currentDate);
  //displayWeeklyStepCount(activity, currentUser, currentDate);
 
  displayRandomQuote();
  setMotivationLevel("level");

  const formElement = document.getElementById('form').addEventListener('submit', function (event) {
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

    console.log('Data sent in the POST request:', postUserInput);
    
    console.log('AFTER POST. Hydration current', postUserInput);

    event.target.reset();
  });
};



// original function

// const initializeApp = () => {
//   currentUser = getRandomUser(users);
//   currentDate = findCurrentDate(currentUser.id, hydration, sleep, activity);
//   displayRandomUser(activity, currentUser);
//   displayFluidConsumedToday(hydration, currentUser, currentDate);
//   displayActivity(activity, currentUser, currentDate);
//   displayDailySleep(sleep, currentUser, currentDate);
//   displayAverageSleep(sleep, currentUser, currentDate);
//   stepsPerDay(activity, currentUser, currentDate);
//   activeMinutesPerDay(activity, currentUser, currentDate);
//   displayWeeklyStepCount(activity, currentUser, currentDate);
//   displayRandomQuote()
//   setMotivationLevel("level");

//   const formElement = document.getElementById('form').addEventListener('submit', function (event) {
//     console.log('Form submitted!')
//     event.preventDefault();

//     const formData = new FormData(event.target);

//     const postUserInput = {
//       userID: currentUser.id,
//       date: "2023/07/02",
//       numOunces: formData.get('waterIntake')
//     };

//     console.log('Form submitted!');

//     postSavedHydration(postUserInput)
//       .then(json => {
//         displayNewHydrationEntry(json);
//         console.log(json);
//       })
//       .catch(err => console.error(`Error at: ${err}`));

//     console.log('Data sent in the request:', postUserInput);

//     event.target.reset();
//   });
// };

export {
  currentDate,
  activity,
  users,
  hydration,
  currentUser,
  sleep,
  sleepCurrentDate,
  activityCurrentDate
};
