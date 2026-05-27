// ============= Start assert owner helper =============
// ................................................

const { fail } = require('./api-response');

// Start parse user id from route param
// ................................................
function parseUserId(value) {
  const userId = parseInt(value, 10);
  const isValid = !Number.isNaN(userId);
  return isValid ? userId : null;
}
// End parse user id from route param
// ................................................

// Start check logged-in user owns resource
// ................................................
function assertOwner(request, response, targetUserId) {
  const target = parseUserId(targetUserId);
  if (target === null) {
    fail(response, 'Invalid user id', 400);
    return false;
  }

  const isOwner = Number(request.user.userId) === target;
  if (!isOwner) {
    fail(response, 'Forbidden', 403);
    return false;
  }

  return true;
}
// End check logged-in user owns resource
// ................................................

module.exports = { parseUserId, assertOwner };

// ============= End assert owner helper =============
