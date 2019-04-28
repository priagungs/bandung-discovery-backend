const router = require('express').Router();
const Destination = require('../models/Destination');

router.post('/', async (req, res) => {
  try {
    let destination = await Destination.create({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      price: req.body.price
    }); 
    res.send({success: true, data: destination});
  } catch (err) {
    console.log(err);
    res.status(500).send({success: false, data: null});
  }
});

module.exports = router;