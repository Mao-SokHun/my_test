// ============= Start mentors controller =============
// Task #1 Mentor CRUD + Task #5 Search — frontend: mentorsApi.js
// ................................................

const { Op } = require('sequelize');
const { Mentor, MentorSkill, SubSkill } = require('../../models/mentor_system');
const { ok, fail } = require('../../utils/mentor_system/api-response');
const { parseUserId, assertOwner } = require('../../utils/mentor_system/assert-owner');

// Start build list and search query from query string
// ................................................
function buildListQuery(request) {
  const page = Math.max(1, parseInt(request.query.page, 10) || 1);
  const limit = Math.min(50, parseInt(request.query.limit, 10) || 20);
  const offset = (page - 1) * limit;
  const searchText = (request.query.q || '').trim();
  const minExperience = parseInt(request.query.minExperience, 10);
  const skillId = parseInt(request.query.skillId, 10);
  const subSkillId = parseInt(request.query.subSkillId, 10);

  const where = {};
  if (searchText) {
    where[Op.or] = [
      { firstname: { [Op.iLike]: `%${searchText}%` } },
      { lastname: { [Op.iLike]: `%${searchText}%` } },
      { description: { [Op.iLike]: `%${searchText}%` } },
    ];
  }
  if (!Number.isNaN(minExperience)) {
    where.experience_years = { [Op.gte]: minExperience };
  }

  const include = [];
  if (!Number.isNaN(subSkillId)) {
    include.push({
      model: MentorSkill,
      where: { sub_skill_id: subSkillId },
      required: true,
      attributes: [],
    });
  } else if (!Number.isNaN(skillId)) {
    include.push({
      model: MentorSkill,
      required: true,
      attributes: [],
      include: [{
        model: SubSkill,
        where: { skill_id: skillId },
        required: true,
        attributes: [],
      }],
    });
  }

  const sort = (request.query.sort || 'newest').toLowerCase();
  let order = [['create_date', 'DESC']];
  if (sort === 'experience') order = [['experience_years', 'DESC']];
  if (sort === 'name') order = [['firstname', 'ASC'], ['lastname', 'ASC']];

  return { page, limit, offset, where, include, order };
}
// End build list and search query from query string
// ................................................

// Start GET /mentors — paginated list
// ................................................
exports.listMentors = async (request, response) => {
  try {
    const { page, limit, offset, where, include, order } = buildListQuery(request);
    const { rows, count } = await Mentor.findAndCountAll({
      where,
      include,
      distinct: true,
      limit,
      offset,
      order,
    });
    return ok(response, { items: rows, total: count, page, limit });
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End GET /mentors
// ................................................

// Start GET /mentors/search — same filters as list
// ................................................
exports.searchMentors = async (request, response) => {
  return exports.listMentors(request, response);
};
// End GET /mentors/search
// ................................................

// Start GET /mentors/:userId — one profile
// ................................................
exports.getMentorById = async (request, response) => {
  try {
    const userId = parseUserId(request.params.userId);
    if (userId === null) return fail(response, 'Invalid user id', 400);

    const mentor = await Mentor.findByPk(userId);
    if (!mentor) return fail(response, 'Mentor not found', 404);
    return ok(response, mentor);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End GET /mentors/:userId
// ................................................

// Start GET /mentors/me — logged-in mentor row
// ................................................
exports.getMyMentor = async (request, response) => {
  try {
    const mentor = await Mentor.findByPk(request.user.userId);
    if (!mentor) return fail(response, 'Mentor profile not found', 404);
    return ok(response, mentor);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End GET /mentors/me
// ................................................

// Start POST /mentors — create profile for JWT user
// ................................................
exports.createMentor = async (request, response) => {
  try {
    const userId = request.user.userId;
    const exists = await Mentor.findByPk(userId);
    if (exists) return fail(response, 'Mentor profile already exists', 409);

    const {
      firstname,
      lastname,
      gender,
      phone_number,
      address,
      experience_years,
      description,
      profile_picture,
    } = request.body;

    if (!firstname || !lastname) {
      return fail(response, 'firstname and lastname are required', 400);
    }

    const mentor = await Mentor.create({
      user_id: userId,
      firstname,
      lastname,
      gender,
      phone_number,
      address,
      experience_years,
      description,
      profile_picture,
      create_date: new Date(),
    });

    return ok(response, mentor, 201);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End POST /mentors
// ................................................

// Start PUT /mentors/:userId — owner only
// ................................................
exports.updateMentor = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;

    const userId = parseUserId(request.params.userId);
    const mentor = await Mentor.findByPk(userId);
    if (!mentor) return fail(response, 'Mentor not found', 404);

    const allowedFields = [
      'firstname', 'lastname', 'gender', 'phone_number', 'address',
      'experience_years', 'description', 'profile_picture',
    ];
    const updates = {};
    allowedFields.forEach((key) => {
      if (request.body[key] !== undefined) updates[key] = request.body[key];
    });
    updates.update_date = new Date();

    await mentor.update(updates);
    return ok(response, mentor);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End PUT /mentors/:userId
// ................................................

// Start DELETE /mentors/:userId — owner only
// ................................................
exports.deleteMentor = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;

    const userId = parseUserId(request.params.userId);
    const mentor = await Mentor.findByPk(userId);
    if (!mentor) return fail(response, 'Mentor not found', 404);

    await mentor.destroy();
    return ok(response, { deleted: true });
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End DELETE /mentors/:userId
// ................................................

// ============= End mentors controller =============
