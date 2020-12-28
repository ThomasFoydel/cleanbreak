const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/Auth');
const presetsRoutes = require('./routes/Presets');

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/presets', presetsRoutes);

// static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
// production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'));
  });
}

// build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}!`);
    });
  });
