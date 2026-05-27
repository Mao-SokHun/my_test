const { sequelize, Sequelize } = require('../config/database')

const PostLike = sequelize.define('PostLike', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  postId: { type: Sequelize.UUID, allowNull: false },
  userId: { type: Sequelize.UUID, allowNull: false },
}, { tableName: 'post_likes', timestamps: true, uniqueKeys: { unique_like: { fields: ['postId', 'userId'] } } })

module.exports = PostLike
