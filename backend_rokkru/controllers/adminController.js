const { User, Teacher, Session } = require('../models')

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20 } = req.query
    const offset = (page - 1) * pageSize
    const { count, rows } = await User.findAndCountAll({
      attributes: { exclude: ['password'] },
      limit: Number(pageSize),
      offset,
      order: [['createdAt', 'DESC']],
    })
    res.json({ data: rows, total: count, page: Number(page), pageSize: Number(pageSize) })
  } catch (err) { next(err) }
}

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    await user.update(req.body)
    res.json(user)
  } catch (err) { next(err) }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    await user.destroy()
    res.status(204).end()
  } catch (err) { next(err) }
}

exports.getReports = async (_req, res, next) => {
  try {
    const users = await User.count()
    const teachers = await Teacher.count()
    const sessions = await Session.count()
    res.json({ users, teachers, sessions, revenue: 0 })
  } catch (err) { next(err) }
}
