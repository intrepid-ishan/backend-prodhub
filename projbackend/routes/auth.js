const express   = require('express');
const router    = express.Router();
const { check } = require('express-validator');

//import controllers
const { signup, signin ,signout, isSignedIn } = require('../controllers/auth'); 

router.post('/signup',[
    check('name','Name should be atleast 5 char').isLength({min: 5}),
    check('email','email is required').isEmail(),
    check('password','Password should be atleast 5char').isLength({min:5})  
],signup);

router.post('/signin',[
    check('email','email is required').isEmail(),
    check('password','Password should be atleast 5char').isLength({min:5})  
],signin);

router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req,res)=>{
    return res.json(req.auth);
});

module.exports = router;