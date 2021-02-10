const { Router } = require("express");
const passport = require("passport");
const passportFacebook = require("passport-facebook");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const { propfind } = require("./homeController");
const authService = require("../services/authService");

const router = Router();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new passportFacebook.Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_APP_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_APP_SECRET,
      callbackURL: "http://www.psychologyoflife.live/user/login/facebook/callback",
      profileFields: ["id", "displayName", "name", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = await User.findOne({facebookId: profile.id}).exec();
      if (!user) {
        const { id, email, name, first_name, last_name } = profile._json;
        const userData = {
          username: first_name,
          firstName: first_name,
          lastName: last_name,
          email: email,
          isEmailConfirmed: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          createdBy: name,
          updatedBy: name,
          facebookId: id,
          isDeleted: false,
        };
        new User(userData).save();
      } else {
        
        console.log(user._id);
      }
      return done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_APP_ID,
      clientSecret: process.env.GOOGLE_CLIENT_APP_SECRET,
      callbackURL: "http://www.psychologyoflife.live/user/login/google/callback",
      profileFields: ["id", "displayName", "name", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
        let user = await User.findOne({ googleId: profile.id }).exec();
        if(user._id == undefined) {
            const {sub, email, email_verified, picture } = profile._json;

            const userData = {
                username: email,
                email: email,
                isEmailConfirmed: email_verified,
                imageUrl: picture,
                googleId: sub,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                createdBy: email,
                updatedBy: email,
                isDeleted: false
            }
            new User (userData).save();
        } else {
            console.log('alredy exist');
        }
      return done(null, profile);
    }
  )
);

router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

router.get(
  "/login/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get(
  "/login/google",
  passport.authenticate("google", { scope: "email" })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {

  try {
    let token = await authService.login(req.body);
    console.log(token);
    res.cookie(process.env.COOKIE_SESSION_NAME, token);
    res.redirect('/');
  } catch (err) {
    res.render('login', {err})
  }
    
})

router.get('/register', (req, res) => {
    res.render("register")
})

router.post("/register", async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password !== confirmPassword)
    {
        res.render('register' ,{message: "password missmatch"});
        return;
    }

    try {

        let user = await authService.register(req.body);

        res.redirect('/user/login');

    } catch (err) {

        res.render('register', {err});
        
    }

})

module.exports = router;
