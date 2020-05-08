const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const eventController = require("../controllers/eventController")

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
    
  })
  
);

//add event
router.post('/addevent', ensureAuthenticated, eventController.addevent);
//view event
router.get("/dashboard", ensureAuthenticated, eventController.viewevent);
//edit event
router.post('/editevent', ensureAuthenticated, eventController.editevent);
//delete event
router.get("/deleteevent/:id" , ensureAuthenticated, eventController.deleteevent)
// router.get('/dashboard/test', eventController.test);

module.exports = router;
