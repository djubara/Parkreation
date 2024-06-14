const router = require('express').Router();
const users = require('../models/users');
const axios = require('axios');
const apiKey = process.env.API_KEY;
const { Park } = require('../models/park');


router.get('/', async (req, res) => {
    // const loggedIn = req.session.loggedIn;
    const usersData = await users.findAll().catch((err) => { res.json(err); });
    const users = usersData.map((user) => user.get({ plain: true }));
    res.render('homepage', { users });

});

router.get('/signin', async (req, res) => {
    res.render('login');
});

router.get('/register', async (req, res) => {
    res.render('register');
}
);

//function to fetch parks data
async function fetchAndStoreParks(stateCode = 'mn') {
    const npsAPI = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${apiKey}`;

    try {
        const response = await axios.get(npsAPI);
        const parksData = response.data.data;

        // Map through parksData and create entries in the database
        const parksPromises = parksData.map(async (park) => {
            await Park.findOrCreate({
                where: { parkCode: park.parkCode },
                defaults: {
                    fullName: park.fullName,
                    description: park.description,
                    parkCode: park.parkCode,
                    imageUrl: park.images.length > 0 ? park.images[0].url : null,
                },
            });
        });

        await Promise.all(parksPromises);
        console.log(`Successfully fetched and stored ${parksData.length} parks.`);
        return parksData;
    } catch (error) {
        console.error('Error fetching and storing parks:', error);
        throw new Error('Failed to fetch and store parks data');
    }
}

// Route to fetch and store parks data
router.get('/parks', async (req, res) => {
    try {
      const parksData = await fetchAndStoreParks('mn');
      res.render('parks', { parks: parksData });
    } catch (error) {
      console.error('Error fetching and storing parks:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;