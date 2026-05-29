import { validate, positiveInt, nonEmptyString } from './validate.js';

const POST_UPDATE_FIELDS = [
  'title',
  'description',
  'province_id',
  'sub_skill_id',
  'status',
];

function validateCreatePost(request, response, next) {
  const ok = validate(request, response, {
    required: ['title', 'province_id', 'sub_skill_id'],
    custom: (body) => {
      const titleErr = nonEmptyString(body.title, 'title', 255);
      if (titleErr) return titleErr;
      const provinceErr = positiveInt(body.province_id, 'province_id');
      if (provinceErr) return provinceErr;
      const subSkillErr = positiveInt(body.sub_skill_id, 'sub_skill_id');
      if (subSkillErr) return subSkillErr;
      if (
        body.status !== undefined &&
        !['draft', 'published'].includes(body.status)
      ) {
        return 'status must be draft or published';
      }
      return null;
    },
  });
  if (!ok) return;
  next();
}

function validateUpdatePost(request, response, next) {
  const ok = validate(request, response, {
    custom: (body) => {
      const hasField = POST_UPDATE_FIELDS.some((f) => body[f] !== undefined);
      if (!hasField) {
        return `Provide at least one of: ${POST_UPDATE_FIELDS.join(', ')}`;
      }
      if (body.title !== undefined) {
        const titleErr = nonEmptyString(body.title, 'title', 255);
        if (titleErr) return titleErr;
      }
      if (body.province_id !== undefined) {
        const err = positiveInt(body.province_id, 'province_id');
        if (err) return err;
      }
      if (body.sub_skill_id !== undefined) {
        const err = positiveInt(body.sub_skill_id, 'sub_skill_id');
        if (err) return err;
      }
      if (
        body.status !== undefined &&
        !['draft', 'published'].includes(body.status)
      ) {
        return 'status must be draft or published';
      }
      return null;
    },
  });
  if (!ok) return;
  next();
}

export { validateCreatePost, validateUpdatePost };
