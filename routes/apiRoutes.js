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
      { state: "Done" },
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
        res.send("Assigned");
      });
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
