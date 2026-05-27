// ============= Start auth middleware =============
// ................................................

const jwt = require('jsonwebtoken');
const { fail } = require('../../utils/mentor_system/api-response');

// Start jwt secret from environment
// ................................................
const jwtSecret = process.env.JWT_SECRET || 'dev-secret-change-me';
// End jwt secret from environment
// ................................................

/**
 * authRequired — verify Bearer token and set req.user
 */
function authRequired(request, response, next) {
  // Start read authorization header
  // ................................................
  const authorizationHeader = request.headers.authorization || '';
  const [scheme, token] = authorizationHeader.split(' ');
  // End read authorization header
  // ................................................

  const isBearerScheme = scheme === 'Bearer';
  const hasToken = Boolean(token);

  if (!isBearerScheme || !hasToken) {
    return fail(response, 'Missing or invalid Authorization header', 401);
  }

  try {
    // Start verify token payload
    // ................................................
    const payload = jwt.verify(token, jwtSecret);

    request.user = {
      userId: payload.user_id ?? payload.userId ?? payload.id,
      role: payload.role,
      email: payload.email,
    };

    const hasUserId = Boolean(request.user.userId);
    if (!hasUserId) {
      return fail(response, 'Token payload missing user id', 401);
    }
    // End verify token payload
    // ................................................

    return next();
  } catch {
    return fail(response, 'Invalid or expired token', 401);
  }
}

module.exports = { authRequired };

// ============= End auth middleware =============
