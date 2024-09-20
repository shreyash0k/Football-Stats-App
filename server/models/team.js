module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
      teamId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logo: DataTypes.STRING
    }, {});
    return Team;
  };
  