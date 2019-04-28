const router = require('express').Router();
const QRCode = require('qrcode');
const User = require('../models/User');
const Voucher = require('../models/Voucher');

router.get('/manager', async (req, res) => {
  try {
    let user = await User.findById(res.locals.id);
    if (user.type !== 'manager') {
      return res.status(403).send({success: false, data: null});
    }
    let vouchers = await Voucher.find();
    let voucher = vouchers[Math.floor(Math.random() * vouchers.length)];
    console.log(voucher);
    let url = await QRCode.toDataURL(voucher._id.toString());
    console.log(url);
    res.send({success: true, data: url}); 
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, data: null});
  }
});

router.get('/tourist/:idVoucher', async (req, res) => {
  try {
    let user = await User.findById(res.locals.id);
    let idVoucher = req.params.idVoucher;
    console.log("USER\n" + user);
    if (user.type !== 'tourist' && !user.vouchers.includes(idVoucher)) {
      return res.status(403).send({success: false, data: null});
    }

    console.log(idVoucher);
    let url = await QRCode.toDataURL(idVoucher);
    console.log(url);
    res.send({success: true, data: url}); 
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, data: null});
  }
});

module.exports = router;

