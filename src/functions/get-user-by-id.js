// function getUserById(users, id) {
//     // console.log('Hi This is the get user')
//   return users.find(user => user.id === id);
// };

import { userData } from './src/data/users';



const getUserById = (userData, id) => {
    console.log(userData)
    const user = userData.find(user => user.id === id);
    return user;
};

export {
    getUserById,
}

// functions folder holds all function.js
    // if it's data manipulation, like getUserByID, export it to scripts.js
    // in scripts.js, we import getUserById using this syntax:
    // import { function name } from 'path'