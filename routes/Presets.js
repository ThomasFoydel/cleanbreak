const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

function findWithAttr(array, attr, val) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === val) {
      return i;
    }
  }
  return -1;
}

/* save over existing preset */
router.post('/save', auth, async (req, res) => {
  let { userId } = req.tokenUser;
  let { state, name } = req.body;

  const foundUser = await User.findById(userId);
  const foundPresets = foundUser.presets;

  const indexOfPresetToUpdate = findWithAttr(foundPresets, 'name', name);
  foundPresets[indexOfPresetToUpdate].params = state;

  User.findByIdAndUpdate(
    userId,
    { $set: { presets: foundPresets } },
    { new: true, useFindAndModify: false }
  )
    .then((updatedUser) => {
      const newArray = [];
      updatedUser.presets.forEach((preset, i) => {
        const presetObj = {
          text: preset.name,
          value: preset.params,
        };
        newArray.push(presetObj);
      });

      const nameOfNewPreset =
        updatedUser.presets[updatedUser.presets.length - 1].name;
      return res.send({ presets: newArray, current: nameOfNewPreset });
    })
    .catch((err) => console.log('preset update error: ', err));
});

/* save new preset */
router.post('/newsave', auth, async (req, res) => {
  let { name, state, username } = req.body;
  const { userId } = req.tokenUser;

  const foundUser = await User.findById(userId);
  if (foundUser.presets) {
    if (foundUser.presets.some((preset) => preset.name === name)) {
      return res.send({ err: 'preset with this name already exists' });
    }
  }
  const newPreset = { author: username, name: name, params: state };
  User.findByIdAndUpdate(
    userId,
    { $push: { presets: newPreset } },
    { new: true, useFindAndModify: false }
  )
    .then((updatedUser) => {
      const newArray = [];
      updatedUser.presets.forEach((preset, i) => {
        const presetObj = {
          text: preset.name,
          value: preset.params,
        };
        newArray.push(presetObj);
      });

      const nameOfNewPreset =
        updatedUser.presets[updatedUser.presets.length - 1].name;
      return res.send({ presets: newArray, current: nameOfNewPreset });
    })
    .catch((err) => console.log('save preset error: ', err));
});

/* delete preset */
router.post('/delete', auth, async (req, res) => {
  let { name } = req.body;
  const { userId } = req.tokenUser;

  if (name === 'default') {
    return res.send({ err: 'cannot delete default preset' });
  }

  // check if preset exists
  const foundUser = await User.findById(userId);
  if (foundUser.presets) {
    if (!foundUser.presets.some((preset) => preset.name === name)) {
      return res.send({ err: 'no preset found with this name' });
    }
  }

  // determine index/name of new current preset
  let newIndex;
  const deleteIndex = findWithAttr(foundUser.presets, 'name', name);
  if (deleteIndex > 0) {
    newIndex = deleteIndex - 1;
  } else {
    newIndex = 0;
  }

  User.findByIdAndUpdate(
    userId,
    { $pull: { presets: { name } } },
    { new: true, useFindAndModify: false }
  )
    .then((updatedUser) => {
      const newArray = [];
      updatedUser.presets.forEach((preset, i) => {
        const presetObj = {
          text: preset.name,
          value: preset.params,
        };
        newArray.push(presetObj);
      });
      const nameOfNewCurrent = updatedUser.presets[newIndex].name;

      return res.send({
        presets: newArray,
        current: nameOfNewCurrent,
        newCurrentIndex: newIndex,
      });
    })
    .catch((err) => console.log('save preset error: ', err));
});

module.exports = router;
