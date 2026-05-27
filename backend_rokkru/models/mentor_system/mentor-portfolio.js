// ============= Start MentorPortfolio model =============
// Task #7 — table mentor_portfolio — composite PK mentor_id + link
// ................................................

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const MentorPortfolio = sequelize.define('MentorPortfolio', {
  mentor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING(250),
    primaryKey: true,
    allowNull: false,
  },
  link_tag: { type: DataTypes.STRING(250) },
  title: { type: DataTypes.STRING(200) },
  description: { type: DataTypes.TEXT },
  item_type: { type: DataTypes.STRING(50) },
}, {
  tableName: 'mentor_portfolio',
  timestamps: false,
});

module.exports = MentorPortfolio;

// ============= End MentorPortfolio model =============
