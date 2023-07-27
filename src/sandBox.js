
// FETCH REQUESTS //

// const fetchRecipes = fetch(`http://localhost:3001/api/v1/recipes`);
// const fetchIngredients = fetch(`http://localhost:3001/api/v1/ingredients`);
// const fetchUsers = fetch(`http://localhost:3001/api/v1/users`);
// const postSavedRecipe = (data) => {
//   fetch('http://localhost:3001/api/v1/usersRecipes', {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-type': 'application/json'
//   }
// })
//   .then(response => {
//     if(response.ok) {
//       return response.json()
//     } else {
//       alert(`${response.status} server request failed, please try again later`)
//       console.error('Request failed with status:', response.status)
//     }
//   })
//   .then(json => console.log(json))
//   .catch(err => console.log(err))
// };

// export { fetchRecipes, fetchIngredients, fetchUsers, postSavedRecipe };



const fetchApiData = data => {

  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

}
const postSavedHydration = (data => {
  fetch('http://localhost:3001/api/v1/hydration', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
  }
})
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      alert(`${response.status} server request failed, please try again later`)
      console.error('Request failed with status:', response.status)
    }
  })

  .then(json => {
    console.log(json);
    displayNewHydrationEntry(json);
  })
  .catch(err => console.log(`Error at: ${err}`));
});

function displayNewHydrationEntry(postUserInput) {
  console.log('Response from server:', postUserInput);
  hydrationInfo.innerHTML += `<p>You drink ${postUserInput.numOunces}</p>`;
}

// Fetch data from API
fetchApiData('hydration')
  .then(data => {
    // Use the data fetched from the API
    console.log('Hydration data:', data);
  })
  .catch(error => {
    // Handle any error that occurred during the API call
    console.error('Error fetching hydration data:', error);
  });

// Example data to be sent in the POST request
const hydrationData = {
  userID: 1,
  date: '2023/07/02',
  numOunces: 16,
};

// Send POST request to save hydration data
postSavedHydration(hydrationData);