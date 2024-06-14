const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// apiKey
const apiKey = "yWEFk0saMAGqZhd2g8j6iNhf9vXQ7fQfzOvAiZMo";


// fetch parks for MN
function fetchParks(stateCode = 'mn') {

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

      // Extracting the data needed
      const parksArray = data.data.map((park) => ({
        fullName: park.fullName,
        description: park.description,
        parkCode: park.parkCode,
        id: park.id,
        imageUrl: park.images.length > 0 ? park.images[0].url : null
      }));

      console.log(parksArray);

      // Creating and appending park cards to the DOM
      const container = document.getElementById(''); //TODO: add id to html
      container.innerHTML = ''; 

      // Loop through the parksArray and create a card for each park
      parksArray.forEach(park => {
        const parkCard = document.createElement('div');
        parkCard.className = 'card';
        parkCard.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${park.fullName}</h5>
            ${park.imageUrl ? `<img src="${park.imageUrl}" class="card-img-top" alt="Park Image">` : ''}
            <p class="card-text">${park.description}</p>
          </div>
        `;

        // Append the park card to the container
        container.appendChild(parkCard);
      });
    })
    // Catch any errors and log them to the console
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

//Fetch parks in Minnesota (state code: "mn")
fetchParks('mn');

//TODO: Add event listener to the form to fetch parks


