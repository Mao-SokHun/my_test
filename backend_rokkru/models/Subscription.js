const { sequelize, Sequelize } = require('../config/database')

const Subscription = sequelize.define('Subscription', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  teacherId: { type: Sequelize.UUID, allowNull: false },
  plan: { type: Sequelize.ENUM('free', 'premium'), defaultValue: 'free' },
  status: { type: Sequelize.ENUM('active', 'trialing', 'past_due', 'canceling', 'canceled'), defaultValue: 'active' },
  billingInterval: { type: Sequelize.ENUM('monthly', 'annual'), defaultValue: 'monthly' },
  currentPeriodStart: { type: Sequelize.DATEONLY },
  currentPeriodEnd: { type: Sequelize.DATEONLY },
  cancelAtPeriodEnd: { type: Sequelize.BOOLEAN, defaultValue: false },
}, { tableName: 'subscriptions', timestamps: true })

module.exports = Subscription
