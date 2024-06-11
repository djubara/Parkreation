// apiKey
const apiKey = "yWEFk0saMAGqZhd2g8j6iNhf9vXQ7fQfzOvAiZMo";

function fetchParksByState(stateCode) {

  // URL
  const npsAPI = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${apiKey}`;

  // fetch parks
  fetch(npsAPI)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(`There are ${data.total} parks in ${stateCode.toUpperCase()}.`);
      data.data.forEach(park => {
        console.log(park.fullName);
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}