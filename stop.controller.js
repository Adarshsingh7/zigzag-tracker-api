const express = require('express');
const router = express.Router();
const Stop = require('./stop.model');

// Create a new stop
router.post('/stops', async (req, res) => {
  try {
    const stop = new Stop(req.body);
    await stop.save();
    res.status(201).send(stop);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all stops
router.get('/stops', async (req, res) => {
  try {
    const stops = await Stop.find({});
    res.status(200).send(stops);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single stop by ID
router.get('/stops/:id', async (req, res) => {
  try {
    const stop = await Stop.findById(req.params.id);
    if (!stop) {
      return res.status(404).send();
    }
    res.status(200).send(stop);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a stop by ID
router.patch('/stops/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'location',
    'description',
    'latitude',
    'longitude',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const stop = await Stop.findById(req.params.id);
    if (!stop) {
      return res.status(404).send();
    }

    updates.forEach((update) => (stop[update] = req.body[update]));
    await stop.save();
    res.status(200).send(stop);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a stop by ID
router.delete('/stops/:id', async (req, res) => {
  try {
    const stop = await Stop.findByIdAndDelete(req.params.id);
    if (!stop) {
      return res.status(404).send();
    }
    res.status(200).send(stop);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
