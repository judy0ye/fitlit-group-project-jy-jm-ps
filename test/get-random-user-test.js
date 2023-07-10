import { expect } from 'chai';
import { getRandomUser } from '../src/functions/get-random-user';
//import { users } from '../src/data/users'; // replace with the path to your users data
import users from '../src/data/users'; 

describe('getRandomUser function', () => {
    it('should return a user from the users array', function () {
        const user = getRandomUser(users);
        const userIds = users.map(user => user.id);
        console.log(user); 
        console.log(userIds);
        expect(userIds).to.include(user.id);
    });
      

  it.skip('should return different users on successive calls', function () {
    const user1 = getRandomUser(users);
    const user2 = getRandomUser(users);
    const user3 = getRandomUser(users);

    expect(user1.id).to.not.equal(user2.id);
    expect(user2.id).to.not.equal(user3.id);
  });
});
