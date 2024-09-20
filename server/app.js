require('dotenv').config();  // Loads environment variables from the .env file
const axios = require('axios');
const db = require('./models');  // Import Sequelize models

// Function to fetch football data from the API
const fetchFootballData = async () => {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
    params: {
      season: '2020',  // Specify the season (e.g., 2019)
      team: '170',  // Specify the team ID (e.g., 33 for Manchester United)
      league: '39'  // Specify the league ID (e.g., 39 for Premier League)
    },
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPIDAPI_KEY  // Ensure this is in your .env file
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.response;  // Return the API data
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;  // Re-throw the error for handling
  }
};

// Function to store football data in the database
const storeFootballData = async (data) => {
  const transaction = await db.sequelize.transaction();  // Start a transaction
  try {
    // Insert league data
    const [league] = await db.League.findOrCreate({
      where: { leagueId: data.league.id },
      defaults: {
        leagueName: data.league.name,
        country: data.league.country,
        season: data.league.season,
        logo: data.league.logo,
        flag: data.league.flag
      },
      transaction
    });

    // Insert team data
    const [team] = await db.Team.findOrCreate({
      where: { teamId: data.team.id },
      defaults: {
        teamName: data.team.name,
        logo: data.team.logo
      },
      transaction
    });

    // Insert team statistics
    await db.TeamStatistics.create({
      teamId: team.teamId,
      leagueId: league.leagueId,
      season: data.league.season,
      played_home: data.fixtures.played.home,
      played_away: data.fixtures.played.away,
      played_total: data.fixtures.played.total,
      wins_home: data.fixtures.wins.home,
      wins_away: data.fixtures.wins.away,
      wins_total: data.fixtures.wins.total,
      draws_home: data.fixtures.draws.home,
      draws_away: data.fixtures.draws.away,
      draws_total: data.fixtures.draws.total,
      loses_home: data.fixtures.loses.home,
      loses_away: data.fixtures.loses.away,
      loses_total: data.fixtures.loses.total
    }, { transaction });

    // Insert goals data
    await db.Goals.create({
      teamId: team.teamId,
      leagueId: league.leagueId,
      goals_for_home: data.goals.for.total.home,
      goals_for_away: data.goals.for.total.away,
      goals_for_total: data.goals.for.total.total,
      goals_against_home: data.goals.against.total.home,
      goals_against_away: data.goals.against.total.away,
      goals_against_total: data.goals.against.total.total
    }, { transaction });

    // Commit transaction after successful insertions
    await transaction.commit();
    console.log('Data successfully inserted!');
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    console.error('Error storing data:', error);
  }
};

// Main function to fetch and store football data
const main = async () => {
  try {
    // Step 1: Fetch data from the API
    const data = await fetchFootballData();

    // Step 2: Store data in the database
    await storeFootballData(data);
  } catch (error) {
    console.error('Error in the main process:', error);
  }
};

// Sync models with the database and start the main process
db.sequelize.sync({ force: false })  // Change to 'force: true' if you want to reset tables in dev
  .then(() => {
    console.log("Database synced!");
    main();  // Start the main function after syncing the database
  })
  .catch(err => {
    console.error("Error syncing the database: ", err);
  });
