module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    task_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: DataTypes.STRING
  });

  Task.associate = function(models) {
    Task.hasMany(models.UserTask, {
      onDelete: "cascade"
    });
  };

  return Task;
};
