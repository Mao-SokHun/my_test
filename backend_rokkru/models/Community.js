const { sequelize, Sequelize } = require('../config/database')

const Community = sequelize.define('Community', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
  type: { type: Sequelize.ENUM('major', 'subject'), defaultValue: 'subject' },
  description: { type: Sequelize.TEXT },
  category: { type: Sequelize.STRING },
  memberCount: { type: Sequelize.INTEGER, defaultValue: 0 },
  createdBy: { type: Sequelize.UUID },
}, { tableName: 'communities', timestamps: true })

module.exports = Community
