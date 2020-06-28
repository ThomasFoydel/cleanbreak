const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth');

const User = require('../models/User');

router.post('/register', async (req, res) => {
  let { email, name, password, confirmpassword } = req.body;
  let allFieldsExist = email && name && password && confirmpassword;
  if (!allFieldsExist) {
    return res.send({ err: 'all fields required' });
  }

  if (password.length < 6) {
    return res.send({ err: 'Password must be at least 6 characters' });
  }
  if (name.length < 4 || name.length > 12) {
    return res.send({ err: 'Name must be between 4 and 12 characters' });
  }
  if (password !== confirmpassword) {
    return res.send({ err: 'Passwords do not match' });
  }
  if (!email.includes('@') || !email.includes('.')) {
    return res.send({ err: 'Valid email required' });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.send({ err: 'Profile with this email already exists' });
  }

  const hashedPw = await bcrypt.hash(password, 12);

  const newUser = new User({
    name: name,
    email: email.toLowerCase(),
    password: hashedPw,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, async function (err, user) {
    if (err) {
      return res.json({
        err:
          'Sorry, there is an issue with connecting to the database. We are working on fixing this.',
      });
    } else {
      if (!user) {
        return res.json({ err: 'No user found with this email' });
      }
      const passwordsMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordsMatch) {
        const token = jwt.sign(
          {
            tokenUser: {
              userId: user._id,
              email: user.email,
            },
          },
          process.env.SECRET,
          { expiresIn: '1000hr' }
        );

        const userInfo = {
          userId: user._id,
          email: user.email,
          name: user.name,
          presets: user.presets,
        };
        res.json({
          status: 'success',
          message: 'Login successful',
          data: {
            user: userInfo,
            token,
          },
        });
      } else {
        return res.json({ err: 'Incorrect password' });
      }
    }
  });
});

// get user auth info (happens on every reload of ui, in app.js)
router.get('/user/', auth, async (req, res) => {
  let { tokenUser } = req;
  if (tokenUser) {
    User.find({ _id: tokenUser.userId })
      .then((foundUser) => {
        const { name, email, _id, presets } = foundUser[0];
        return res.send({ name, email, id: _id, presets });
      })
      .catch((error) => res.send({ err: 'no user found' }));
  } else {
    return res.send({ err: 'no token' });
  }
});
module.exports = router;
