const express = require('express');
const db = require('./models');  // Import Sequelize models
const cors = require('cors');
require('dotenv').config(); // This loads variables from .env into process.env


const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// API route to get team statistics by league and season
app.get('/api/statistics', async (req, res) => {
    const { leagueId, season } = req.query;
  
    // Validate input
    if (!leagueId || !season) {
      return res.status(400).json({ error: 'Missing leagueId or season' });
    }
  
    try {
      // Query to get team statistics along with goals, team, and league
      const statistics = await db.TeamStatistics.findAll({
        where: { leagueId, season },
        include: [
          { 
            model: db.Team, 
            attributes: ['teamName', 'logo'],  // Fetching team details
            required: true  // Ensure the team exists (prevent null teams)
          },
          { 
            model: db.League, 
            attributes: ['leagueName', 'country', 'season', 'logo', 'flag'],  // Fetching league details
            required: true  // Ensure the league exists (prevent null leagues)
          },
          { 
            model: db.Goals, 
            attributes: ['goals_for_home', 'goals_for_away', 'goals_for_total', 'goals_against_home', 'goals_against_away', 'goals_against_total']  // Fetching goals
          }
        ]
      });
  
      // Check if any data is found
      if (!statistics || statistics.length === 0) {
        return res.status(404).json({ error: 'No data found for the given league and season' });
      }
  
      // Send the response with the retrieved statistics
      res.json(statistics);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    }
);


console.log('Database:', process.env.PG_DATABASE);
console.log('User:', process.env.PG_USER);
console.log('Host:', process.env.PG_HOST);
console.log('Port:', process.env.PG_PORT);

