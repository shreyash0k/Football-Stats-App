module.exports = (sequelize, DataTypes) => {
    const Goals = sequelize.define('Goals', {
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
      goals_for_home: DataTypes.INTEGER,
      goals_for_away: DataTypes.INTEGER,
      goals_for_total: DataTypes.INTEGER,
      goals_against_home: DataTypes.INTEGER,
      goals_against_away: DataTypes.INTEGER,
      goals_against_total: DataTypes.INTEGER
    }, {});
    return Goals;
  };
  