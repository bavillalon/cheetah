module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    User_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Phone: DataTypes.INTEGER,
    Grade: DataTypes.INTEGER
  });

  User.associate = function(models) {
    User.hasMany(models.Task, {});
  };

  return User;
};
