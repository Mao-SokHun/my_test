const jwt = require('jsonwebtoken')
const { User } = require('../models')

exports.authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.id)

    if (!user || user.status !== 'active') {
      return res.status(401).json({ error: 'User not found or inactive' })
    }

    req.user = { id: user.id, email: user.email, role: user.role }
    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }
    next(err)
  }
}

exports.requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' })
  }
  next()
}
