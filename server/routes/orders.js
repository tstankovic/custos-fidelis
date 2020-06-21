const router = require('express').Router();
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const Order = require('../model/Order');

const { PASS, SECRET_KEY } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tihomir.stankovic@gmail.com',
    pass: PASS,
  },
});

router.post('/', async (req, res, next) => {
  const { orderInfo, orderItems } = req.body;
  const order = new Order({ ...orderInfo });
  try {
    await order.save();

    const info = await transporter.sendMail({
      from: 'tihomir.stankovic@gmail.com',
      to: 'tihomir.stankovic@gmail.com',
      subject: 'Нова поруџбина',
      html: `
        <h1>Info</h1>
        <p><b>Ime i prezime</b>: ${orderInfo.firstName} ${
        orderInfo.lastName
      }</p>
        <p><b>Broj telefona</b>: ${orderInfo.phoneNumber}</p>
        <p><b>Ulica i broj</b>: ${orderInfo.address}</p>
        <p><b>Grad</b>: ${orderInfo.city}</p>
        <p><b>Poštanski broj</b>: ${orderInfo.zipCode}</p>
        <p><b>Email</b>: ${orderInfo.email}</p>
        <p><b>Firma</b>: ${orderInfo.company}</p>
        <p><b>Napomene</b>: ${orderInfo.notes}</p>
        <br />
        ------------------------------------------------------------
        <h2>Proizvodi</h2>
        <br />
        ${orderItems.map(
          (item) =>
            `
            <div>
            <p>${item.product.name} - ${item.size} x ${item.qty} | Total = ${
              item.qty * item.product.price
            } din</p>
            <img width="50" height="50" src="${item.product.image}" />
            </div>`
        )}
      `,
    });
    console.log('Message sent: %s', info.messageId);
    res.status(201).json({ message: 'Order saved' });
  } catch (err) {
    next(err);
  }
});

router.post('/recaptcha', (req, res, next) => {
  const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
  return fetch(VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${SECRET_KEY}&response=${req.body.response}`,
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      res.status(200).json(data);
    })
    .catch(next);
});

module.exports = router;
