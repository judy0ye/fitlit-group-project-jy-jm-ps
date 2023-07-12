//NOTE: Your DOM manipulation will occur in this file

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.

// DOM MANIPULATION //

// IMPORTS //
import userData from '../src/data/users'
import { getRandomUser } from './functions/get-random-user'

// QUERY SELECTORS //
const personalData = document.querySelector('.user-data')

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
  personalData.innerHTML = `<article>hello ${randomUser.name}</article>`
}

export {
  exampleFunction1,
  exampleFunction2,
  displayRandomUser
}



// write functions in func folder
// ex. if functionOne.js updates DOM, link it here
  // export {}