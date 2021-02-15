const { Router } = require("express");
const passport = require("passport");
const passportFacebook = require("passport-facebook");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const authService = require("../services/authService");
const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');
const jwt = require('jsonwebtoken');
const categoryService = require('../services/categoryService');

const router = Router();

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then(user => {
    done(null, user);
  });
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
      callbackURL: "http://localhost:3000/user/login/google/callback",
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
  passport.authenticate("facebook", { scope: ["public_profile", "email"]})
);

router.get(
  "/login/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get(
  "/login/google", isGuest, 
  passport.authenticate("google", { scope: ["profile", "email" ]})
);

router.get(
  "/login/google/callback",
  passport.authenticate("google"),(req, res) => {
    
  let token = jwt.sign(
    { _id: req.user._Id, username: req.user.displayName},
    process.env.USER_SESION_SECRET
  );

  res.cookie(process.env.COOKIE_SESSION_NAME, token);
  res.redirect('/');
  }
);

router.get("/login", isGuest, async (req, res) => {
  let categories = await categoryService.getAll();

  res.render("user/login", {title: "Вход", categories});
});

router.post("/login", isGuest ,async (req, res) => {

  try {
    let token = await authService.login(req.body);

    res.cookie(process.env.COOKIE_SESSION_NAME, token);
    res.redirect('/');
  } catch (message) {
    res.render('user/login', {message})
  }
    
})

router.get('/register', isGuest, async (req, res) => {
    let categories = await categoryService.getAll();

    res.render("user/register", {title: "Регистрация", categories})
})

router.post("/register", isGuest, async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;


    if(password !== confirmPassword)
    {
        res.render('user/register' ,{message: "password missmatch"});
        return;
    }

    try {

        await authService.register(req.body);

        res.redirect('/user/login');

    } catch (message) {

        res.render('user/register', {message});
        
    }

})

router.get('/emailverification/:token', async (req, res) => {
  try {
    await authService.validateEmail(req.params.token);
    res.redirect('/user/login');
  } catch(message) {
    res.redirect('/user/login')
  } 
})

router.get('/logout', isAuthenticated, (req, res) => {
  res.clearCookie(process.env.COOKIE_SESSION_NAME);

  res.redirect('/');
})

module.exports = router;
