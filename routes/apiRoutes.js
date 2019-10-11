var db = require("../models");
const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');

var mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_EMAIL,
    pass: process.env.NODE_EMAIL_PW
  }
});

//emailRecipient: $("#emailOfUser").val().trim(),
//nameOfUser: $("#nameOfUser").val().trim(),
//subjectOfIssue: $("#subjectOfIssue").val().trim(),
//fullDescription: $("#fullDescription").val().trim(),
module.exports = function(app) {
  app.post("/api/mail", function(req,res){
    var mailOptions = {
      from: process.env.NODE_EMAIL,
      to: 'bryan@texplm.com',
      cc:req.body.emailRecipient,
      subject: req.body.subjectOfIssue,
      text: `Hello Admin,
      User with name ${req.body.nameOfUser} has an issue with the description below:
      
      ${req.body.fullDescription}
      
      Thanks!`
    };
    mailTransport.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
    res.end();
  })

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
  app.get("/api/assignedtasks", function(req, res) {
    db.UserTask.findAll({
      order: ["Task", "createdAt", "DESC"],
      include: [
        {
          model: db.User,
          where: { role: "Volunteer" }
        },
        {
          model: db.Task,
          where: { state: "Assigned" }
        }
      ]
    }).then(function(tasks) {
      res.json(tasks);
    });
  });

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
    ).then(function(t) {
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
    ).then(function(t) {
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
      task_name: req.body.task_name,
      description: req.body.description,
      quantity: req.body.quantity,
      dueDate: req.body.dueDate,
      estimatedTime: req.body.estimatedTime,
      state: "Unassigned"
    }).then(function(task) {
      db.UserTask.create({
        TaskId: task.dataValues.id,
        UserId: req.user.id
      }).then(function(usertask) {
        res.end();
      });
    });
  });

  //Editing a task{task}
  app.put("/api/edittask", function(req, res) {
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
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
      phone: req.body.phone,
      role: req.body.role,
      grade: req.body.grade
    }).then(function(user) {
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

  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(users) {
      res.json(users);
    });
  });

  // Get all users
  app.get("/api/volunteers", function(req, res) {
    db.User.findAll({
      where: {
        role: "Volunteer"
      }
    }).then(function(users) {
      res.json(users);
    });
  });

};
