const { sequelize, Sequelize } = require('../config/database')

const CommunityMember = sequelize.define('CommunityMember', {
  id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  communityId: { type: Sequelize.UUID, allowNull: false },
  userId: { type: Sequelize.UUID, allowNull: false },
  role: { type: Sequelize.ENUM('member', 'moderator', 'admin'), defaultValue: 'member' },
}, { tableName: 'community_members', timestamps: true, uniqueKeys: { unique_membership: { fields: ['communityId', 'userId'] } } })

module.exports = CommunityMember
