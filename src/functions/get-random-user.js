function getRandomUser(users) {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
}

export {
    getRandomUser,
}