/* ~~~~~ Imports ~~~~~*/

import { expect } from 'chai';
import {
  getRandomUser,
  getUserById,
  getAvgFluidConsumed,
  getAvgFluidConsumedOnSpecifcDay,
  getAvgStepGoal,
} from '../src/utils';
import userData from '../src/data/users';

/* ~~~~~ Tests ~~~~~*/

describe('User Repository', () => {
  it('should run tests', function () {
    expect(true).to.equal(true);
  });
});

/* ~~~~~ Get Random User ~~~~~*/

describe('getRandomUser function', function () {
  let userData;

  beforeEach(() => {
    userData = {
      users: [
        {
          id: 2,
          name: 'Tyreek VonRueden',
          address: '623 Koelpin Skyway, Lake Luigichester MN 77576-1678',
          email: 'Nicolette_Halvorson43@yahoo.com',
          strideLength: 4.5,
          dailyStepGoal: 9000,
          friends: [13, 19, 3],
        },
        {
          id: 3,
          name: 'Colt Rohan',
          address: '48010 Balistreri Harbor, Cleobury IN 43317',
          email: 'Wilford.Barton@gmail.com',
          strideLength: 2.7,
          dailyStepGoal: 3000,
          friends: [31, 16, 15, 7],
        },
        {
          id: 4,
          name: 'Evie Satterfield',
          address: '1378 Renner Island, Port Lincoln NE 06237-3602',
          email: 'Adan66@yahoo.com',
          strideLength: 3.9,
          dailyStepGoal: 4000,
          friends: [21, 32, 8],
        },
      ],
    };
  });

  it('should return a user from the users array', function () {
    const user = getRandomUser(userData.users);
    const userIds = userData.users.map((user) => user.id);
    expect(userIds).to.include(user.id);
  });

  it('should return undefined if the users array is empty', function () {
    const user = getRandomUser([]);
    expect(user).to.be.undefined;
  });
});

/* ~~~~~ Get User By ID ~~~~~*/

describe('getUserById function', () => {
  it('should get user data based on user id', function () {
    const user = getUserById(userData.users, 1);

    expect(user).to.deep.equal(userData.users[0]);
  });

  it('should return undefined when user id does not exist', function () {
    const user = getUserById(userData.users, 70);

    expect(user).to.be.undefined;
  });

  it('should return undefined when the users array is empty', function () {
    const userEmpty = [];

    const user = getUserById(userEmpty, 1);

    expect(user).to.be.undefined;
  });
});

/* ~~~~~ Get Average Step Goal ~~~~~*/

describe('average step goal amongst users', function () {
  let users;

  beforeEach(function () {
    users = [
      {
        id: 2,
        name: 'Tyreek VonRueden',
        address: '623 Koelpin Skyway, Lake Luigichester MN 77576-1678',
        email: 'Nicolette_Halvorson43@yahoo.com',
        strideLength: 4.5,
        dailyStepGoal: 9000,
        friends: [13, 19, 3],
      },
      {
        id: 3,
        name: 'Colt Rohan',
        address: '48010 Balistreri Harbor, Cleobury IN 43317',
        email: 'Wilford.Barton@gmail.com',
        strideLength: 2.7,
        dailyStepGoal: 3000,
        friends: [31, 16, 15, 7],
      },
      {
        id: 4,
        name: 'Evie Satterfield',
        address: '1378 Renner Island, Port Lincoln NE 06237-3602',
        email: 'Adan66@yahoo.com',
        strideLength: 3.9,
        dailyStepGoal: 4000,
        friends: [21, 32, 8],
      },
    ];
  });

  it('should return average step goal of all users', function () {
    const avgStepGoal = getAvgStepGoal(users);

    expect(avgStepGoal).to.deep.equal(5333);
  });

  it('should return undefined if no arguments are pass in', function () {
    const avgStepGoal = getAvgStepGoal();

    expect(avgStepGoal).to.be.undefined;
  });
});

/* ~~~~~ Get Average Fluid ~~~~~*/

describe('fluid consumed', function () {
  let hydrationInfo;
  beforeEach(function () {
    hydrationInfo = {
      userWater: [
        {
          userID: 1,
          date: '2023/03/24',
          numOunces: 28,
        },
        {
          userID: 1,
          date: '2023/03/27',
          numOunces: 54,
        },
        {
          userID: 1,
          date: '2023/03/25',
          numOunces: 54,
        },
        {
          userID: 1,
          date: '2023/03/24',
          numOunces: 28,
        },
        {
          userID: 1,
          date: '2023/03/27',
          numOunces: 54,
        },
        {
          userID: 1,
          date: '2023/03/27',
          numOunces: 54,
        },
        {
          userID: 1,
          date: '2023/03/25',
          numOunces: 54,
        },
        {
          userID: 2,
          date: '2023/03/25',
          numOunces: 35,
        },
        {
          userID: 3,
          date: '2023/03/24',
          numOunces: 95,
        },
      ],
    };
  });
  it('should return average fluid ounces consumed per day for all time', function () {
    const id = 1;
    const avgFluidConsumed = getAvgFluidConsumed(hydrationInfo.userWater, id);

    expect(avgFluidConsumed).to.deep.equal(47);
  });
  it("should return a user's fluid ounces consumed on a specific day", function () {
    const date = '2023/03/25';
    const id = 2;
    const fluidOnSpecificDay = getAvgFluidConsumedOnSpecifcDay(
      hydrationInfo.userWater,
      date,
      id
    );

    expect(fluidOnSpecificDay).to.equal(35);
  });
  it("should return another user's fluid ounces consumed on a specific day", function () {
    const date = '2023/03/24';
    const id = 3;
    const fluidOnSpecificDay = getAvgFluidConsumedOnSpecifcDay(
      hydrationInfo.userWater,
      date,
      id
    );

    expect(fluidOnSpecificDay).to.equal(95);
  });
  it('should return how many fluid ounces of water a user consumed each day over a course of 7 days', function () {
    expect().to.equal();
  });
});
