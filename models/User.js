module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    googleid: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    role: DataTypes.STRING,
    grade: DataTypes.INTEGER
  });

  User.associate = function(models) {
    User.hasMany(models.UserTask, {
      onDelete: "cascade"
    });
  };

  return User;
};
