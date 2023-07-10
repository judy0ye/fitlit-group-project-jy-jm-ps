import { expect } from 'chai';
import { getAvgStepGoal } from '../src/functions/get-average-step-goals';

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

  it('should return average step goal of all users', function () {
    const avgStepGoal = getAvgStepGoal(users);

    expect(avgStepGoal).to.deep.equal(5333);
  });

  it('should return undefined if no arguments are pass in', function () {
    const avgStepGoal = getAvgStepGoal();

    expect(avgStepGoal).to.be.undefined;
  });
});
