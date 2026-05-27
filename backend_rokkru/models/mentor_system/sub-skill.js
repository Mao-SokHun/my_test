// ============= Start SubSkill model =============
// Task #3 — catalog table sub_skill
// ................................................

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const SubSkill = sequelize.define('SubSkill', {
  sub_skill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  skill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  skill_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  create_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  update_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'sub_skill',
  timestamps: false,
});

module.exports = SubSkill;

// ============= End SubSkill model =============
