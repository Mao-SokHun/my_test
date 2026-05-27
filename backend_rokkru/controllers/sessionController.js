const { Session, Teacher, User } = require('../models')

exports.list = async (req, res, next) => {
  try {
    const where = {}
    if (req.user.role === 'student') where.studentId = req.user.id
    if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ where: { userId: req.user.id } })
      if (teacher) where.teacherId = teacher.id
    }

    const sessions = await Session.findAll({
      where,
      include: [
        { model: Teacher, as: 'teacher', include: [{ model: User, as: 'user', attributes: ['name'] }] },
        { model: User, as: 'student', attributes: ['name', 'email'] },
      ],
      order: [['date', 'ASC']],
    })
    res.json({ data: sessions })
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const session = await Session.create({ ...req.body, studentId: req.user.id })
    res.status(201).json(session)
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id)
    if (!session) return res.status(404).json({ error: 'Session not found' })
    await session.update(req.body)
    res.json(session)
  } catch (err) { next(err) }
}

exports.remove = async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id)
    if (!session) return res.status(404).json({ error: 'Session not found' })
    await session.destroy()
    res.status(204).end()
  } catch (err) { next(err) }
}
