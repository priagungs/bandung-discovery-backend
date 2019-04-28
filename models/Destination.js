const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  price: Number
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;