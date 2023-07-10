function getUserById(users, id) {
  return users.find(user => user.id === id);
};

export {
    getUserById,
}
