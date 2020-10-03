const express   = require('express');
const router    = express.Router();
const { check } = require('express-validator');

//import controllers
const { signup } = require('../controllers/auth'); 

router.post('/signup',[
    check('name','Name should be atleast 5 char').isLength({min: 5}),
    check('email','email is required').isEmail(),
    check('password','Password should be atleast 5char').isLength({min:5})  
],signup);


module.exports = router;