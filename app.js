const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./user.model');
const stopsRouter = require('./stop.controller');

app.use(express.json());
app.use(cors());

app.get('/api/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ itemId: id });
    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
});

app.post('/api', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});

app.patch('/api/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndUpdate({ itemId: id }, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
});

app.use(stopsRouter);

module.exports = app;
