//NOTE: Your DOM manipulation will occur in this file

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.

// DOM MANIPULATION //

// IMPORTS //

// QUERY SELECTORS //

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


export {
  exampleFunction1,
  exampleFunction2,
}



// write functions in func folder
// ex. if functionOne.js updates DOM, link it here
  // export {}