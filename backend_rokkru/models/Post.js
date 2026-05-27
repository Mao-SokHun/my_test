const { sequelize, Sequelize } = require('../config/database')

const Post = sequelize.define('Post', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  communityId: { type: Sequelize.UUID, allowNull: false },
  authorId: { type: Sequelize.UUID, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  image: { type: Sequelize.STRING },
  likeCount: { type: Sequelize.INTEGER, defaultValue: 0 },
  commentCount: { type: Sequelize.INTEGER, defaultValue: 0 },
}, { tableName: 'posts', timestamps: true })

module.exports = Post
