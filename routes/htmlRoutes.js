var db = require("../models");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log("User Logged ================" + JSON.stringify(req.user));
    res.render("index");
  });
  app.get("/coordinator", function(req, res) {
    res.render("coordinator_menu");
  });
  app.get("/volunteer", function(req, res) {
    res.render("volunteer_menu");
  });

  app.get("/teacher", function(req, res) {
    res.render("teacher_menu");
  });

  app.get("/allTasks", function(req, res) {
    db.Task.findAll({}).then(function(data) {
      var hbsObject = {
        tasks: data
      };
      console.log(data);
      console.log(hbsObject);
      res.render("allTasks", hbsObject);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("index");
  });
};
