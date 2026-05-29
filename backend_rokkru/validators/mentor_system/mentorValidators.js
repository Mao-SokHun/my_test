import { validate, positiveInt } from './validate.js';

const MENTOR_UPDATE_FIELDS = [
  'firstname',
  'lastname',
  'gender',
  'phone_number',
  'address',
  'experience_years',
  'description',
  'profile_picture',
];

function validateCreateMentor(request, response, next) {
  const ok = validate(request, response, {
    required: ['firstname', 'lastname'],
    custom: (body) => {
      if (
        body.experience_years !== undefined &&
        body.experience_years !== null
      ) {
        const n = parseInt(body.experience_years, 10);
        if (Number.isNaN(n) || n < 0) {
          return 'experience_years must be a non-negative integer';
        }
      }
      return null;
    },
  });
  if (!ok) return;
  next();
}

function validateUpdateMentor(request, response, next) {
  const ok = validate(request, response, {
    custom: (body) => {
      const hasField = MENTOR_UPDATE_FIELDS.some((f) => body[f] !== undefined);
      if (!hasField) {
        return `Provide at least one of: ${MENTOR_UPDATE_FIELDS.join(', ')}`;
      }
      if (
        body.experience_years !== undefined &&
        body.experience_years !== null
      ) {
        const n = parseInt(body.experience_years, 10);
        if (Number.isNaN(n) || n < 0) {
          return 'experience_years must be a non-negative integer';
        }
      }
      return null;
    },
  });
  if (!ok) return;
  next();
}

export { validateCreateMentor, validateUpdateMentor };
