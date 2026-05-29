import { validate, nonEmptyString } from './validate.js';

function validateCreatePortfolio(request, response, next) {
  const ok = validate(request, response, {
    required: ['link'],
    custom: (body) => {
      const linkErr = nonEmptyString(body.link, 'link', 250);
      if (linkErr) return linkErr;
      if (
        body.link_tag !== undefined &&
        body.link_tag !== null &&
        typeof body.link_tag === 'string' &&
        body.link_tag.length > 250
      ) {
        return 'link_tag must be at most 250 characters';
      }
      return null;
    },
  });
  if (!ok) return;
  next();
}

function validateUpdatePortfolio(request, response, next) {
  const ok = validate(request, response, {
    custom: (body) => {
      if (body.link_tag === undefined) {
        return 'link_tag is required for update';
      }
      if (
        body.link_tag !== null &&
        typeof body.link_tag === 'string' &&
        body.link_tag.length > 250
      ) {
        return 'link_tag must be at most 250 characters';
      }
      return null;
    },
  });
  if (!ok) return;
  next();
}

export { validateCreatePortfolio, validateUpdatePortfolio };
