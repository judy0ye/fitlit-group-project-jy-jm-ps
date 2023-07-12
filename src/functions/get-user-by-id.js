function getUserById(users, id) {
  return users.find(user => user.id === id);
};

export {
    getUserById,
}

// if API call gives undefined/gives back just an array 
// on line 2, remove 'users' from 
// userData.users