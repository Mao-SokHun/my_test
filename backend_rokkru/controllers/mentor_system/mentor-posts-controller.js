// ============= Start mentor posts controller =============
// Task #4 Posts — status draft | published | archived — frontend: mentorsApi
// ................................................

const { MentorPost, SubSkill, Province } = require('../../models/mentor_system');
const { ok, fail } = require('../../utils/mentor_system/api-response');
const { parseUserId, assertOwner } = require('../../utils/mentor_system/assert-owner');

// Start Sequelize include for post detail
// ................................................
const postInclude = [
  { model: SubSkill },
  { model: Province },
];
// End Sequelize include for post detail
// ................................................

// Start GET /mentors/:userId/posts
// ................................................
exports.listPosts = async (request, response) => {
  try {
    const userId = parseUserId(request.params.userId);
    if (userId === null) return fail(response, 'Invalid user id', 400);

    const where = { user_id: userId };
    if (request.query.status) where.status = request.query.status;

    const items = await MentorPost.findAll({
      where,
      include: postInclude,
      order: [['create_date', 'DESC']],
    });
    return ok(response, items);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End GET /mentors/:userId/posts
// ................................................

// Start GET /mentors/posts/:postId
// ................................................
exports.getPostById = async (request, response) => {
  try {
    const postId = parseInt(request.params.postId, 10);
    if (Number.isNaN(postId)) return fail(response, 'Invalid post id', 400);

    const post = await MentorPost.findByPk(postId, { include: postInclude });
    if (!post) return fail(response, 'Post not found', 404);
    return ok(response, post);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End GET /mentors/posts/:postId
// ................................................

// Start POST /mentors/:userId/posts
// ................................................
exports.createPost = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;

    const userId = parseUserId(request.params.userId);
    const { title, description, province_id, sub_skill_id, status } = request.body;

    if (!title || !province_id || !sub_skill_id) {
      return fail(response, 'title, province_id, and sub_skill_id are required', 400);
    }

    const post = await MentorPost.create({
      user_id: userId,
      title,
      description,
      province_id,
      sub_skill_id,
      status: status || 'draft',
      create_date: new Date(),
    });

    const full = await MentorPost.findByPk(post.post_id, { include: postInclude });
    return ok(response, full, 201);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End POST /mentors/:userId/posts
// ................................................

// Start PUT /mentors/posts/:postId
// ................................................
exports.updatePost = async (request, response) => {
  try {
    const postId = parseInt(request.params.postId, 10);
    if (Number.isNaN(postId)) return fail(response, 'Invalid post id', 400);

    const post = await MentorPost.findByPk(postId);
    if (!post) return fail(response, 'Post not found', 404);
    if (!assertOwner(request, response, post.user_id)) return;

    const allowedFields = ['title', 'description', 'province_id', 'sub_skill_id', 'status'];
    const updates = { update_date: new Date() };
    allowedFields.forEach((key) => {
      if (request.body[key] !== undefined) updates[key] = request.body[key];
    });

    await post.update(updates);
    const full = await MentorPost.findByPk(post.post_id, { include: postInclude });
    return ok(response, full);
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End PUT /mentors/posts/:postId
// ................................................

// Start DELETE /mentors/posts/:postId
// ................................................
exports.deletePost = async (request, response) => {
  try {
    const postId = parseInt(request.params.postId, 10);
    if (Number.isNaN(postId)) return fail(response, 'Invalid post id', 400);

    const post = await MentorPost.findByPk(postId);
    if (!post) return fail(response, 'Post not found', 404);
    if (!assertOwner(request, response, post.user_id)) return;

    await post.destroy();
    return ok(response, { deleted: true });
  } catch (error) {
    return fail(response, error.message, 500);
  }
};
// End DELETE /mentors/posts/:postId
// ................................................

// ============= End mentor posts controller =============
