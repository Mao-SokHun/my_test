// ============= Start mentor analytics controller =============
// Task #6 Analytics — frontend: useMentorAnalytics, Analytics.jsx
// ................................................

const { Mentor, MentorPortfolio, MentorSkill, MentorPost } = require('../../models/mentor_system');
const { ok, fail } = require('../../utils/mentor_system/api-response');

// Start GET /mentors/me/analytics — counts from database
// ................................................
exports.getMyAnalytics = async (request, response) => {
  try {
    const userId = request.user.userId;

    const mentor = await Mentor.findByPk(userId);
    if (!mentor) return fail(response, 'Mentor profile not found', 404);

    const [portfolioCount, skillsCount, postsCount, publishedPostsCount] = await Promise.all([
      MentorPortfolio.count({ where: { mentor_id: userId } }),
      MentorSkill.count({ where: { user_id: userId } }),
      MentorPost.count({ where: { user_id: userId } }),
      MentorPost.count({ where: { user_id: userId, status: 'published' } }),
    ]);

    return ok(response, {
      user_id: userId,
      profile_views: 0,
      portfolio_count: portfolioCount,
      skills_count: skillsCount,
      posts_count: postsCount,
      published_posts_count: publishedPostsCount,
      sessions_count: 0,
      earnings: 0,
      note: 'profile_views, sessions_count, earnings — wire when those tables exist',
    });
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End GET /mentors/me/analytics
// ................................................

// ============= End mentor analytics controller =============
