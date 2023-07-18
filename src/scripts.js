/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

import './css/normalize.css';
import './css/styles.css';
import './images/FitChicks_title.png';
import './images/FitChicks_scene_lg.png';
import './images/FitChicks_scene_sm.png';
import './images/hydration.png';
import './images/sleep.png';
import './images/activity.png';
import { fetchApiData } from './apiCalls';
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
  displaySevenDayActivity
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

/* ~~~~~~~~~~ CHART FUNCTIONS ~~~~~~~~~~*/

function displaySleepChart(sleep, currentUser) {
  let avgSleep = getAvgSleep(sleep, currentUser.id);
  let avgQuality = getAvgQuality(sleep, currentUser.id);

  // Get a reference to the canvas element
  let sleepChartContext = document.getElementById('myChart').getContext('2d');

  // Create the chart
  let sleepChart = new Chart(sleepChartContext, {
    type: 'bar',
    data: {
      labels: ['Avg Sleep', 'Avg Quality'],
      datasets: [
        {
          label: 'Hours / Rating',
          data: [avgSleep, avgQuality],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

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
  displaySleepChart(sleep, currentUser);
  stepsPerDay(activity, currentUser, currentDate);
  activeMinutesPerDay(activity, currentUser, currentDate);
  // getUserDates(currentUser);
  displayWeeklyStepCount(activity, currentUser, currentDate);
};

export {
  currentDate,
  activity,
  users,
  hydration,
  currentUser,
  sleep,
  displaySleepChart,
};
