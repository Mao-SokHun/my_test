import { fail } from '../utils/mentor_system/api-response.js';

function requireFields(body, fields) {
  const missing = fields.filter(
    (f) => body[f] === undefined || body[f] === null || body[f] === '',
  );
  if (missing.length) {
    return `Missing required fields: ${missing.join(', ')}`;
  }
  return null;
}

function validate(request, response, { required = [], custom } = {}) {
  const msg = requireFields(request.body, required);
  if (msg) {
    fail(response, msg, 400);
    return false;
  }
  if (custom) {
    const customMsg = custom(request.body, request.params);
    if (customMsg) {
      fail(response, customMsg, 400);
      return false;
    }
  }
  return true;
}

function positiveInt(value, fieldName) {
  const n = parseInt(value, 10);
  if (Number.isNaN(n) || n < 1) {
    return `${fieldName} must be a positive integer`;
  }
  return null;
}

function nonEmptyString(value, fieldName, maxLength) {
  if (typeof value !== 'string' || !value.trim()) {
    return `${fieldName} must be a non-empty string`;
  }
  if (maxLength && value.length > maxLength) {
    return `${fieldName} must be at most ${maxLength} characters`;
  }
  return null;
}

export { validate, requireFields, positiveInt, nonEmptyString };
