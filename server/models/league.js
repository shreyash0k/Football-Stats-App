module.exports = (sequelize, DataTypes) => {
    const League = sequelize.define('League', {
      leagueId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      leagueName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: DataTypes.STRING,
      season: DataTypes.INTEGER,
      logo: DataTypes.STRING,
      flag: DataTypes.STRING
    }, {});
    return League;
  };
  