// ============= Start MentorSkill model =============
// Task #7 — table mentor_skill — user_id + sub_skill_id
// ................................................

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const MentorSkill = sequelize.define('MentorSkill', {
  ms_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sub_skill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  proficiency_level: { type: DataTypes.STRING(50) },
  create_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  update_date: { type: DataTypes.DATE },
}, {
  tableName: 'mentor_skill',
  timestamps: false,
});

module.exports = MentorSkill;

// ============= End MentorSkill model =============
