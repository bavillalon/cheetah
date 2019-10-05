module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: DataTypes.TEXT,
    Quantity: DataTypes.INTEGER,
    Due_Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Est_Time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    State: DataTypes.STRING
  });

  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
