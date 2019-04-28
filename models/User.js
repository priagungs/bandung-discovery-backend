const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, index: true, unique: true},
  password: String,
  type: String,
  numVoucher: Number,
  vouchers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Voucher'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;



