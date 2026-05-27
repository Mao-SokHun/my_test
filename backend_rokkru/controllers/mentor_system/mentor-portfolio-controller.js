// ============= Start mentor portfolio controller =============
// Task #2 Portfolio — table mentor_portfolio — frontend: useMentorPortfolio
// ................................................

const { MentorPortfolio } = require('../../models/mentor_system');
const { ok, fail } = require('../../utils/mentor_system/api-response');
const { parseUserId, assertOwner } = require('../../utils/mentor_system/assert-owner');

// Start GET /mentors/:userId/portfolio
// ................................................
exports.listPortfolio = async (request, response) => {
  try {
    const mentorId = parseUserId(request.params.userId);
    if (mentorId === null) return fail(response, 'Invalid user id', 400);

    const items = await MentorPortfolio.findAll({
      where: { mentor_id: mentorId },
      order: [['link', 'ASC']],
    });
    return ok(response, items);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End GET /mentors/:userId/portfolio
// ................................................

// Start POST /mentors/:userId/portfolio — JSON body
// ................................................
exports.createPortfolioItem = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;

    const mentorId = parseUserId(request.params.userId);
    const { link, link_tag, title, description, item_type } = request.body;
    if (!link) return fail(response, 'link is required', 400);

    const item = await MentorPortfolio.create({
      mentor_id: mentorId,
      link,
      link_tag: link_tag || null,
      title: title || null,
      description: description || null,
      item_type: item_type || 'project',
    });
    return ok(response, item, 201);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return fail(response, 'Portfolio link already exists for this mentor', 409);
    }
    return fail(response, error.message, 500);
  }
};
// End POST /mentors/:userId/portfolio
// ................................................

// Start PUT /mentors/:userId/portfolio/:link
// ................................................
exports.updatePortfolioItem = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;

    const mentorId = parseUserId(request.params.userId);
    const link = decodeURIComponent(request.params.link);

    const item = await MentorPortfolio.findOne({
      where: { mentor_id: mentorId, link },
    });
    if (!item) return fail(response, 'Portfolio item not found', 404);

    const updates = {};
    if (request.body.link_tag !== undefined) updates.link_tag = request.body.link_tag;
    if (request.body.title !== undefined) updates.title = request.body.title;
    if (request.body.description !== undefined) updates.description = request.body.description;
    if (request.body.item_type !== undefined) updates.item_type = request.body.item_type;
    if (request.body.link !== undefined && request.body.link !== link) {
      return fail(response, 'Use delete + create to change link (composite primary key)', 400);
    }

    await item.update(updates);
    return ok(response, item);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End PUT /mentors/:userId/portfolio/:link
// ................................................

// Start POST /mentors/:userId/portfolio/upload — multer file
// ................................................
exports.uploadPortfolioFile = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;
    if (!request.file) return fail(response, 'file is required', 400);

    const mentorId = parseUserId(request.params.userId);
    const link = `/uploads/portfolio/${request.file.filename}`;
    const { link_tag, title, description, item_type } = request.body;

    const item = await MentorPortfolio.create({
      mentor_id: mentorId,
      link,
      link_tag: link_tag || 'upload',
      title: title || request.file.originalname,
      description: description || null,
      item_type: item_type || 'project',
    });
    return ok(response, item, 201);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return fail(response, 'Portfolio link already exists for this mentor', 409);
    }
    return fail(response, error.message, 500);
  }
};
// End POST /mentors/:userId/portfolio/upload
// ................................................

// Start DELETE /mentors/:userId/portfolio/:link
// ................................................
exports.deletePortfolioItem = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;

    const mentorId = parseUserId(request.params.userId);
    const link = decodeURIComponent(request.params.link);

    const deleted = await MentorPortfolio.destroy({
      where: { mentor_id: mentorId, link },
    });
    if (!deleted) return fail(response, 'Portfolio item not found', 404);
    return ok(response, { deleted: true });
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End DELETE /mentors/:userId/portfolio/:link
// ................................................

// ============= End mentor portfolio controller =============
