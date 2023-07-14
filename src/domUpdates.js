//NOTE: Your DOM manipulation will occur in this file

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.

// DOM MANIPULATION //

// IMPORTS //

import { currentUser } from './dataModel';
// import userData from './data/users'
//import { getAvgStepGoal, getRandomUser  } from './utils';
import {
  getRandomUser,
  getFluidConsumedOnSpecificDay
  // getFluidOuncesPerDay
} from './utils';
import { fetchApiData } from './apiCalls';
// import { getRandomUser, getUserById, getAvgStepGoal, getAvgFluidConsumed,getAvgFluidConsumedOnSpecifcDay  } from './functions/get-random-user'

// QUERY SELECTORS //
const personalData = document.querySelector('.user-data');
const personalGoal = document.querySelector('.goals');
const personalGreeting = document.querySelector('.greeting');
const hydrationInfo = document.querySelector('.hydration');
const hydrationButton = document.querySelector('.water');

// DATAMODEL //

// MODIFIERS //

// ADD/REMOVE RECIPES //

// EXPORTS //

// const displayRandomUser = () => {
//   const randomUser = getRandomUser(userData.users)
//   const avgStepGoal = getAvgStepGoal(userData.users)

//   personalGreeting.innerHTML = `<article><h3>Hey there homie:</h3>${randomUser.name}</article>`

//   personalData.innerHTML = `<article><h3>Name:</h3>${randomUser.name}
//   <h3>Address: </h3>${randomUser.address}
//   <h3>E-mail: </h3>${randomUser.email}
//   <h3>Stride Length: </h3>${randomUser.strideLength}
//   </article>`

//   personalGoal.innerHTML = `<article><h3>Daily Step Goal:</h3>${randomUser.dailyStepGoal}
//   <h3>Average of you and your friend's goals:</h3>${avgStepGoal}
//   </article>`
// }

// * added currentUser as global variable here *
const displayRandomUser = () => {
  fetchApiData('users')
    .then((userData) => {
      const randomUser = getRandomUser(userData.users);
      currentUser.user = randomUser;

      personalGreeting.innerHTML = `<h3>Welcome, ${randomUser.name}</h3>`;

      personalData.innerHTML = `<article><h3>Name:</h3>${randomUser.name}
      <h3>Address: </h3>${randomUser.address}
      <h3>E-mail: </h3>${randomUser.email}
      <h3>Stride Length: </h3>${randomUser.strideLength}
      </article>`;

      personalGoal.innerHTML = `<h3>Daily Step Goal:</h3><p>${randomUser.dailyStepGoal}</p>`;
    })
    .catch((error) => console.error('Error:', error));
};

const displayUserData = () => {
  fetchApiData('users')
    .then((userEntries) => {
      console.log(userEntries);
    })
    .catch((error) => console.error('Error:', error));
};

const displaySleepData = () => {
  fetchApiData('sleep')
    .then((sleepEntries) => {
      console.log(sleepEntries);
    })
    .catch((error) => console.error('Error:', error));
};

const displayHydrationData = () => {
  fetchApiData('hydration')
    .then((hydrationEntries) => {
      const userWater = hydrationEntries.hydrationData;
      const displayUser = currentUser.user;

      console.log('data.data from API:', userWater);
      console.log('displayUser:', displayUser); // object
      let current = userWater.find((user) => user.userID === displayUser.id);

      console.log('current:', currentUser);

      const fluidConsumed = getFluidConsumedOnSpecificDay(
        userWater,
        current.date,
        current.userID
      );

      hydrationInfo.innerHTML = `<article>
    <h3>Fluid Consumed:</h3> ${fluidConsumed} ounces of water was consumed on ${current.date}
  </article>`;
    })
    .catch((error) => console.error('Error:', error));
};

const displayWeeklyHydrationData = () => {
  fetchApiData('hydration')
    .then((hydrationData) => {
      console.log(hydrationEntries);
    })
    .catch((error) => console.error('Error:', error));
};

const displayActivityData = () => {
  fetchApiData('activity')
    .then((activityEntries) => {
      console.log(activityEntries);
    })
    .catch((error) => console.error('Error:', error));
};

export {
  displayRandomUser,
  displaySleepData,
  displayHydrationData,
  displayActivityData,
  displayUserData
  // getUserById,
  // getAvgStepGoal,
  // getAvgFluidConsumed,
  // getAvgFluidConsumedOnSpecifcDay
};

// write functions in func folder
// ex. if functionOne.js updates DOM, link it here
// export {}
