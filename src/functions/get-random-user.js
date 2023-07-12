// function getRandomUser(users) {
//     const randomIndex = Math.floor(Math.random() * users.length);
//     return users[randomIndex];
// }

// export {
//     getRandomUser,
// }

function getRandomUser(users) {
    if (users && users.length > 0) {
        const randomIndex = Math.floor(Math.random() * users.length);
        return users[randomIndex];
    } else {
        console.error("No users available to select");
        return null;
    }
}

export {
    getRandomUser,
}
