//NOTE: Your DOM manipulation will occur in this file

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.

// DOM MANIPULATION //

// IMPORTS //
import userData from '../src/data/users'
import { getRandomUser } from './functions/get-random-user'

// QUERY SELECTORS //
const personalData = document.querySelector('.user-data');
const personalGoal = document.querySelector('.goals')
const personalGreeting = document.querySelector('.greeting')

// DATAMODEL //

// MODIFIERS //

// ADD/REMOVE RECIPES //

// EXPORTS //

const exampleFunction1 = (person) => {
  console.log(`oh hi there ${person}`)
}

const exampleFunction2 = (person) => {
  console.log(`bye now ${person}`)
}

const displayRandomUser = () => {
  const randomUser = getRandomUser(userData.users)

  personalGreeting.innerHTML = `<article><h3>Hey there homie:</h3>${randomUser.name}</article>`
  
  personalData.innerHTML = `<article><h3>Name:</h3>${randomUser.name}
  <h3>Address: </h3>${randomUser.address}
  <h3>E-mail: </h3>${randomUser.email}
  <h3>Stride Length: </h3>${randomUser.strideLength}
  </article>`

  personalGoal.innerHTML = `<article><h3>Daily Step Goal:</h3>${randomUser.dailyStepGoal}</article>`
}

export {
  exampleFunction1,
  exampleFunction2,
  displayRandomUser
}



// write functions in func folder
// ex. if functionOne.js updates DOM, link it here
  // export {}