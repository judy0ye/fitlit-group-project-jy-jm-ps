// DOM MANIPULATION //

// IMPORTS //

//import userData from './data/users'
import { getRandomUser } from './functions/get-random-user'
// import { getRandomUser, getUserById, getAvgStepGoal, getAvgFluidConsumed,getAvgFluidConsumedOnSpecifcDay  } from './functions/get-random-user'

// QUERY SELECTORS //
const personalGreeting = document.querySelector('.greeting');
const personalData = document.querySelector('.user-data');
const personalGoal = document.querySelector('.goals');

// DATAMODEL //

// MODIFIERS //

// ADD/REMOVE DATA //

// EXPORTS //

// const displayRandomUser = () => {
//   const randomUser = getRandomUser(userData.users)

//   personalGreeting.innerHTML = `<article><h3>Hey there homie:</h3>${randomUser.name}</article>`

//   personalData.innerHTML = `<article><h3>Name:</h3>${randomUser.name}
//   <h3>Address: </h3>${randomUser.address}
//   <h3>E-mail: </h3>${randomUser.email}
//   <h3>Stride Length: </h3>${randomUser.strideLength}
//   </article>`

//   personalGoal.innerHTML = `<article><h3>Daily Step Goal:</h3>${randomUser.dailyStepGoal}</article>`
// }

import { fetchApiData } from './apiCalls';

const displayRandomUser = () => {

  fetchApiData('users')
    .then(userData => {
      const randomUser = getRandomUser(userData.users);
      // console.log(randomUser)
      personalGreeting.innerHTML = `<article><h3>Hey there homie:</h3>${randomUser.name}</article>`;

      personalData.innerHTML = `<article><h3>Name:</h3>${randomUser.name}
      <h3>Address: </h3>${randomUser.address}
      <h3>E-mail: </h3>${randomUser.email}
      <h3>Stride Length: </h3>${randomUser.strideLength}
      </article>`;

      personalGoal.innerHTML = `<article><h3>Daily Step Goal:</h3>${randomUser.dailyStepGoal}</article>`;
    })
    .catch(error => console.error('Error:', error));
}

const displayUserData = () => {
  fetchApiData('users')
    .then(userEntries => {
      console.log(userEntries)
    })
    .catch(error => console.error('Error:', error));
}

const displaySleepData = () => {
  fetchApiData('sleep')
    .then(sleepEntries => {
      console.log(sleepEntries)
    })
    .catch(error => console.error('Error:', error));
}

const displayHydrationData = () => {
  fetchApiData('hydration')
    .then(hydrationEntries => {
      console.log(hydrationEntries)
    })
    .catch(error => console.error('Error:', error));
}

const displayActivityData = () => {
  fetchApiData('activity')
    .then(activityEntries => {
      console.log(activityEntries)
    })
    .catch(error => console.error('Error:', error));
}

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
}


// write functions in func folder
// ex. if functionOne.js updates DOM, link it here
  // export {}