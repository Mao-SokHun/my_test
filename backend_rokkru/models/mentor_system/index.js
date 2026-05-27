// ============= Start mentor system models index =============
// Task #7 — load models and Sequelize associations
// ................................................

const sequelize = require('../../config/config');

// Start import all models
// ................................................
const UserType = require('./user-type');
const User = require('./User');
const UserSession = require('./UserSession');
const Admin = require('./Admin');
const Student = require('./Student');
const Mentor = require('./mentor');
const MentorPortfolio = require('./mentor-portfolio');
const Skill = require('./skill');
const SubSkill = require('./sub-skill');
const MentorSkill = require('./mentor-skill');
const Province = require('./province');
const MentorPost = require('./mentor-post');
const SubscriptionPlan = require('./SubscriptionPlan');
const Subscription = require('./Subscription');
const TransactionDetail = require('./TransactionDetail');
const BakongPayment = require('./BakongPayment');
const AccountHistoryLog = require('./AccountHistoryLog');
const AccountHistory = require('./AccountHistory');
const CommunityType = require('./CommunityType');
const CommunityPost = require('./CommunityPost');
const CommunityHistory = require('./CommunityHistory');
// End import all models
// ................................................

// Start Sequelize associations
// ................................................
UserType.hasMany(User, { foreignKey: 'user_type_id' });
User.belongsTo(UserType, { foreignKey: 'user_type_id' });

User.hasOne(Admin, { foreignKey: 'user_id' });
Admin.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Student, { foreignKey: 'user_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Mentor, { foreignKey: 'user_id' });
Mentor.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(UserSession, { foreignKey: 'user_id' });
UserSession.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(AccountHistory, { foreignKey: 'user_id' });
AccountHistory.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(AccountHistoryLog, { foreignKey: 'user_id' });
AccountHistoryLog.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(CommunityPost, { foreignKey: 'user_id' });
CommunityPost.belongsTo(User, { foreignKey: 'user_id' });

UserType.hasMany(CommunityPost, { foreignKey: 'user_type_id' });
CommunityPost.belongsTo(UserType, { foreignKey: 'user_type_id' });

CommunityType.hasMany(CommunityPost, { foreignKey: 'community_type_id' });
CommunityPost.belongsTo(CommunityType, { foreignKey: 'community_type_id' });

CommunityPost.hasMany(CommunityHistory, { foreignKey: 'post_com_id' });
CommunityHistory.belongsTo(CommunityPost, { foreignKey: 'post_com_id' });

Mentor.hasMany(MentorPortfolio, { foreignKey: 'mentor_id' });
MentorPortfolio.belongsTo(Mentor, { foreignKey: 'mentor_id' });

Mentor.hasOne(Subscription, { foreignKey: 'user_id' });
Subscription.belongsTo(Mentor, { foreignKey: 'user_id' });

UserType.hasMany(Subscription, { foreignKey: 'user_type_id' });
Subscription.belongsTo(UserType, { foreignKey: 'user_type_id' });

Mentor.hasMany(MentorSkill, { foreignKey: 'user_id' });
MentorSkill.belongsTo(Mentor, { foreignKey: 'user_id' });

Mentor.hasMany(MentorPost, { foreignKey: 'user_id' });
MentorPost.belongsTo(Mentor, { foreignKey: 'user_id' });

Skill.hasMany(SubSkill, { foreignKey: 'skill_id' });
SubSkill.belongsTo(Skill, { foreignKey: 'skill_id' });

SubSkill.hasMany(MentorSkill, { foreignKey: 'sub_skill_id' });
MentorSkill.belongsTo(SubSkill, { foreignKey: 'sub_skill_id' });

SubSkill.hasMany(MentorPost, { foreignKey: 'sub_skill_id' });
MentorPost.belongsTo(SubSkill, { foreignKey: 'sub_skill_id' });

Province.hasMany(MentorPost, { foreignKey: 'province_id' });
MentorPost.belongsTo(Province, { foreignKey: 'province_id' });

Admin.hasMany(SubscriptionPlan, { foreignKey: 'admin_id' });
SubscriptionPlan.belongsTo(Admin, { foreignKey: 'admin_id' });

SubscriptionPlan.hasMany(Subscription, { foreignKey: 'subscription_Plan_id' });
Subscription.belongsTo(SubscriptionPlan, { foreignKey: 'subscription_Plan_id' });

User.hasMany(TransactionDetail, { foreignKey: 'user_id' });
TransactionDetail.belongsTo(User, { foreignKey: 'user_id' });

Subscription.hasMany(TransactionDetail, { foreignKey: 'subscription_id' });
TransactionDetail.belongsTo(Subscription, { foreignKey: 'subscription_id' });

User.hasMany(BakongPayment, { foreignKey: 'user_id' });
BakongPayment.belongsTo(User, { foreignKey: 'user_id' });
// End Sequelize associations
// ................................................

module.exports = {
  sequelize,
  UserType,
  User,
  UserSession,
  Admin,
  Student,
  Mentor,
  MentorPortfolio,
  Skill,
  SubSkill,
  MentorSkill,
  Province,
  MentorPost,
  SubscriptionPlan,
  Subscription,
  TransactionDetail,
  BakongPayment,
  AccountHistoryLog,
  AccountHistory,
  CommunityType,
  CommunityPost,
  CommunityHistory,
};

// ============= End mentor system models index =============
