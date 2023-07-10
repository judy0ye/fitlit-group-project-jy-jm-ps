// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// SCRIPTS //

// IMPORTS //

// FETCHED DATA //

// EVENT LISTENERS //

// EXPORTS //

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

// An example of how you tell webpack to use a JS file
import userData from './data/users';
console.log("User Data:", userData);

// Example of one way to import functions from the domUpdates file.  You will delete these examples.
import { exampleFunction1, exampleFunction2 } from './domUpdates';

import { getUserById } from './functions/get-user-by-id';


exampleFunction1('Travis');
exampleFunction2('Travis');
getUserById()
