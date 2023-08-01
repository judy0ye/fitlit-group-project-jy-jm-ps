/* ~~~~~~~~~~ CHARTS FUNCTIONS ~~~~~~~~~~*/

import { getWeeklyHydration, displayWeeklyStepCount } from './domUpdates';
import { Chart, LineController, LinearScale, PointElement, LineElement } from 'chart.js';
import { currentUser } from './scripts';

Chart.register(LineController, LinearScale, PointElement, LineElement);

let hydrationChart;

document.querySelector('.hydration-button').addEventListener('click', () => {
  let hydrationData = getWeeklyHydration();
  createHydrationChart(hydrationData);
});

function createHydrationChart(hydrationData) {

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
          pointBackgroundColor: 'rgba(255, 255, 255, 1)',
          pointBackgroundColor: '#333333',
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
          borderColor: '#333333',
          borderWidth: 2,
        },
        {
          label: 'Sleep Quality',
          data: sleepQuality,
          backgroundColor: 'rgba(128, 128, 128, 0.6)',
          borderColor: '#333333',
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

document.querySelector('.activity-button').addEventListener('click', () => {
  let activityData = displayWeeklyStepCount(currentUser);
  createActivityChart(activityData, currentUser);
});

let activityChart;

function createActivityChart(activityData, currentUser) {

  const activityChartContext = document.getElementById('activityChart').getContext('2d');

  const labels = activityData.map((entry) => entry.date);
  const dataGoalMet = activityData.map((entry) => entry.numSteps >= currentUser.dailyStepGoal ? entry.numSteps : 0);
  const dataGoalNotMet = activityData.map((entry) => entry.numSteps < currentUser.dailyStepGoal ? entry.numSteps : 0);

  if (activityChart) {
    activityChart.destroy();
  };

  activityChart = new Chart(activityChartContext, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Steps (goal met)',
          data: dataGoalMet,
          backgroundColor: 'rgba(0, 0, 255, 0.6)', 
          borderColor: '#333333',
          borderWidth: 2,
        },
        {
          label: 'Steps (goal not met)',
          data: dataGoalNotMet,
          backgroundColor: 'rgba(255, 165, 0, 0.6)', 
          borderColor: '#333333',
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