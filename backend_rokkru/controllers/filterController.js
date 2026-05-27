const { Teacher } = require('../models')
const { Sequelize } = require('sequelize')

exports.getFilterOptions = async (_req, res, next) => {
  try {
    const majors = await Teacher.findAll({ attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('major')), 'major']], where: { major: { [Sequelize.Op.ne]: null } }, raw: true })
    const locations = await Teacher.findAll({ attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('location')), 'location']], where: { location: { [Sequelize.Op.ne]: null } }, raw: true })

    res.json({
      majors: majors.map((r) => r.major).filter(Boolean),
      locations: locations.map((r) => r.location).filter(Boolean),
      sorts: ['Best Match', 'Highest Rated', 'Most Popular', 'Newest', 'Price: Low to High', 'Price: High to Low'],
    })
  } catch (err) { next(err) }
}
