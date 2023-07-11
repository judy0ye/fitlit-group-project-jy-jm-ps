import { expect } from 'chai';
import { getAvgFluidConsumed } from '../src/functions/get-average-fluid-consumed';

describe('fluid consumed', function () {
  let hydrationInfo;
  beforeEach(function () {
    hydrationInfo = [
      {
        userID: 1,
        date: '2023/03/24',
        numOunces: 28
      },
      {
        userID: 2,
        date: '2023/03/25',
        numOunces: 35
      },
      {
        userID: 3,
        date: '2023/03/24',
        numOunces: 95
      }
    ];
  });
  it('should return average fluid ounces consumed per day for all time', function () {
    const avgFluidConsumed = getAvgFluidConsumed(hydrationInfo);

    expect(avgFluidConsumed).to.deep.equal(53);
  });
  it("should return a user's fluid ounces consumed on a specific day", function () {
    const date = '2023/03/25';
    const id = 2;
    const fluidOnSpecificDay = getAvgFluidConsumed(hydrationInfo, date, id);

    expect(fluidOnSpecificDay).to.equal(35);
  });
  it("should return another user's fluid ounces consumed on a specific day", function () {
    const date = '2023/03/24';
    const id = 3;
    const fluidOnSpecificDay = getAvgFluidConsumed(hydrationInfo, date, id);

    expect(fluidOnSpecificDay).to.equal(95);
  });
});
