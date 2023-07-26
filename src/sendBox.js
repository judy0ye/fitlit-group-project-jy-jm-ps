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
  
    displayNewHydrationEntry(data);
    event.target.reset();
  })
  
  function displayNewHydrationEntry(data) {
    newEntry.innerText = `Your entry for ${data.date} of ${data.numOunces} ounces drank has been submitted! Good job drankin'!`;
  };
  
  
<div class="lower-header">
  <h2 id="headerQuote" class="header-quote"></h2>
</div>

  import quotes from './data/quotes';

  let quote = document.querySelector('#headerQuote');

  displayRandomQuote()

  function displayRandomQuote() {
    quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  };