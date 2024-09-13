// server/models/playerModel.js
const { Pool } = require('pg');

// Set up connection to the PostgreSQL database
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Function to save player data to the database
const savePlayersToDB = async (players) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const insertQuery = `
      INSERT INTO players (player_id, name, age, nationality, team, position, goals, assists)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (player_id) DO NOTHING;
    `;
    
    // Insert each player into the database
    for (const player of players) {
      const { id, name, age, nationality, team, position, goals, assists } = player;
      await client.query(insertQuery, [id, name, age, nationality, team, position, goals, assists]);
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { savePlayersToDB };
