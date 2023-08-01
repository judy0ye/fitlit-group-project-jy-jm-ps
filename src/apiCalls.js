/* ~~~~~ Fetch Requests ~~~~~*/

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


export {
  fetchApiData,
  postSavedHydration
}



