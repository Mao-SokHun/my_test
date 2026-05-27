const { Teacher, User } = require('../models')
const { Op } = require('sequelize')

exports.search = async (req, res, next) => {
  try {
    const { q } = req.query
    if (!q) return res.json({ results: [], total: 0 })

    const teachers = await Teacher.findAll({
      include: [{ model: User, as: 'user', attributes: ['name', 'email', 'avatar'] }],
      where: {
        [Op.or]: [
          { major: { [Op.iLike]: `%${q}%` } },
          { location: { [Op.iLike]: `%${q}%` } },
          { '$user.name$': { [Op.iLike]: `%${q}%` } },
        ],
      },
      limit: 20,
    })

    res.json({ results: teachers, total: teachers.length })
  } catch (err) { next(err) }
}
