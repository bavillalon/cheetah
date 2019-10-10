const router = require("express").Router();
const passport = require("passport");

//auth login
router.get("/login", (req, res) => {
  res.redirect("/");
});

//auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//local auth
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  //   res.send(JSON.stringify(req.user));
  res.redirect("/");
});

module.exports = router;
