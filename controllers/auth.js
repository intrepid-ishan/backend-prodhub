const User = require('../models/user.js');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

//signup
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: 'NOT able to save user in DB'
      });
    }
    return res.json(user);
  });
};

//signin
exports.signin = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'USER email does not exists'
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Password do not match'
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie('token', token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role }
    });
  }); //end findOne
};

//signout
exports.signout = (req, res) => {
  res.clearCookie('token');
  return res.json({
    message: 'User signout successfully'
  });
};

//MW: isSignedIn
exports.isSignedIn = expressJwt({
  //if(auth) then signed in
  secret: process.env.SECRET,
  userProperty: 'auth',
  algorithms: ['HS256']
});

//MW: isAuthenticated
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED'
    });
  }
  next();
};

//MW: isAdmin
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'You are not ADMIN, Access denied'
    });
  }
  next();
};
