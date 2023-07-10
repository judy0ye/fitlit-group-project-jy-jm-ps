import { expect } from "chai";
import { getAvgFluidConsumed } from "../src/functions/get-average-fluid-consumed";

describe('fluid consumed', function() {
  it('should return average fluid ounces consumed per day for all time', function() {
    const hydrationInfo = [
      {
        "userID": 1,
        "date": "2023/03/24",
        "numOunces": 28
      },
      {
        "userID": 2,
        "date": "2023/03/24",
        "numOunces": 35
      },
      {
        "userID": 3,
        "date": "2023/03/24",
        "numOunces": 95
      }
    ];

    const avgFluidConsumed = getAvgFluidConsumed(hydrationInfo);
    
    expect(avgFluidConsumed).to.deep.equal(53)
  })
})