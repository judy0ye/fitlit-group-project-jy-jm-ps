import { expect } from 'chai';
import { getUserById } from '../src/functions/get-user-by-id';
import userData from '../src/data/users';

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
    const userEmpty = []

    const user = getUserById(userEmpty, 1);

    expect(user).to.be.undefined;
  });
});