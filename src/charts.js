/* ~~~~~~~~~~ CHARTS ~~~~~~~~~~*/

import {getWeeklyHydration, getWeeklyInfo, getWeeklySleep}from './domUpdates';
import { Chart, LineController, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(LineController, LinearScale, PointElement, LineElement);


/* ~~~~~~~~~~ CHART FUNCTIONS ~~~~~~~~~~*/


document.querySelector('.hydration-button').addEventListener('click', () => {
 
  let hydrationData = getWeeklyHydration(); 
  createHydrationChart(hydrationData);
});


function createHydrationChart(hydrationData) {

  console.log("createHydrationChart called with data: ", hydrationData);

  const hydrationChartContext = document.getElementById('hydrationChart').getContext('2d');

  const labels = hydrationData.map((entry) => entry.date);
  const data = hydrationData.map((entry) => entry.numOunces);

  const hydrationChart = new Chart(hydrationChartContext, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Hydration (ounces)',
          data: data,
          borderColor: 'rgba(0, 123, 255, 1)', // Changed color to a vibrant blue
          pointBackgroundColor: 'rgba(0, 255, 0, 1)', // Changed point color to a vibrant green
          pointRadius: 5, // Increased point size
          borderWidth: 2, // Increased border width for emphasis
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

document.querySelector('.sleep-button').addEventListener('click', () => {
 
  let sleepData = getWeeklySleep(); 
  createSleepChart(sleepData);
});

function createSleepChart(sleepData) {
  const sleepChartContext = document.getElementById('sleepChart').getContext('2d');

  const labels = sleepData.map((entry) => entry.date);
  const hoursSlept = sleepData.map((entry) => entry.hoursSlept);
  const sleepQuality = sleepData.map((entry) => entry.sleepQuality);

  const sleepChart = new Chart(sleepChartContext, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Hours Slept',
          data: hoursSlept,
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Changed color to a vibrant pinkish-red
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
        {
          label: 'Sleep Quality',
          data: sleepQuality,
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // Made the color a bit more vibrant
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}


// function displaySleepChart(sleep, currentUser) {
//   let avgSleep = getAvgSleep(sleep, currentUser.id);
//   let avgQuality = getAvgQuality(sleep, currentUser.id);

//   // Get a reference to the canvas element
//   let sleepChartContext = document.getElementById('myChart').getContext('2d');

//   // Create the chart
//   let sleepChart = new Chart(sleepChartContext, {
//     type: 'bar',
//     data: {
//       labels: ['Avg Sleep', 'Avg Quality'],
//       datasets: [
//         {
//           label: 'Hours / Rating',
//           data: [avgSleep, avgQuality],
//           backgroundColor: [
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//           ],
//           borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// }



export { createHydrationChart, createSleepChart };
