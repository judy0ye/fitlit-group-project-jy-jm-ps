// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const data = {
//       "userID": newUser.id, 
//       "date": document.getElementById('dateInput').value.split('-').join('/'), 
//       "numOunces": ouncesInput.value
//     };
  
//     fetch('http://localhost:3001/api/v1/hydration', {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(data => data.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(`Error at: ${err}`));
  
//     displayNewHydrationEntry(data);
//     event.target.reset();
//   })
  
//   function displayNewHydrationEntry(data) {
//     newEntry.innerText = `Your entry for ${data.date} of ${data.numOunces} ounces drank has been submitted! Good job drankin'!`;
//   };


  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      "userID": newUser.id, 
      "date": document.getElementById('dateInput').value.split('-').join('/'), 
      "numOunces": ouncesInput.value
    };
  
    fetch('http://localhost:3001/api/v1/hydration', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
    .then(json => console.log(json))
    .catch(err => console.log(`Error at: ${err}`));
  
    function displayFluidConsumedToday(data);
    event.target.reset();
  })

// dayly 
  function displayFluidConsumedToday(hydration, currentUser, currentDate) {
    const fluidToday = getFluidDrankForSpecificDay(
      hydration,
      currentUser.id,
      currentDate
    );
  
    // hydrationInfo.innerHTML += `<p>You drank ${fluidToday} ounces today</p>`;
    hydrationInfo.innerHTML += `<p>Your entry for ${data.date} of ${data.numOunces} ounces drank has been submitted! Good job drankin'!</p>`;
  }



// weekly
  function displayWeeklyHydrationData(hydration, currentUser) {
    const weeklyHydrationEntries = getWeeklyFluid(hydration, currentUser.id);
  
    weeklyHydrationEntries.forEach((entry) => {
      oneWeekHydrationChart.innerHTML += `<p>${entry.date}: ${entry.numOunces} ounces</p>`;
    });
  }


  
<div class="lower-header">
  <h2 id="headerQuote" class="header-quote"></h2>
</div>

  import quotes from './data/quotes';

  let quote = document.querySelector('#headerQuote');

  displayRandomQuote()

  function displayRandomQuote() {
    quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  };