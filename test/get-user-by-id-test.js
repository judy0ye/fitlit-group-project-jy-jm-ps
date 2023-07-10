import { expect } from 'chai';
import { getUserById } from '../src/functions/get-user-by-id';
import { users } from '../src/data/users';

describe('user id', () => {
  it('should get user data based on user id', function () {
    const userOneData = [
      {
        id: 1,
        name: 'Trystan Gorczany',
        address: '9484 Lucas Flat, West Kittymouth WA 67504',
        email: 'Taurean_Pollich31@gmail.com',
        strideLength: 4,
        dailyStepGoal: 7000,
        friends: [5, 43, 46, 11]
      }
    ];

    const userOne = getUserById(userOneData, 1);

    expect(userOne).to.deep.equal(userOneData[0]);
  });
});
