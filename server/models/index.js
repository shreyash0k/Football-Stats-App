'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env

const basename = path.basename(__filename);
const db = {};

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    logging: false, // Disable SQL logging for cleaner output; set to true for debugging
  }
);
// Load all models from the models folder
fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define associations between models
if (db.League && db.TeamStatistics) {
  db.League.hasMany(db.TeamStatistics, { foreignKey: 'leagueId' });
  db.Team.hasMany(db.TeamStatistics, { foreignKey: 'teamId' });

  db.TeamStatistics.belongsTo(db.Team, { foreignKey: 'teamId', targetKey: 'teamId' });
  db.TeamStatistics.belongsTo(db.League, { foreignKey: 'leagueId', targetKey: 'leagueId' });

  db.TeamStatistics.hasOne(db.Goals, { foreignKey: 'teamId', sourceKey: 'teamId' });
  db.Goals.belongsTo(db.TeamStatistics, { foreignKey: 'teamId', targetKey: 'teamId' });
}

// Add Sequelize instance to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
