const express = require('express');
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList
} = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

//middleware: getUserById
router.param('userId', getUserById);

//read
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

//update
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);

//userPurchaseList
router.put(
  '/orders/user/:userId',
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
