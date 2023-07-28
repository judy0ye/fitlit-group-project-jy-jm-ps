/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

import './css/normalize.css';
import './css/styles.css';
import './images/FitChicks_title.png';
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
  hydrationInfo,
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

const onClickSleep = () => {
  hideChickenImage();
  hideWeeklyHydrationChart();
  hideWeeklyActivityChart();
  getWeeklySleep();
  displaySevenDaySleep();
  if (hydrationFromCalendarButton.disabled === true) {
    hydrationFromCalendarButton.classList.remove('disable-button');
    hydrationFromCalendarButton.disabled = false;
  }
  if (oneWeekActivityDataFromCalendarButton.disabled === true) {
    oneWeekActivityDataFromCalendarButton.classList.remove('disable-button');
    oneWeekActivityDataFromCalendarButton.disabled = false;
  };
};

const onClickHydration = () => {
  hideChickenImage();
  hideWeeklyActivityChart();
  hideWeeklySleepChart();
  getWeeklyHydration();
  displaySevenDayHydration();
  if (sleepFromCalendarButton.disabled === true) {
    sleepFromCalendarButton.classList.remove('disable-button');
    sleepFromCalendarButton.disabled = false;
  }
  if (oneWeekActivityDataFromCalendarButton.disabled === true) {
    oneWeekActivityDataFromCalendarButton.classList.remove('disable-button');
    oneWeekActivityDataFromCalendarButton.disabled = false;
  };
}

const onClickActivity = () => {
  hideChickenImage();
  hideWeeklyHydrationChart();
  hideWeeklySleepChart();
  displayWeeklyStepCount(activity, currentUser, currentDate);
  displaySevenDayActivity();
  if (sleepFromCalendarButton.disabled === true) {
    sleepFromCalendarButton.classList.remove('disable-button');
    sleepFromCalendarButton.disabled = false;
  };
  if (hydrationFromCalendarButton.disabled === true) {
    hydrationFromCalendarButton.classList.remove('disable-button');
    hydrationFromCalendarButton.disabled = false;
  };
};


// const onClickSleep = () => {
//   hideChickenImage();
//   hideHydrationGraphs();
//   displaySleepGraphs();
//   if (hydrationFromCalendarButton.disabled === true) {
//     hydrationFromCalendarButton.classList.remove('disable-button');
//     hydrationFromCalendarButton.disabled = false;
//   }
// };

weeklyHydrationButton.addEventListener('click', onClickHydration);
// sleepButton.addEventListener('click', onClickSleep);

const onChangeInputField = () => {
  activateButtons();
};

weeklyHydrationButton.addEventListener('click', onClickHydration);
sleepFromCalendarButton.addEventListener('click', onClickSleep);
hydrationFromCalendarButton.addEventListener('click', onClickHydration);
oneWeekActivityDataFromCalendarButton.addEventListener('click', onClickActivity)

inputField.addEventListener('change', onChangeInputField);

// dataField.addEventListener('click', function (e) {
//   if (e.target.classList.contains('sleep-from-calendar-button')) {
//     hideChickenImage();
//     getWeeklySleep();
//     displaySevenDaySleep();
//     if (hydrationFromCalendarButton.disabled === true) {
//       hydrationFromCalendarButton.classList.remove('disable-button');
//       hydrationFromCalendarButton.disabled = false;
//     }
//     if (oneWeekActivityDataFromCalendarButton.disabled === true) {
//       oneWeekActivityDataFromCalendarButton.classList.remove('disable-button');
//       oneWeekActivityDataFromCalendarButton.disabled = false;
//     }
//   }
//   if (e.target.classList.contains('hydration-from-calendar-button')) {
//     hideChickenImage();
//     getWeeklyHydration();
//     displaySevenDayHydration();
//     if (sleepFromCalendarButton.disabled === true) {
//       sleepFromCalendarButton.classList.remove('disable-button');
//       sleepFromCalendarButton.disabled = false;
//     }
//   if (oneWeekActivityDataFromCalendarButton.disabled === true) {
//       oneWeekActivityDataFromCalendarButton.classList.remove('disable-button');
//       oneWeekActivityDataFromCalendarButton.disabled = false;
//     }
//   }
//   if (e.target.classList.contains('activity-from-calendar-button')) {
//     hideChickenImage();
//     displayWeeklyStepCount(activity, currentUser, currentDate);
//     displaySevenDayActivity();
//     if (sleepFromCalendarButton.disabled === true) {
//       sleepFromCalendarButton.classList.remove('disable-button');
//       sleepFromCalendarButton.disabled = false;
//     }
//     if (hydrationFromCalendarButton.disabled === true) {
//       hydrationFromCalendarButton.classList.remove('disable-button');
//       hydrationFromCalendarButton.disabled = false;
//     }
//   }
// });

// function displayNewHydrationEntry(response) {

//   console.log('Response from server:', response);

//   const hydrationInfo = document.getElementById('hydrationInfo');
//   hydrationInfo.innerHTML += `<p>Your submission of ${response.numOunces} ounces consumed has been recorded. Great job on your hydration efforts!</p>`;
// };

function displayNewHydrationEntry(response) {
  console.log('Response from server:', response);

  const hydrationInfo = document.getElementById('hydrationInfo');

  const existingMessage = hydrationInfo.querySelector('p');
  if (existingMessage) {
    hydrationInfo.removeChild(existingMessage);
  }

  const newMessage = document.createElement('p');

  if (response.numOunces < 100) {
    newMessage.textContent = `You've consumed ${response.numOunces} ounces of water. Remember to drink more water to stay hydrated! 🍒 Daily recommendations: ~3.7L (125 oz) for men, ~2.7L (91 oz) for women, from all sources.`;
  } else {
    newMessage.textContent = `Your submission of ${response.numOunces} ounces consumed has been recorded. Great job on your hydration efforts!`;
  };

  // Append the new message to the container
  hydrationInfo.appendChild(newMessage);
}


/* ~~~~~~~~~~ Motivation Track ~~~~~~~~~~*/

const motivationLevels = {
  "level1": { 
    title: "Not Motivated",
    description: "Fried!<br/> <br/>Feeling completely unmotivated and burned out - lacking energy to even cluck", 
    image: "./images/level-one.jpg"
  },
  "level2": { 
    title: "Slightly Motivated",
    description: "Fluttering Feathers.<br/> <br/> Starting to feel some motivation, with small bursts of enthusiasm.",
    image: "./images/level-two.jpg"
  },
  "level3": { 
    title: "Moderately Motivated",
    description: "Cluck and Strut!<br/> <br/> Stepping up to the challenge.", 
    image: "./images/level-three.png" 
  },
  "level4": { 
    title: "Highly Motivated",
    description: "Cock-a-doodle Can-Do! <br/> <br/> Feeling eggs-cited and energized to progress further.", 
    image: "./images/level-four.jpg"
  },
  "level5": { 
    title: "Extremely Motivated",
    description: "Hard-Boiled Dynamo!<br/> <br/> Maximum motivation achieved! Channeling unstoppable energy.",
    image: "./images/level-five.jpg"
  },
};

const motivationDropdown = document.querySelector('.motivation-level-dropdown');
const motivationImage = document.querySelector('.motivation-image');
const motivationText = document.querySelector('.motivation-text');
const motivationTitle = document.querySelector('.motivation-card h4');


const setMotivationLevel = (level) => {
  let motivationLevel = motivationLevels[level];
  if (motivationLevel) {
    motivationTitle.textContent = motivationLevel.title; 
    motivationText.innerHTML = motivationLevel.description;
    motivationImage.src = motivationLevel.image;
    motivationImage.alt = motivationLevel.description;
    motivationDropdown.value = level;
  }
};

motivationDropdown.addEventListener('change', (event) => {
  setMotivationLevel(event.target.value);
});

/* ~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~*/

const initializeApp = () => {
  currentUser = getRandomUser(users);
  currentDate = findCurrentDate(currentUser.id, hydration, sleep, activity);
  displayRandomUser(activity, currentUser);
  displayFluidConsumedToday(hydration, currentUser, currentDate);
  displayActivity(activity, currentUser, currentDate);
  displayDailySleep(sleep, currentUser, currentDate);
  displayAverageSleep(sleep, currentUser, currentDate);
  stepsPerDay(activity, currentUser, currentDate);
  activeMinutesPerDay(activity, currentUser, currentDate);
  displayWeeklyStepCount(activity, currentUser, currentDate);
  displayRandomQuote()
  setMotivationLevel("level1");

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
