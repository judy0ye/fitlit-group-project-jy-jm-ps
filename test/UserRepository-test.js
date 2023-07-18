/* ~~~~~ Imports ~~~~~*/

import { expect } from 'chai';
import {
  getRandomUser,
  getUserById,
  getAvgStepGoal,
  getFluidDrankForSpecificDay,
  getWeeklyFluid,
  getFluidOuncesPerDay,
  getAvgSleep,
  getAvgQuality,
  getHoursByDay,
  getQualityByDay,
  getWeekSleep,
  activeMinutesPerDay,
  stepsPerDay,
  weeklySteps,
  findCurrentDate,
  calculateMilesUserWalked,
  milesPerDay
} from '../src/utils';
import userData from '../src/data/users';
import sleepTestData from '../src/data/sleep-test-data';
import activityTestData from '../src/data/activity-test-data';

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

  it.skip('should return undefined if no arguments are pass in', function () {
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
          date: '2023/03/01',
          numOunces: 28,
        },
        {
          userID: 1,
          date: '2023/03/02',
          numOunces: 54,
        },
        {
          userID: 1,
          date: '2023/03/03',
          numOunces: 54,
        },
        {
          userID: 1,
          date: '2023/03/04',
          numOunces: 5,
        },
        {
          userID: 1,
          date: '2023/03/27',
          numOunces: 54,
        },
        {
          userID: 1,
          date: '2023/03/28',
          numOunces: 6,
        },
        {
          userID: 1,
          date: '2023/03/29',
          numOunces: 84,
        },
        {
          userID: 1,
          date: '2023/03/15',
          numOunces: 4,
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
  it.skip('should return average fluid ounces consumed per day for all time', function () {
    const id = 1;
    const avgFluidConsumed = getAvgFluidConsumed(hydrationInfo.userWater, id);

    expect(avgFluidConsumed).to.deep.equal(36);
  });
  it.skip("should return a user's fluid ounces consumed on a specific day", function () {
    const date = '2023/03/25';
    const id = 2;
    const fluidOnSpecificDay = getFluidConsumedOnSpecificDay(
      hydrationInfo.userWater,
      date,
      id
    );

    expect(fluidOnSpecificDay).to.equal(35);
  });
  it.skip("should return another user's fluid ounces consumed on a specific day", function () {
    const date = '2023/03/24';
    const id = 3;
    const fluidOnSpecificDay = getFluidConsumedOnSpecificDay(
      hydrationInfo.userWater,
      date,
      id
    );

    expect(fluidOnSpecificDay).to.equal(95);
  });
  it.skip('should return how many fluid ounces of water a user consumed each day over a course of 7 days', function () {
    const id = 1;
    const startDate = '2023/03/01';
    const ouncePerDay = getFluidOuncesPerDay(
      hydrationInfo.userWater,
      startDate,
      id
    );

    expect(ouncePerDay).to.deep.equal({
      '2023/03/01': 28,
      '2023/03/02': 54,
      '2023/03/03': 54,
      '2023/03/04': 5,
      '2023/03/15': 4,
      '2023/03/24': 95,
      '2023/03/25': 35,
    });
  });
});

/* ~~~~~ Sleep ~~~~~*/

describe('Sleep Functions', function () {
  let sleepData;

  beforeEach(() => {
    sleepData = [...sleepTestData];
  });

  it('should take in a user ID', function () {
    expect(sleepData[0].userID).to.equal(1);
  });

  it('should take in a date', function () {
    expect(sleepData[0].date).to.equal('2023/03/24');
  });

  it('should take in a user hours slept', function () {
    expect(sleepData[0].hoursSlept).to.equal(9.6);
  });

  it('should take in a user sleep quality', function () {
    expect(sleepData[0].sleepQuality).to.equal(4.3);
  });

  it("should be able to average user's sleep", function () {
    expect(getAvgSleep(sleepData, 1)).to.equal(6.6);
    expect(getAvgSleep(sleepData, 2)).to.equal(8.1);
  });

  it("should be able to average user's sleep quality", function () {
    expect(getAvgQuality(sleepData, 1)).to.equal(3.6);
    expect(getAvgQuality(sleepData, 2)).to.equal(3.3);
  });

  it("should be able to get user's hours slept by day", function () {
    expect(getHoursByDay(sleepData, 1, '2023/03/24')).to.equal(9.6);
    expect(getHoursByDay(sleepData, 1, '2023/03/29')).to.equal(5.6);
    expect(getHoursByDay(sleepData, 2, '2023/03/25')).to.equal(8.1);
    expect(getHoursByDay(sleepData, 2, '2023/03/28')).to.equal(5.1);
  });

  it("should be able to get user's sleep quality by day", function () {
    expect(getQualityByDay(sleepData, 1, '2023/03/24')).to.equal(4.3);
    expect(getQualityByDay(sleepData, 1, '2023/03/29')).to.equal(2.1);
    expect(getQualityByDay(sleepData, 2, '2023/03/25')).to.equal(4.7);
    expect(getQualityByDay(sleepData, 2, '2023/03/28')).to.equal(2.1);
  });

  it('returns a week of sleep data for the specified user and start date', function() {
    const weeklySleepData = getWeekSleep(sleepTestData, 1, '2023/03/30');

    expect(weeklySleepData).to.have.lengthOf(7);
    expect(weeklySleepData[0].date).to.equal('2023/03/30');
    expect(weeklySleepData[weeklySleepData.length - 1].date).to.equal('2023/03/24');
  });
});

/* ~~~~~ Activity ~~~~~*/

describe('Activity Data Tests', function() {
  it('returns number of steps for the specified user and date', function() {
    const currentUser = { id: 1, strideLength: 3.0 };
    const currentDate = '2023/03/24';

    const steps = stepsPerDay(activityTestData, currentUser, currentDate);
    expect(steps).to.equal(7362);
  });

  it('returns active minutes for the specified user and date', function() {
    const currentUser = { id: 2, strideLength: 3.0 };
    const currentDate = '2023/03/26';

    const activeMinutes = activeMinutesPerDay(activityTestData, currentUser, currentDate);
    expect(activeMinutes).to.equal(203);
  });

  it('returns the number of miles walked for the specified user and date', function() {
    const currentUser = { id: 1, strideLength: 1.0 };

    const miles = milesPerDay(activityTestData, currentUser, '2023/03/30');
    expect(miles).to.be.closeTo(2.83, 0.01);
  });

  it('returns a week of activity data for the specified user and start date', function() {
    const weeklyData = weeklySteps(activityTestData, 1, '2023/03/30');
    expect(weeklyData).to.have.lengthOf(7);
    expect(weeklyData[0].date).to.equal('2023/03/30');
    expect(weeklyData[6].date).to.equal('2023/03/24');
  });

  it('returns the number of miles walked based on steps and stride length', function() {
    const activity = { numSteps: 5280 };
    const user = { strideLength: 1.0 };

    const milesWalked = calculateMilesUserWalked(activity, user);
    expect(milesWalked).to.be.closeTo(1.00, 0.01);
  });
});

