const router = require('express').Router();
const moment = require('moment');
const QRCode = require('qrcode')

const User = require('../models/User');
const Voucher = require('../models/Voucher');


router.post('/:idVoucher', async (req, res) => {
  try {
    let user = await User.findById(res.locals.id);
    if (!user) {
      throw "User not found";
    }
    console.log(res.locals.id);
    user.vouchers.push(req.params.idVoucher);
    console.log(user);
    user.save();
    res.send({success: true, data: user});
  } catch (err) {
    console.log(err);
    res.status(500).send({success: false, data: null});
  }
});

router.post('/', async (req, res) => {
  try {
    let voucher = await Voucher.create({
      diskon: req.body.diskon,
      destination: req.body.destinationId,
      expired: moment(req.body.expired).toDate()
    });
    res.send({success: true, data: voucher});
  } catch (err) {
    console.log(err);
    res.status(500).send({success: false, data: null});
  }
});

router.get('/', async (req, res) => {
  try {
    let vouchers = await Voucher.find();
    res.status(200).send({success: true, data: vouchers});
  } catch (err) {
    console.log(err);
    res.status(500).send({success: false, data: null});
  }
});

router.delete('/:idVoucher', async (req, res) => {
  try {
    let idVoucher = req.params.idVoucher;
    let user = await User.findById(res.locals.id);
    if (!user) {
      throw "User not found";
    }
    console.log(user);
    user.vouchers.splice(user.vouchers.indexOf(idVoucher), 1);
    console.log(user);
    user.save();
    res.send({success: true, data: user});
  } catch (err) {
    console.log(err);
    res.status(500).send({success: false, data: null});
  }
});

router.get('/qrcode', async (req, res) => {
  try {
    let user = await User.findById(res.locals.id);
    if (user.type !== 'manager') {
      return res.status(403).send({success: false, data: null});
    }

    user.numVoucher--;
    await user.save();

    let vouchers = await Voucher.find();
    let voucherId = vouchers.map(voucher => voucher._id)[Math.floor(Math.random() * vouchers.length)];
    console.log(voucherId);
    let url = await QRCode.toDataURL(voucherId.toString());
    console.log(url);
    res.send({success: true, data: url}); 
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, data: null});
  }
});

router.get('/qrcode/:idVoucher', async (req, res) => {
  try {
    let user = await User.findById(res.locals.id);
    if (user.type !== 'tourist') {
      return res.status(403).send({success: false, data: null});
    }
    let idVoucher = req.param.idVoucher;
    user.vouchers.splice(user.vouchers.indexOf(idVoucher), 1);
    await user.save();

    console.log(idVoucher);
    let url = await QRCode.toDataURL(idVoucher.toString());
    console.log(url);
    res.send({success: true, data: url}); 
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, data: null});
  }
});

module.exports = router;
