const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.listen(port, () => console.log('listening on *: ' + port));
