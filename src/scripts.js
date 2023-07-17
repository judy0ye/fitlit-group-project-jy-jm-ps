/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

import './css/normalize.css';
import './css/styles.css';
import './images/FitChicks_title.png';
import './images/FitChicks_scene_lg.png';
import './images/FitChicks_scene_sm.png';
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
  weeklyHydrationButton,
  displayHydrationGraphs,
  hideHydrationGraphs,
  sleepButton,
  displaySleepGraphs,
  groupedHydration,
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

} from './domUpdates';
import {
  getRandomUser,
  getAvgSleep,
  getAvgQuality,
  stepsPerDay,
  activeMinutesPerDay,
  getUserDates,
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

let currentDate
//date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
let users, hydration, sleep, activity, currentUser;
//console.log('PPPPPPP:', sleep)

// const displayCalendar = () => {
//     calendar.innerHTML = `<input id="dateInput" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
//     calendar2.innerHTML = `<input id="dateInput2" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
//   };

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
refactor/activity-functions
  hideChickenImage();
  hideHydrationGraphs();
  displaySleepGraphs();
};
weeklyHydrationButton.addEventListener('click', onClickHydration);
sleepButton.addEventListener('click', onClickSleep);




const onChangeInputField = () => {
  activateButtons()
}

const onClickHydrationButton = () => {
  hideChickenImage()
  getWeeklyHydration()
  displaySevenDayHydration()
  if (sleepFromCalendarButton.disabled === true) {
    hydrationFromCalendarButton.classList.remove('disable-button')
    hydrationFromCalendarButton.disabled = false
    
  }
}
// dataField.addEventListener('click', function(e) {
//   if (e.target.classList.contains('sleep-button')) {
//     displaySevenDaySleep()
//   }
// })

const onClickSleepButton = () => {
  hideChickenImage()
  getWeeklySleep()
  displaySevenDaySleep()
  if (hydrationFromCalendarButton.disabled === true) {
    sleepFromCalendarButton.classList.remove('disable-button')
    sleepFromCalendarButton.disabled = false
    
  }
}

weeklyHydrationButton.addEventListener('click', onClickHydration);
sleepButton.addEventListener('click', onClickSleep)
inputField.addEventListener('change', onChangeInputField)
hydrationFromCalendarButton.addEventListener('click', onClickHydrationButton)
sleepFromCalendarButton.addEventListener('click', onClickSleepButton)
// dataField.addEventListener('click', function(e) {
//   if (e.target.classList.contains('sleep-from-calendar-button')) {
//     hideChickenImage()
//     getWeeklySleep()
//     displaySevenDaySleep()
    
//   };
//   if (e.target.classList.contains('hydration-from-calendar-button')) {
//     hideChickenImage()
//     getWeeklyHydration()
//     displaySevenDayHydration()
//     if (sleepFromCalendarButton.disabled === true) {
//       activateHydrationFromCalendarButton()
//     }
//   }
// })

/* ~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~*/

const initializeApp = () => {
  console.log('INITIALIZE APP:', users, hydration, activity, sleep);
  currentUser = getRandomUser(users);
  displayRandomUser(currentUser);
  // displaySleepData(sleep, currentUser);
  // displayHydrationData();
  //displayHydrationData(hydration, currentUser);
  // displayAverageFluidConsumed(hydration, currentUser); DO WE EVEN NEED THIS
  displayFluidConsumedToday(hydration, currentUser, currentDate);
  displayWeeklyHydrationData(hydration, currentUser);

  // displayActivityData(activity, currentUser);
  displayUserData();
  displayDailySleep(sleep, currentUser, currentDate);
  displayWeeklySleep(sleep, currentUser, currentDate);
  displayAverageSleep(sleep, currentUser, currentDate);
  displaySleepChart(sleep, currentUser);
  stepsPerDay(activity, currentUser, currentDate);
  activeMinutesPerDay(activity, currentUser, currentDate);
  getUserDates(currentUser);
  // displayCalendar()
};

export { hydration, currentUser, sleep, displaySleepChart, };
