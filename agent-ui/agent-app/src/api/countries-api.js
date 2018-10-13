
export const getCountries = () => {
  return fetch('data/countries.json')
    .then(
      (response) => {
        if(response.status !== 200) {
          console.log(`failed to get countries status: ${response.status} - ${response.body}`);
          return;
        }

        return response.json().then((data) => data);
      }
    )
    .catch((error) => console.log(`Error getting countries. ${error.message}`))
};