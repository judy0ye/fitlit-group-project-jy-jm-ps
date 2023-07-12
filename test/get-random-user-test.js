import { expect } from 'chai';
import { getRandomUser } from '../src/functions/get-random-user';

describe('getRandomUser function', function () {
  let users;

  beforeEach(() => {
    users = [
      {
        id: 2,
        name: 'Tyreek VonRueden',
        address: '623 Koelpin Skyway, Lake Luigichester MN 77576-1678',
        email: 'Nicolette_Halvorson43@yahoo.com',
        strideLength: 4.5,
        dailyStepGoal: 9000,
        friends: [13, 19, 3]
      },
      {
        id: 3,
        name: 'Colt Rohan',
        address: '48010 Balistreri Harbor, Cleobury IN 43317',
        email: 'Wilford.Barton@gmail.com',
        strideLength: 2.7,
        dailyStepGoal: 3000,
        friends: [31, 16, 15, 7]
      },
      {
        id: 4,
        name: 'Evie Satterfield',
        address: '1378 Renner Island, Port Lincoln NE 06237-3602',
        email: 'Adan66@yahoo.com',
        strideLength: 3.9,
        dailyStepGoal: 4000,
        friends: [21, 32, 8]
      }
    ];
  });

  it('should return a user from the users array', function () {
    const user = getRandomUser(users);
    const userIds = users.map(user => user.id);
    expect(userIds).to.include(user.id);
  });

  it('should return undefined if the users array is empty', function () {
    const user = getRandomUser([]);
    expect(user).to.be.undefined;
  });
});