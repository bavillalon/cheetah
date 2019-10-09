module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    duedate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    esttime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    state: DataTypes.STRING
  });

  Task.associate = function(models) {
    Task.hasMany(models.UserTask);
  };

  return Task;
};
