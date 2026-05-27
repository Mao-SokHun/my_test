// ============= Start mentor routes =============
// ................................................

const express = require('express');

const router = express.Router();
const { authRequired } = require('../../../middleware/mentor_system/auth');
const { requireMentorProfile, requireMentorRole } = require('../../../middleware/mentor_system/require-mentor');
const { uploadPortfolio } = require('../../../middleware/mentor_system/upload');
const mentorsController = require('../../../controllers/mentor_system/mentors-controller');
const mentorPortfolioController = require('../../../controllers/mentor_system/mentor-portfolio-controller');
const mentorSkillsController = require('../../../controllers/mentor_system/mentor-skills-controller');
const mentorPostsController = require('../../../controllers/mentor_system/mentor-posts-controller');
const mentorAnalyticsController = require('../../../controllers/mentor_system/mentor-analytics-controller');
const {
  createMentorRules,
  userIdParam,
  postIdParam,
  createPostRules,
  addSkillRules,
  searchQueryRules,
} = require('../../../validators/mentor_system/mentor-validators');

// Start auth middleware chains
// ................................................
const authMentor = [authRequired, requireMentorRole];
const authMentorWithProfile = [authRequired, requireMentorRole, requireMentorProfile];
// End auth middleware chains
// ................................................

// Start public routes
// ................................................
router.get('/search', searchQueryRules, mentorsController.searchMentors);
router.get('/', searchQueryRules, mentorsController.listMentors);
router.get('/skills/catalog', mentorSkillsController.listSkillCatalog);
// End public routes
// ................................................

// Start authenticated mentor profile
// ................................................
router.get('/me', authRequired, mentorsController.getMyMentor);
router.get('/me/analytics', authMentorWithProfile, mentorAnalyticsController.getMyAnalytics);
router.post('/', authMentor, createMentorRules, mentorsController.createMentor);
// End authenticated mentor profile
// ................................................

// Start posts by id
// ................................................
router.get('/posts/:postId', postIdParam, mentorPostsController.getPostById);
router.put('/posts/:postId', authMentorWithProfile, postIdParam, mentorPostsController.updatePost);
router.delete('/posts/:postId', authMentorWithProfile, postIdParam, mentorPostsController.deletePost);
// End posts by id
// ................................................

// Start mentor by user id
// ................................................
router.get('/:userId', userIdParam, mentorsController.getMentorById);
router.put('/:userId', authMentor, userIdParam, mentorsController.updateMentor);
router.delete('/:userId', authMentor, userIdParam, mentorsController.deleteMentor);
// End mentor by user id
// ................................................

// Start portfolio routes
// ................................................
router.get('/:userId/portfolio', userIdParam, mentorPortfolioController.listPortfolio);
router.post('/:userId/portfolio', authMentorWithProfile, userIdParam, mentorPortfolioController.createPortfolioItem);
router.post(
  '/:userId/portfolio/upload',
  authMentorWithProfile,
  userIdParam,
  uploadPortfolio.single('file'),
  mentorPortfolioController.uploadPortfolioFile
);
router.put('/:userId/portfolio/:link', authMentorWithProfile, userIdParam, mentorPortfolioController.updatePortfolioItem);
router.delete('/:userId/portfolio/:link', authMentorWithProfile, userIdParam, mentorPortfolioController.deletePortfolioItem);
// End portfolio routes
// ................................................

// Start skills routes
// ................................................
router.get('/:userId/skills', userIdParam, mentorSkillsController.listSkills);
router.post('/:userId/skills', authMentorWithProfile, userIdParam, addSkillRules, mentorSkillsController.addSkill);
router.put('/:userId/skills/:msId', authMentorWithProfile, userIdParam, mentorSkillsController.updateSkill);
router.delete('/:userId/skills/:msId', authMentorWithProfile, userIdParam, mentorSkillsController.deleteSkill);
// End skills routes
// ................................................

// Start posts list and create
// ................................................
router.get('/:userId/posts', userIdParam, mentorPostsController.listPosts);
router.post('/:userId/posts', authMentorWithProfile, userIdParam, createPostRules, mentorPostsController.createPost);
// End posts list and create
// ................................................

module.exports = router;

// ============= End mentor routes =============
