// ============= Start require mentor middleware =============
// Task #10 — runs after authRequired on protected mentor routes
// ................................................

const { Mentor } = require('../../models/mentor_system');
const { fail } = require('../../utils/mentor_system/api-response');

// Start requireMentorProfile — row in mentor table
// ................................................
async function requireMentorProfile(request, response, next) {
  try {
    const mentor = await Mentor.findByPk(request.user.userId);
    if (!mentor) {
      return fail(response, 'Mentor profile required. Create profile via POST /api/v1/mentors', 403);
    }
    request.mentor = mentor;
    return next();
  } catch (error) {
    return fail(response, error.message, 500);
  }
}
// End requireMentorProfile
// ................................................

// Start requireMentorRole — JWT role mentor or teacher
// ................................................
function requireMentorRole(request, response, next) {
  const role = (request.user.role || '').toLowerCase();
  const hasRole = Boolean(role);
  const isAllowedRole = role === 'mentor' || role === 'teacher';

  if (hasRole && !isAllowedRole) {
    return fail(response, 'Mentor role required', 403);
  }
  return next();
}
// End requireMentorRole
// ................................................

module.exports = { requireMentorProfile, requireMentorRole };

// ============= End require mentor middleware =============
