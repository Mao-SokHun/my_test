// ============= Start error handler middleware =============
// Task #12 — global JSON errors for mentor_system routes
// ................................................

const { fail } = require('../../utils/mentor_system/api-response');

// Start notFoundHandler — unknown route
// ................................................
function notFoundHandler(request, response) {
  return fail(response, `Route not found: ${request.method} ${request.originalUrl}`, 404);
}
// End notFoundHandler
// ................................................

// Start errorHandler — Sequelize and server errors
// ................................................
// eslint-disable-next-line no-unused-vars
function errorHandler(error, request, response, next) {
  const isValidationError = error.name === 'SequelizeValidationError';
  const isUniqueError = error.name === 'SequelizeUniqueConstraintError';

  if (isValidationError || isUniqueError) {
    const message = error.errors?.[0]?.message || error.message;
    return fail(response, message, 400);
  }

  console.error(error);
  const statusCode = error.status || 500;
  const message = error.message || 'Internal server error';
  return fail(response, message, statusCode);
}
// End errorHandler
// ................................................

module.exports = { notFoundHandler, errorHandler };

// ============= End error handler middleware =============
