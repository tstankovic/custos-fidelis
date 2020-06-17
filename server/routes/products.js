const router = require('express').Router();
const contentful = require('contentful');

const Product = require('../model/Product');

const SPACE = process.env.SPACE;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

var client = contentful.createClient({
  space: SPACE,
  accessToken: 'eo65yikLqwF48Q0II_3NhgJUX5y9Tys198ey6q9bi5Q',
});

router.get('/contentful/:type', (req, res, next) => {
  client.getEntries().then((entries) => {
    const { items } = entries;
    res.status(200).json({
      items: items.filter((item) => item.fields.type === req.params.type),
    });
  });
});

router.get('/contentful/single/:id', (req, res, next) => {
  client.getEntry(req.params.id).then((entry) => {
    res.status(200).json(entry);
  });
});

router.get('/shirts', async (req, res, next) => {
  try {
    const products = await Product.find({ type: 'shirt' });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.post('/shirts', async (req, res, next) => {
  try {
    const product = new Product({ ...req.body });
    await product.save();
    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
