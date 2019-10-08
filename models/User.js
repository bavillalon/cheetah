module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    googleid: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    grade: DataTypes.INTEGER
  });

  // User.associate = function(models) {
  //   User.hasMany(models.Task, {});
  // };

  return User;
};
