const router = require('express').Router();
const contentful = require('contentful');

const Product = require('../model/Product');

const SPACE = process.env.SPACE;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

var client = contentful.createClient({
  space: SPACE,
  accessToken: ACCESS_TOKEN,
});

router.get('/contentful/:type', (req, res, next) => {
  const { type } = req.params;
  client
    .getEntries({
      content_type: 'tshirt',
      'fields.type': type,
    })
    .then((entries) => {
      const { items } = entries;
      res.status(200).json(items);
    });
});

router.get('/contentful/single/:id', (req, res, next) => {
  client.getEntry(req.params.id).then((entry) => {
    res.status(200).json(entry);
  });
});

router.get('/contentful/fixed/:type/:amount', (req, res, next) => {
  const { type, amount } = req.params;
  client
    .getEntries({
      limit: amount,
      content_type: 'tshirt',
      'fields.type': type,
    })
    .then((entries) => {
      res.status(200).json(entries);
    })
    .catch(next);
});

// UNUSED
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
