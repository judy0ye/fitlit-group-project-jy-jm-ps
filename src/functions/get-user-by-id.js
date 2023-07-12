function getUserById(userData, id) {
  return userData.users.find(user => user.id === id);
};

export {
    getUserById,
}

