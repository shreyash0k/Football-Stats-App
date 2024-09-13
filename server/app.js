// server/app.js
require('dotenv').config();
const express = require('express');
const playerRoutes = require('./routes/playerRoutes.js'); // Routes for player-related operations
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON payloads

// Routes
app.use('/api/players', playerRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
