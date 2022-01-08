const User = require('../models/user');
const Order = require('../models/order');

//MW: getUserById (^-^)
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user was found in DB'
      });
    }
    req.profile = user;
    next();
  });
};

//read
exports.getUser = (req, res) => {
  req.profile.encry_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

//update
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'You are not authorized to update this user'
        });
      }

      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    } //end callback
  );
};

//userPurchaseList from Order Model
exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No Order in this account'
        });
      }
      return res.json(order);
    });
};

//MW: pushOrderInPurchaseList
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

  //Store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: 'Unable to save purchase list'
        });
      }
      next();
    }
  );
};