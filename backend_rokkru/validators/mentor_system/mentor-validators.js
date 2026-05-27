// ============= Start mentor validators =============
// Task #12 — check body / params / query BEFORE controller runs
// ................................................

const { body, param, query, validationResult } = require('express-validator');
const { fail } = require('../../utils/mentor_system/api-response');

// Start handle validation errors
// ................................................
function handleValidation(request, response, next) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return fail(response, errors.array()[0].msg, 400);
  }
  return next();
}
// End handle validation errors
// ................................................

// Start rules for POST /mentors (create profile)
// ................................................
const createMentorRules = [
  body('firstname').trim().notEmpty().withMessage('firstname is required'),
  body('lastname').trim().notEmpty().withMessage('lastname is required'),
  body('experience_years').optional().isInt({ min: 0 }).withMessage('experience_years must be >= 0'),
  handleValidation,
];
// End rules for POST /mentors
// ................................................

// Start rules for :userId in URL
// ................................................
const userIdParam = [
  param('userId').isInt({ min: 1 }).withMessage('Invalid user id'),
  handleValidation,
];
// End rules for :userId in URL
// ................................................

// Start rules for /mentors/posts/:postId
// ................................................
const postIdParam = [
  param('postId').isInt({ min: 1 }).withMessage('Invalid post id'),
  handleValidation,
];
// End rules for /mentors/posts/:postId
// ................................................

// Start rules for POST /mentors/:userId/posts
// ................................................
const createPostRules = [
  body('title').trim().notEmpty().withMessage('title is required'),
  body('province_id').isInt({ min: 1 }).withMessage('province_id is required'),
  body('sub_skill_id').isInt({ min: 1 }).withMessage('sub_skill_id is required'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status'),
  handleValidation,
];
// End rules for POST /mentors/:userId/posts
// ................................................

// Start rules for POST /mentors/:userId/skills
// ................................................
const addSkillRules = [
  body('sub_skill_id').isInt({ min: 1 }).withMessage('sub_skill_id is required'),
  body('proficiency_level').optional().isString(),
  handleValidation,
];
// End rules for POST /mentors/:userId/skills
// ................................................

// Start rules for GET /mentors and GET /mentors/search
// ................................................
const searchQueryRules = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('minExperience').optional().isInt({ min: 0 }),
  handleValidation,
];
// End rules for GET /mentors and GET /mentors/search
// ................................................

module.exports = {
  createMentorRules,
  userIdParam,
  postIdParam,
  createPostRules,
  addSkillRules,
  searchQueryRules,
};

// ============= End mentor validators =============
