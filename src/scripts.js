/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/

import './css/normalize.css';
import './css/styles.css';
import './images/FitChicks_title.png';
import './images/FitChicks_scene_lg.png';
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
  oneWeekChart,
  hideChickenImage,
  showChickenImage,
  hideSleepGraphs
} from './domUpdates';
import { getRandomUser, getAvgSleep, getAvgQuality } from './utils';

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

let currentDate = '2023/03/24';
//date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
let users, hydration, sleep, activity, currentUser;
//console.log('PPPPPPP:', sleep)

// const displayCalendar = () => {
//     calendar.innerHTML = `<input id="dateInput" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
//     calendar2.innerHTML = `<input id="dateInput2" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
//   };

//chart
// import {
//   Chart,
//   BarController,
//   LinearScale,
//   CategoryScale,
//   BarElement,
//   Tooltip,
//   Title,
//   Legend,
// } from 'chart.js';

// Chart.register(
//   BarController,
//   LinearScale,
//   CategoryScale,
//   BarElement,
//   Tooltip,
//   Title,
//   Legend
// );

// let ctx = document.getElementById('myChart').getContext('2d');

// let myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });

// Create a new function to display the chart
// function displaySleepChart(sleep, currentUser) {
//   let avgSleep = getAvgSleep(sleep, currentUser.id);
//   let avgQuality = getAvgQuality(sleep, currentUser.id);

// Get a reference to the canvas element
// let sleepChartContext = document.getElementById('myChart').getContext('2d');

// Create the chart
// let sleepChart = new Chart(sleepChartContext, {
//   type: 'bar',
//   data: {
//     labels: ['Avg Sleep', 'Avg Quality'],
//     datasets: [{
//       label: 'Hours / Rating',
//       data: [avgSleep, avgQuality],
//       backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)'],
//       borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });
// }

// Call the function when you want to display the chart

// displaySleepChart(sleep, currentUser);

// This code should create a bar chart with two bars. One bar represents the average hours slept, and the other bar represents the average sleep quality.

// The chart is created in the "myChart" canvas element, and the colors and layout of the chart can be customized to fit your needs.

// Remember to include this code in your main JavaScript file where the "currentUser" object and "sleepData" array are defined. Also, make sure you've correctly included the Chart.js library. You need to call the displaySleepChart function after your sleep data is fetched and available.

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
}

const onClickSleep = () => {
  hideChickenImage()
  hideHydrationGraphs()
  displaySleepGraphs()
}
weeklyHydrationButton.addEventListener('click', onClickHydration);
sleepButton.addEventListener('click', onClickSleep)
// sleepButton.addEventListener('click', function () {
//   // if (weeklyHydrationButton.disabled) {
//   //   sections.splice(0, sections.length)
//   // }
//   if (!oneWeekChart === '') {
//     groupedHydration.splice(0, groupedHydration.length)
//   }
//   displaySleepGraphs()
// })
/* ~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~*/

const initializeApp = () => {
  // console.log('initializeApp:', users, hydration, activity, sleep);
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
  // displayCalendar()
};

export { hydration, currentUser, displaySleepChart, };
