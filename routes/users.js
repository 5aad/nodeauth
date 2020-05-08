const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const connectionModel=require('../models/connectionSaved')
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');



// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', async (req, res, next) => {
  
  //const sessions= connectionModel.find(user=>user.passport.user===userid.id)
  console.log(req.body.email)
  let list={}
  let userid= await User.find()
  
  //list=userid.pop()
  let flag=false;
  let user;
  for(let i=0;i<userid.length;i++){
    if(userid[i].email.toLowerCase()===req.body.email.toLowerCase()){
      flag=true
      user=userid[i]._id

    }
    //console.log(userid[i])
    i++;
  }
  console.log(flag)
  const session=await connectionModel.find()
  console.log(session[1])
  let sessionArr=[]
  // for(let i=0;i<session.length;i++){
  //   if(session[i].session.user===user){
  //     sessionArr.push(session[i])
  //   }
  //   i++;
  // }
  console.log(sessionArr)
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});



module.exports = router;