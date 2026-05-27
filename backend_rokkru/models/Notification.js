const { sequelize, Sequelize } = require('../config/database')

const Notification = sequelize.define('Notification', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  userId: { type: Sequelize.UUID, allowNull: false },
  type: { type: Sequelize.STRING, allowNull: false },
  title: { type: Sequelize.STRING },
  message: { type: Sequelize.TEXT },
  read: { type: Sequelize.BOOLEAN, defaultValue: false },
  data: { type: Sequelize.JSONB },
}, { tableName: 'notifications', timestamps: true })

module.exports = Notification
