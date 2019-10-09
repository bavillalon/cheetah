var db = require("../models");

module.exports = function(app) {
  // Get all tasks for the cordinator
  app.get("/api/tasks", function(req, res) {
    db.Task.findAll({}).then(function(Tasks) {
      res.json(Tasks);
    });
  });

  // Get all unassigned tasks for the cordinator
  app.get("/api/unassignedtasks", function(req, res) {
    db.Task.findAll({
      where: {
        state: "Unassigned"
      }
    }).then(function(Tasks) {
      res.json(Tasks);
    });
  });

  //Assigning a task to a volunteer{task, volunterrid}
  app.get("/api/assigningtask", function(req, res) {
    db.Task.update(
      { state: "Assigned" },
      {
        where: {
          id: req.body.task.id
        }
      }
    ).then(function(task) {
      db.UserTask.create({
        TaskId: task.id,
        UserId: req.body.volunteerid
      }).then(function(usertask) {
        res.end();
      });
    });
  });

  //Adding a new task{task}
  app.post("/api/newtask", function(req, res) {
    db.Task.create({
      task_name: req.body.task_name,
      description: req.body.description,
      quantity: req.body.quantity,
      dueDate: req.body.dueDate,
      estimatedTime: req.body.estimatedTime,
      state: req.body.state
    }).then(function(task) {
      db.UserTask.create({
        TaskId: task.id,
        UserId: req.user.id
      }).then(function(usertask) {
        res.end();
      });
    });
  });

  //Adding a new User{user}
  app.post("/api/newuser", function(req, res) {
    db.User.create(req.body).then(function(user) {
      res.json(user);
    });
  });

  //   // Create a new example
  //   app.post("/api/examples", function(req, res) {
  //     db.Example.create(req.body).then(function(dbExample) {
  //       res.json(dbExample);
  //     });
  //   });

  //   // Delete an example by id
  //   app.delete("/api/examples/:id", function(req, res) {
  //     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //       res.json(dbExample);
  //     });
  //   });
};
