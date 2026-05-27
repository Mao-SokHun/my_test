const { Teacher, User, Review } = require('../models')

exports.list = async (req, res, next) => {
  try {
    const { major, subject, location, sort, page = 1, pageSize = 20 } = req.query
    const where = {}
    if (major) where.major = major
    if (location) where.location = location

    const offset = (page - 1) * pageSize
    const { count, rows } = await Teacher.findAndCountAll({
      where,
      include: [{ model: User, as: 'user', attributes: ['name', 'email', 'avatar'] }],
      limit: Number(pageSize),
      offset,
      order: [['rating', 'DESC']],
    })

    res.json({ data: rows, total: count, page: Number(page), pageSize: Number(pageSize) })
  } catch (err) { next(err) }
}

exports.getById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['name', 'email', 'avatar'] },
        { model: Review, as: 'reviews', limit: 10, order: [['createdAt', 'DESC']] },
      ],
    })
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' })
    res.json(teacher)
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id)
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' })
    await teacher.update(req.body)
    res.json(teacher)
  } catch (err) { next(err) }
}

exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body
    const review = await Review.create({
      teacherId: req.params.id,
      userId: req.user.id,
      rating,
      comment,
    })

    const teacher = await Teacher.findByPk(req.params.id)
    const reviews = await Review.findAll({ where: { teacherId: req.params.id } })
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    await teacher.update({ rating: avgRating, reviewCount: reviews.length })

    res.status(201).json(review)
  } catch (err) { next(err) }
}
