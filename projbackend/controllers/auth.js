const User                 = require('../models/user.js');
const { validationResult } = require('express-validator');


exports.signup = (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "NOT able to save user in DB"
            })
        }
        return res.json(user);
    });
};
