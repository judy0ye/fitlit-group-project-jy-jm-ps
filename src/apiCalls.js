/* ~~~~~ Fetch Requests ~~~~~*/

// const fetchApiData = data => {

//   return fetch(`https://fitlit-api.herokuapp.com/api/v1/${data}`)
//     .then(response => response.json())
//     .catch(error => console.error('Error:', error));

// }

const fetchApiData = data => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
};

const postSavedHydration = data => {
  return fetch('http://localhost:3001/api/v1/hydration', 
  {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => {
      console.log('Hydration data:', data);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} server request failed, please try again later`);
      }
    })
    .then(json => {
      console.log(json);
      return json;
    })
    .catch(err => {
      console.error(`Error at: ${err}`);
      throw err;
    });
};

fetchApiData('hydration')
  .then(data => {
    console.log('Hydration data:', data);
  })
  .catch(error => {
    console.error('Error fetching hydration data:', error);
  });

// Example data to be sent in the POST request
const hydrationData = {
  userID: 1,
  date: '2023/07/02',
  numOunces: 16,
  name: 'FitChicks',
  chick1: 'Jan',
  chick2: 'Judy',
  chick3: 'Parvin',
  all: 'Looking Goooood!'
};

// Send POST request to save hydration data
postSavedHydration(hydrationData);

export {
  fetchApiData,
  postSavedHydration
}



