const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  // Validate The Request
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exists
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).send('Incorrect email or password.');
    }

    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']));
  } else {
    // Insert the new user if they do not exist yet
    user = new User(_.pick(req.body, ['email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']));
  }
});

module.exports = router;
