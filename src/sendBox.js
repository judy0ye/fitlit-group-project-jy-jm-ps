
function dataManipulation (){
    let sleep = sleepData
    let hydration = hydrationData;
};


// sleep quality all time - water for all time
function getAvgQuality(sleepData, userID) {
    const sleepEntries = sleepData.filter(entry => entry.userID === userID);
    const avgQuality = sleepEntries.reduce((acc, user) => {
      return acc += user.sleepQuality;
    }, 0);
    return Math.round(avgQuality / sleepEntries.length * 10) / 10;
  };
  
  //hours per day - oz per day
  function getHoursByDay(sleepData, id, date) {
  console.log(sleepData, id, date)
    const sleepEntries = sleepData.filter(entry => entry.userID === id);
   console.log(sleepEntries)
   const dailyEntry = sleepEntries.find(entry => entry.date === date);
   console.log(dailyEntry)
    return dailyEntry.hoursSlept;
  };
  
  //wekly sleep - weekly oz (need to add logic for currentWeek)
  function getWeekSleep(sleepData, userID, startDate) {
    const sleepEntries = sleepData.filter(entry => entry.userID === userID);
    const indexOfCurrentDayEntry = sleepEntries.findIndex(entry => entry.date === startDate);
    const weeklySleep = sleepEntries.slice(indexOfCurrentDayEntry, indexOfCurrentDayEntry - 7).reverse();
    const weeklySleepData = weeklySleep.map(entry => ({
      date: entry.date,
      hoursSlept: entry.hoursSlept + ' hours slept',
      sleepQuality: ' a sleep quality rating of ' + entry.sleepQuality
    }));
    return weeklySleepData;
  };


  function getFluidPerWeek(hydrationData, userID, startDate) {
    const fluidEntries = hydrationData.filter(entry => entry.userID === userID);
    const indexOfCurrentDayEntry = fluidEntries.findIndex(entry => entry.date === startDate);
    const weeklyFluid = fluidEntries.slice(indexOfCurrentDayEntry, indexOfCurrentDayEntry - 7).reverse();
    const weeklyHydrationData = weeklyFluid.map(entry => ({
      date: entry.date,
      numOunces: entry.numOunces + 'ounces consumed',
    }));
    return weeklySleepData;
  };

  function displayWeeklySleep(sleep, newUser, currentDate) {
    const weeklySleepEntries = getWeekSleep(sleep, newUser.id, currentDate);
    weeklySleepEntries.forEach(entry => {
      weeklySleep.innerText += `${entry.date}: ${entry.hoursSlept} @ ${entry.sleepQuality}
     `;
    });
  };