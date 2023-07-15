/* ~~~~~ Fetch Requests ~~~~~*/
// console.log('I will be a fetch request!')

const fetchApiData = data => {

  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${data}`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

}

export {
  fetchApiData
}