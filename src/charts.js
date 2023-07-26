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
 