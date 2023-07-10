import { expect } from 'chai';
import { getUserById } from '../src/functions/get-user-by-id';
import { users } from '../src/data/users';

describe('getUserById function', () => {
  let users;

  beforeEach(() => {
    users = [
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
  });

  it('should get user data based on user id', function () {
    const user = getUserById(users, 1);

    expect(user).to.deep.equal(users[0]);
  });

  it('should return undefined when user id does not exist', function () {
    const user = getUserById(users, 2);

    expect(user).to.be.undefined;
  });

  it('should return undefined when the users array is empty', function () {
    users = [];

    const user = getUserById(users, 1);

    expect(user).to.be.undefined;
  });
});
