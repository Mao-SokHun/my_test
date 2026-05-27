const bcrypt = require('bcryptjs')
const { User, Teacher } = require('../models')
const { generateToken } = require('../utils/generateToken')

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'student' } = req.body
    const existing = await User.findOne({ where: { email } })
    if (existing) return res.status(400).json({ error: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role })

    if (role === 'teacher') {
      await Teacher.create({ userId: user.id })
    }

    const token = generateToken(user)
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) { next(err) }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = generateToken(user)
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }, token })
  } catch (err) { next(err) }
}

exports.me = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) { next(err) }
}

exports.logout = (_req, res) => {
  res.json({ message: 'Logged out' })
}
