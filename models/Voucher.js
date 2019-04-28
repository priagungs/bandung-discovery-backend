const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  diskon: Number,
  destination: {type: mongoose.Schema.Types.ObjectId, ref: 'Destination'},
  expired: Date
})

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;