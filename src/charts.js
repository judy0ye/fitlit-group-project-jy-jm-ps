/* ~~~~~~~~~~ CHARTS FUNCTIONS ~~~~~~~~~~*/

import { getWeeklyHydration, getWeeklyInfo, getWeeklySleep } from './domUpdates';
import { Chart, LineController, LinearScale, PointElement, LineElement } from 'chart.js';
import { currentUser } from './scripts';

Chart.register(LineController, LinearScale, PointElement, LineElement);

let hydrationChart;

document.querySelector('.hydration-button').addEventListener('click', () => {
  hydrationData = getWeeklyHydration();
  createHydrationChart(hydrationData);
});

function createHydrationChart(hydrationData) {
  console.log("createHydrationChart called with data: ", hydrationData);

  const hydrationChartContext = document.getElementById('hydrationChart').getContext('2d');

  const labels = hydrationData.map((entry) => entry.date);
  const data = hydrationData.map((entry) => entry.numOunces);

  if (hydrationChart) {
    hydrationChart.destroy();
  }

  hydrationChart = new Chart(hydrationChartContext, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Hydration (ounces)',
          data: data,
          borderColor: 'rgba(0, 123, 255, 1)',
          // pointBackgroundColor: 'rgba(0, 0, 139, 1)',
          pointBackgroundColor: 'rgba(255, 255, 255, 1)',
          pointRadius: 3,
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true, 
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
};


let sleepChart;

function createSleepChart(sleepData) {

  console.log("createSleepChart called with data: ", sleepData);

  const sleepChartContext = document.getElementById('sleepChart').getContext('2d');

  const labels = sleepData.map((entry) => entry.date);
  const hoursSlept = sleepData.map((entry) => entry.hoursSlept);
  const sleepQuality = sleepData.map((entry) => entry.sleepQuality);

  if (sleepChart) {
    sleepChart.destroy();
  }

  sleepChart = new Chart(sleepChartContext, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Hours Slept',
          data: hoursSlept,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
        {
          label: 'Sleep Quality',
          data: sleepQuality,
          // backgroundColor: 'rgba(75, 192, 192, 0.6)',
          // borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(128, 128, 128, 0.6)',
          borderColor: 'rgba(128, 128, 128, 1)', 
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true, 
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
};

document.querySelector('.sleep-button').addEventListener('click', () => {
  let sleepData = getWeeklySleep();
  console.log("Sleep data: ", sleepData);
  createSleepChart(sleepData);
});



document.querySelector('.activity-button').addEventListener('click', () => {
  let activityData = getWeeklyInfo('activity');
  createActivityChart(activityData);
});

let activityChart;

function createActivityChart(activityData, currentUser) {

  console.log("createActivityChart called with data: ", activityData);

  const activityChartContext = document.getElementById('activityChart').getContext('2d');

  const labels = activityData.map((entry) => entry.date);
  const data = activityData.map((entry) => entry.numSteps);
  const backgroundColors = activityData.map((entry) =>
    // entry.numSteps >= currentUser.dailyStepGoal ? 'rgba(76, 175, 80, 0.6)' : 'rgba(156, 39, 176, 0.6)'
    // Green for goal met, Purple for goal not met
    entry.numSteps >= currentUser.dailyStepGoal ? 'rgba(0, 0, 255, 0.6)' : 'rgba(255, 165, 0, 0.6)'
  );

  if (activityChart) {
    activityChart.destroy();
  };

  activityChart = new Chart(activityChartContext, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Steps',
          note: "blue for goal met, orange for goal not met",
          data: data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((color) => color.replace('0.6', '1')),
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true, 
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
};

export {
  createHydrationChart,
  createSleepChart,
  createActivityChart
};
