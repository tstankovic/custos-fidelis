const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;
console.log(uri);

const ordersRoutes = require('./routes/orders');
const productsRoutes = require('./routes/products');

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);

app.use((error, req, res, next) => {
  console.log(error.message);
  const { code, message } = error;
  if (code && message) {
    return res.status(code).json({ message });
  }
  return res.status(500).json({ message: 'Problem occurred' });
});

app.listen(port, () => console.log('listening on *: ' + port));
