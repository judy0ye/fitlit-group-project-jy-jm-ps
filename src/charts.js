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
  
  import { getWeeklyHydration } from './domUpdates';
  import {
  activity,
  hydration,
  currentUser,
  sleep,
  users,
  currentDate,
  getAvgSleep,
  avgQuality
} from './scripts';

  /* ~~~~~~~~~~ CHART FUNCTIONS ~~~~~~~~~~*/
  
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
  

 export const buildHydrationChart = (elementId, waterData) => {
   const ctx = document.getElementById(elementId).getContext('2d');
   new Chart(ctx, {
     type: 'bar',
     data: {
       labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
       datasets: [{
         label: 'Daily Water Consumption (in ounces)',
         data: waterData,
         backgroundColor: 'rgba(75, 192, 192, 0.2)',
         borderColor: 'rgba(75, 192, 192, 1)',
         borderWidth: 1
       }]
     },
     options: {
       scales: {
         y: {
           beginAtZero: true
         }
       }
     }
   });
 };
 


 // Chart Functions
// const clearChartArea = () => {
//   const chartArea = document.querySelector(".infographic");
//   chartArea.classList.remove("map-error");
//   chartArea.classList.remove("chart-placeholder");
//   chartArea.innerHTML = `
//   <div id="map"></div>
//   <canvas id='chart'></canvas>`;
// };

// const createHydrationChart = (hydration, userID, date) => {
//   const weeklyOunces = hydration.weeklyOuncesConsumed(userID, date);
//   const labels = weeklyOunces.map(days => days.date);
//   const data = weeklyOunces.map(days => days.numOunces);
//   clearChartArea();
//   new Chart("chart", {
//     type: 'bar',
//     data: {
//       datasets: [{
//         label: "ounces",
//         backgroundColor: "#F57630",
//         borderColor: "#3C4252",
//         borderWidth: 2,
//         hoverBackgroundColor: "#F68C52",
//         hoverBorderColor: "#3C4252",
//         data: data,
//       }],
//       labels: labels,
//     }
//   });
// };

// const createHoursSleptChart = (sleep, userID, date) => {
//   const weeklyHours = sleep.calculateWeeklyHoursSlept(userID, date);
//   const labels = weeklyHours.map(days => days.date);
//   const data = weeklyHours.map(days => days.hoursSlept);
//   clearChartArea();
//   new Chart("chart", {
//     type: "line",
//     data: {
//       datasets: [{
//         label: "Hours Slept",
//         backgroundColor: "#F16433",
//         borderColor: "a25e9b",
//         borderWidth: 2,
//         hoverBackgroundColor: "#5A73C0",
//         hoverBorderColor: "#5A73C0",
//         data: data,
//       }, ],
//       labels: labels,
//     },
//   });
// };

// const createSleepQualityChart = (sleep, userID, date) => {
//   const weeklyHours = sleep.calculateWeeklySleepQuality(userID, date);
//   const labels = weeklyHours.map((days) => days.date);
//   const data = weeklyHours.map((days) => days.sleepQuality);
//   clearChartArea();
//   new Chart("chart", {
//     type: "bar",
//     data: {
//       datasets: [{
//         label: "Sleep Quality",
//         backgroundColor: "#F57630",
//         borderColor: "#3C4252",
//         borderWidth: 2,
//         hoverBackgroundColor: "#F68C52",
//         hoverBorderColor: "#3C4252",
//         data: data,
//       }, ],
//       labels: labels,
//     },
//   });
// };

// const createActivityChart = (activity, userID, date) => {
//   const weeklyMinutes = activity.weeklyMinutes(userID, date);
//   const labels = weeklyMinutes.map(days => days.date);
//   const data = weeklyMinutes.map(days => days.minutesActive);
//   clearChartArea();
//   new Chart("chart", {
//     type: 'bar',
//     data: {
//       datasets: [{
//         label: "minutes",
//         backgroundColor: "#F57630",
//         borderColor: "#3C4252",
//         borderWidth: 2,
//         hoverBackgroundColor: "#F68C52",
//         hoverBorderColor: "#3C4252",
//         data: data,
//       }],
//       labels: labels,
//     }
//   });
// };