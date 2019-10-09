module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    duedate: DataTypes.DATE,
    esttime: DataTypes.TIME,
    state: DataTypes.STRING
  });

  Task.associate = function(models) {
    Task.hasMany(models.UserTask, {
      onDelete: "cascade"
    });
  };

  return Task;
};
