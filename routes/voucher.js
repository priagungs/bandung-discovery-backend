const router = require('express').Router();
const moment = require('moment');
const QRCode = require('qrcode');

const User = require('../models/User');
const Voucher = require('../models/Voucher');


router.post('/:idVoucher/:idUser', async (req, res) => {
  try {
    let user = await User.findById(req.params.idUser);
    if (!user) {
      throw "User not found";
    }
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

router.get('/:idUser', async (req, res) => {
  try {
    let user = await User.findById(req.params.idUser);
    let vouchers = [];
    user.vouchers.forEach(async element => {
      let voucher = await Voucher.findById(element);
      vouchers.push(voucher);
    });
    res.status(200).send({success: true, data: vouchers});
  } catch (err) {
    console.log(err);
    res.status(500).send({success: false, data: null});
  }
});

router.delete('/:idVoucher/:idUser', async (req, res) => {
  try {
    let idVoucher = req.params.idVoucher;
    let user = await User.findById(req.params.idUser);
    if (!user || user.type === 'manager') {
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

router.put('/decrement/:idUser', async (req, res) => {
  try {
    let user = await User.findById(req.params.idUser);
    user.numVoucher--;
    user = await user.save();
    res.send({success: true, data: user});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, data: null});
  }
});



module.exports = router;
