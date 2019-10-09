var db = require("../models");

module.exports = function(app) {
  // Get all tasks
  app.get("/api/tasks", function(req, res) {
    db.Task.findAll({}).then(function(Tasks) {
      res.json(Tasks);
    });
  });

  // Get all unassigned tasks
  app.get("/api/unassignedtasks", function(req, res) {
    db.Task.findAll({
      where: {
        state: "Unassigned"
      }
    }).then(function(Tasks) {
      res.json(Tasks);
    });
  });

  // Get all assigned tasks
  // app.get("/api/assignedtasks", function(req, res) {
  //   db.UserTask.findAll({
  //     order: ["Task", "createdAt", "DESC"],
  //     include: [
  //       {
  //         model: User,
  //         where: { role: "Volunteer" }
  //       }
  //     ],
  //     include: [
  //       {
  //         model: Task,
  //         where: { state: "Assigned" }
  //       }
  //     ]
  //   }).then(function(tasks) {
  //     res.json(tasks);
  //   });
  // });

  // Get all tasks from a logged teacher
  app.get("/api/teachertasks", function(req, res) {
    db.UserTask.findAll({
      where: { UserId: req.user.id },
      order: ["Task", "createdAt", "DESC"],
      include: [db.Task]
    }).then(function(tasks) {
      res.json(tasks);
    });
  });

  //Assigning a task to a volunteer{{task}, volunterrid}
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

  //A volunteer picking a task {task}
  app.get("/api/pickingtask", function(req, res) {
    db.Task.update(
      { state: "Assigned" },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(task) {
      db.UserTask.create({
        TaskId: task.id,
        UserId: req.user.id
      }).then(function(usertask) {
        res.end();
      });
    });
  });

  //Checking Out a task {task}
  app.get("/api/checkouttask", function(req, res) {
    db.Task.update(
      { state: "Done" },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(task) {
      res.end();
    });
  });

  //Adding a new task{task}
  app.post("/api/newtask", function(req, res) {
    db.Task.create({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      duedate: req.body.duedate,
      esttime: req.body.esttime,
      state: "Unassigned"
    }).then(function(task) {
      db.UserTask.create({
        TaskId: task.id,
        UserId: req.user.id
      }).then(function(usertask) {
        res.end();
      });
    });
  });

  //Editing a task{task}
  app.put("/api/editingtask", function(req, res) {
    db.Task.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(task) {
      res.json(task);
    });
  });

  //Removing a task(id on the path)
  app.delete("/api/task/:id", function(req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(task) {
      res.end();
    });
  });

  //Adding a new User{user}
  app.post("/api/newuser", function(req, res) {
    db.User.create(req.body).then(function(user) {
      res.json(user);
    });
  });

  //Editing a user{user}
  app.put("/api/editinguser", function(req, res) {
    db.User.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

  //Removing a user(id on the path)
  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(user) {
      res.end();
    });
  });

  //Get all tasks from a logged teacher

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
