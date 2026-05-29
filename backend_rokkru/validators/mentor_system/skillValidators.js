import { validate, positiveInt } from './validate.js';

function validateAddMentorSkill(request, response, next) {
  const ok = validate(request, response, {
    required: ['sub_skill_id'],
    custom: (body) => positiveInt(body.sub_skill_id, 'sub_skill_id'),
  });
  if (!ok) return;
  next();
}

export { validateAddMentorSkill };
