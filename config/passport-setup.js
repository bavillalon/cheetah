const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
var db = require("../models");

// passport.serializeUser((user, done)=>{
//     done(null, user.id);
// });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findOne({
    where: {
      id: id
    }
  }).then(function(user) {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log(profile);
      //send the new user to DB from google, cheking if exits first 
      db.User.findOne({
        where: {
          googleid: profile.id
        }
      }).then(function(currentUser) {
        if (currentUser) {
          done(null, currentUser); 
        } else {
          //checking if it is in the DB without googleid
          db.User.findOne({
            where: {
              email: profile.emails[0].value
            }
          }).then(function(currentUser) {
            if (currentUser) {
              console.log("aperecio por el correo, le agrego el googleid");

              db.User.update(
                {
                  googleid: profile.id
                },
                {
                  where: {
                    id: currentUser.id
                  }
                }
              ).then(function(quant) {
                done(null, currentUser);
              });
            } else {
              // db.User.create({
              //   name: profile.displayName,
              //   email: profile.emails[0].value,
              //   googleid: profile.id
              // }).then(function(newUser) {
              //   console.log("el nuevo user " + newUser.id); //hacer logging
              //   done(null, newUser);
              // });
              done(null, currentUser);
            }
          });
        }
      });
    }
  )
);
