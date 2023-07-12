// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// SCRIPTS //

// IMPORTS //

import { fetchApiData } from './apiCalls';
import { displayRandomUser,  displaySleepData, displayHydrationData, displayActivityData } from './domUpdates';

// FETCHED DATA //

// EVENT LISTENERS //
window.addEventListener('load', displayRandomUser)
window.addEventListener('load', displaySleepData)
window.addEventListener('load', displayHydrationData)
window.addEventListener('load', displayActivityData)

// EXPORTS //

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

// An example of how you tell webpack to use a JS file
// import userData from './data/users';
// console.log("User Data:", userData);

// Example of one way to import functions from the domUpdates file.  You will delete these examples.
//import { displayRandomUser } from './domUpdates';

// import { getUserById } from './functions/get-user-by-id';


// getUserById()
