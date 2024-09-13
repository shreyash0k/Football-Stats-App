// server/routes/playerRoutes.js
const express = require('express');
const { fetchPlayers } = require('../controllers/playerController'); // Import controller functions
const router = express.Router();

// Route for fetching and saving player data
router.get('/fetch', fetchPlayers);  // Define endpoint to fetch player data

module.exports = router;
