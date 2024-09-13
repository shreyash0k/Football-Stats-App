// server/controllers/playerController.js
const axios = require('axios');
const { savePlayersToDB } = require('../models/playerModel'); // Import DB saving function

// Function to fetch player data from external API
const fetchPlayers = async (req, res) => {
  try {
    // Fetch data from the API
    const apiResponse = await axios.get('https://api-football-v1.p.rapidapi.com/v3/players', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      },
      params: {
        league: '39', // Example league (Premier League)
        season: '2023', // Example season
      },
    });

    const players = apiResponse.data.response;
    
    // Save the players to the database
    await savePlayersToDB(players);

    res.status(200).json({ message: 'Players fetched and saved successfully', data: players });
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};

module.exports = { fetchPlayers };
