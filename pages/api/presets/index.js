import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import connection from '../../../Mongo/connection'
import Preset from '../../../Mongo/models/Preset'
import User from '../../../Mongo/models/User'

export default async (req, res) => {
  const { user } = await getServerSession(req, res, authOptions)
  const { email } = user
  const { method, body } = req

  if (!email) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Not authenticated' })
  }
  await connection()

  let foundUser
  try {
    foundUser = await User.findOne({ email })
  } catch (err) {
    return res.status(400).json({ status: 'error', message: 'User not found' })
  }

  if (method === 'GET') {
    try {
      const presets = await Preset.find({ author: foundUser._id })
      return res.status(200).json({
        status: 'success',
        message: 'Preset fetch successful',
        presets
      })
    } catch (err) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Preset fetch failed' })
    }
  }

  if (method === 'POST') {
    try {
      const { name, state } = body
      const newPreset = new Preset({ name, state, author: foundUser.id })
      const result = await newPreset.save()
      return res.status(200).json({
        status: 'success',
        message: 'Preset fetch successful',
        preset: result
      })
    } catch (err) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Preset creation failed' })
    }
  }

  return res
    .status(400)
    .json({ status: 'error', message: 'Method not supported' })
}
