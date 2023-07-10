function getRandomUser(users) {
    const randomIndex = Math.floor(Math.random() * users.length);
    console.log(users); 
const user1 = getRandomUser(users);


    return users[randomIndex];
    }

    export {
        getRandomUser,
    }