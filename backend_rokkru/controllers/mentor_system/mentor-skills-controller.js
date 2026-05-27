// ============= Start mentor skills controller =============
// Task #3 Skills — frontend: useMentorSkills, fetchSkillCatalog
// ................................................

const { MentorSkill, SubSkill, Skill } = require('../../models/mentor_system');
const { ok, fail } = require('../../utils/mentor_system/api-response');
const { parseUserId, assertOwner } = require('../../utils/mentor_system/assert-owner');

// Start include SubSkill and Skill names in response
// ................................................
const skillInclude = [{
  model: SubSkill,
  include: [{ model: Skill }],
}];
// End include SubSkill and Skill names in response
// ................................................

// Start GET /mentors/skills/catalog
// ................................................
exports.listSkillCatalog = async (request, response) => {
  try {
    const catalog = await Skill.findAll({
      include: [{ model: SubSkill }],
      order: [['skill_name', 'ASC']],
    });
    return ok(response, catalog);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End GET /mentors/skills/catalog
// ................................................

// Start GET /mentors/:userId/skills
// ................................................
exports.listSkills = async (request, response) => {
  try {
    const userId = parseUserId(request.params.userId);
    if (userId === null) return fail(response, 'Invalid user id', 400);

    const items = await MentorSkill.findAll({
      where: { user_id: userId },
      include: skillInclude,
      order: [['create_date', 'DESC']],
    });
    return ok(response, items);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End GET /mentors/:userId/skills
// ................................................

// Start POST /mentors/:userId/skills
// ................................................
exports.addSkill = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;

    const userId = parseUserId(request.params.userId);
    const { sub_skill_id, proficiency_level } = request.body;
    if (!sub_skill_id) return fail(response, 'sub_skill_id is required', 400);

    const subSkill = await SubSkill.findByPk(sub_skill_id);
    if (!subSkill) return fail(response, 'Sub-skill not found', 404);

    const item = await MentorSkill.create({
      user_id: userId,
      sub_skill_id,
      proficiency_level: proficiency_level || null,
      create_date: new Date(),
    });

    const full = await MentorSkill.findByPk(item.ms_id, { include: skillInclude });
    return ok(response, full, 201);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return fail(response, 'Skill already added', 409);
    }
    return fail(response, error.message, 500);
  }
};
// End POST /mentors/:userId/skills
// ................................................

// Start PUT /mentors/:userId/skills/:msId
// ................................................
exports.updateSkill = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;

    const userId = parseUserId(request.params.userId);
    const msId = parseInt(request.params.msId, 10);
    if (Number.isNaN(msId)) return fail(response, 'Invalid skill id', 400);

    const item = await MentorSkill.findOne({
      where: { ms_id: msId, user_id: userId },
    });
    if (!item) return fail(response, 'Mentor skill not found', 404);

    const updates = { update_date: new Date() };
    if (request.body.proficiency_level !== undefined) {
      updates.proficiency_level = request.body.proficiency_level;
    }
    if (request.body.sub_skill_id !== undefined) {
      updates.sub_skill_id = request.body.sub_skill_id;
    }

    await item.update(updates);
    const full = await MentorSkill.findByPk(item.ms_id, { include: skillInclude });
    return ok(response, full);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End PUT /mentors/:userId/skills/:msId
// ................................................

// Start DELETE /mentors/:userId/skills/:msId
// ................................................
exports.deleteSkill = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;

    const userId = parseUserId(request.params.userId);
    const msId = parseInt(request.params.msId, 10);
    if (Number.isNaN(msId)) return fail(response, 'Invalid skill id', 400);

    const deleted = await MentorSkill.destroy({
      where: { ms_id: msId, user_id: userId },
    });
    if (!deleted) return fail(response, 'Mentor skill not found', 404);
    return ok(response, { deleted: true });
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End DELETE /mentors/:userId/skills/:msId
// ................................................

// ============= End mentor skills controller =============
