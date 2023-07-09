import { expect } from 'chai';
import { getUserById } from '../src/functions/get-user-by-id';
import userData from '../src/data/users';

describe('user id', () => {
  it('should get user data based on user id', function () {
    const userOne = getUserById(userData, 1)
    const userOneData =  {
        "id": 1,
        "name": "Trystan Gorczany",
        "address": "9484 Lucas Flat, West Kittymouth WA 67504",
        "email": "Taurean_Pollich31@gmail.com",
        "strideLength": 4,
        "dailyStepGoal": 7000,
        "friends": [
          5,
          43,
          46,
          11
        ]
      }

    expect(userOne).to.deep.equal(userOneData);
  });
});

// const { users } = data;

// describe('getUserById', () => {
//     it('returns the user object when the user id exists', () => {
//         const result = getUserById(users, 1);
//         expect(result).toEqual({
//             "id": 1,
//             "name": "Trystan Gorczany",
//             "address": "9484 Lucas Flat, West Kittymouth WA 67504",
//             "email": "Taurean_Pollich31@gmail.com",
//             "strideLength": 4,
//             "dailyStepGoal": 7000,
//             "friends": [5, 43, 46, 11]
//         });
//     });

//     it('returns undefined when the user id does not exist', () => {
//         const result = getUserById(users, 3);
//         expect(result).toBeUndefined();
//     });
// })