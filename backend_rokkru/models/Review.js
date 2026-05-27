const { sequelize, Sequelize } = require('../config/database')

const Review = sequelize.define('Review', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  teacherId: { type: Sequelize.UUID, allowNull: false },
  userId: { type: Sequelize.UUID, allowNull: false },
  rating: { type: Sequelize.FLOAT, allowNull: false },
  comment: { type: Sequelize.TEXT },
}, { tableName: 'reviews', timestamps: true })

module.exports = Review
