const express = require('express');
const user = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const router = express.Router();

router.route('/register')
    .get(user.renderRegisterForm)
    .post(catchAsync(user.registerUser));

router.route('/login')
    .get(user.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), catchAsync(user.loginUser));

router.get('/logout', user.logout);

module.exports = router;