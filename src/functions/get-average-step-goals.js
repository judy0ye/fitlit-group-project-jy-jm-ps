const getAvgStepGoal = (users) => {
  if (!users) {
    return undefined;
  }

  let counter = 0;
  users.forEach((user) => (counter += user.dailyStepGoal));
  return Math.round(counter / users.length);
};

export { getAvgStepGoal };