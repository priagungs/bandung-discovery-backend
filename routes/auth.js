const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const router = require('express').Router();
const User = require('../models/User');

router.post('/register', function(req, res) {
  
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  console.log(hashedPassword);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword,
    type : req.body.type
  },
  (err, user) => {
    if (err) return res.status(500).send("There was a problem registering the user.")
    let token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});

router.get('/user', async (req, res) => {
  try {
    let user = await User.find({email: 'priagungsatyagama@gmail.com'});
    let token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
    res.status(200).send({auth: true, token: token});
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.get('/manager', async (req, res) => {
  try {
    let user = await User.find({email: 'alnataraw@gmail.com'});
    let token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
    res.status(200).send({auth: true, token: token});
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;
