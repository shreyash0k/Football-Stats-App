module.exports = (sequelize, DataTypes) => {
    const TeamStatistics = sequelize.define('TeamStatistics', {
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Teams',
          key: 'teamId'
        }
      },
      leagueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Leagues',
          key: 'leagueId'
        }
      },
      season: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      played_home: DataTypes.INTEGER,
      played_away: DataTypes.INTEGER,
      played_total: DataTypes.INTEGER,
      wins_home: DataTypes.INTEGER,
      wins_away: DataTypes.INTEGER,
      wins_total: DataTypes.INTEGER,
      draws_home: DataTypes.INTEGER,
      draws_away: DataTypes.INTEGER,
      draws_total: DataTypes.INTEGER,
      loses_home: DataTypes.INTEGER,
      loses_away: DataTypes.INTEGER,
      loses_total: DataTypes.INTEGER
    }, {});
    return TeamStatistics;
  };
  