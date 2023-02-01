import bcrypt from 'bcryptjs'
import connection from '../../../Mongo/connection'
import User from '../../../Mongo/models/User'

export default async (req, res) => {
  if (req.method === 'POST') {
    await connection()
    const { email, name, password, confirmPassword } = req.body
    const allFieldsExist = email && name && password && confirmPassword
    if (!allFieldsExist) {
      return res
        .status(400)
        .json({ status: 'error', message: 'all fields required' })
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 8 characters'
      })
    }
    if (name.length < 4 || name.length > 12) {
      return res.status(400).json({
        status: 'error',
        message: 'Name must be between 4 and 12 characters'
      })
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Passwords do not match' })
    }
    if (!email.includes('@') || !email.includes('.')) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Valid email required' })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Profile with this email already exists'
      })
    }

    const hashedPw = await bcrypt.hash(password, 12)

    const newUser = new User({
      name: name,
      email: email.toLowerCase(),
      password: hashedPw
    })

    try {
      const result = await newUser.save()
      return res.status(201).json(result)
    } catch (err) {
      return res.status(400).json(err)
    }
  }
  return res
    .status(400)
    .json({ status: 'error', message: 'Method not supported' })
}
