const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

//
// Colors
//

const colorSchema = new mongoose.Schema({
  username: String,
  name: String,
  red1: Number,
  green1: Number,
  blue1: Number,
  red2: Number,
  green2: Number,
  blue2: Number,
  red3: Number,
  green3: Number,
  blue3: Number,
});

const ColorScheme = mongoose.model('Color', colorSchema);

router.get('/', async (req, res) => {
  try {
    let colorSchemes = await ColorScheme.find();
    return res.send(colorSchemes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const colorScheme = new ColorScheme({
    username: req.body.username,
    name: req.body.name,
    red1: req.body.red1,
    green1: req.body.green1,
    blue1: req.body.blue1,
    red2: req.body.red2,
    green2: req.body.green2,
    blue2: req.body.blue2,
    red3: req.body.red3,
    green3: req.body.green3,
    blue3: req.body.blue3,
  });
  try {
    await colorScheme.save();
    return res.send(colorScheme);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', auth.verifyToken, async (req, res) => {
  try {
    console.log("Before");
    await ColorScheme.deleteOne({
      _id: req.params.id
    });
    console.log("After");
    return res.sendStatus(200);
  } catch (error) {
    console.log("Error");
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;