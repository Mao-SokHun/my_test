const { Community, CommunityMember, Post, PostLike, User } = require('../models')

exports.list = async (req, res, next) => {
  try {
    const { type, q } = req.query
    const where = {}
    if (type) where.type = type

    const communities = await Community.findAll({ where, order: [['memberCount', 'DESC']] })
    if (q) {
      const lower = q.toLowerCase()
      const filtered = communities.filter(
        (c) => c.name.toLowerCase().includes(lower) || (c.category || '').toLowerCase().includes(lower)
      )
      return res.json(filtered)
    }
    res.json(communities)
  } catch (err) { next(err) }
}

exports.getById = async (req, res, next) => {
  try {
    const community = await Community.findByPk(req.params.id, {
      include: [{ model: Post, as: 'posts', limit: 20, order: [['createdAt', 'DESC']],
        include: [{ model: User, as: 'author', attributes: ['name', 'avatar'] }] }],
    })
    if (!community) return res.status(404).json({ error: 'Community not found' })
    res.json(community)
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const community = await Community.create({ ...req.body, createdBy: req.user.id })
    await CommunityMember.create({ communityId: community.id, userId: req.user.id, role: 'admin' })
    res.status(201).json(community)
  } catch (err) { next(err) }
}

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create({ communityId: req.params.id, authorId: req.user.id, ...req.body })
    res.status(201).json(post)
  } catch (err) { next(err) }
}

exports.likePost = async (req, res, next) => {
  try {
    const existing = await PostLike.findOne({ where: { postId: req.params.postId, userId: req.user.id } })
    if (existing) {
      await existing.destroy()
      await Post.decrement('likeCount', { where: { id: req.params.postId } })
      return res.json({ liked: false })
    }
    await PostLike.create({ postId: req.params.postId, userId: req.user.id })
    await Post.increment('likeCount', { where: { id: req.params.postId } })
    res.json({ liked: true })
  } catch (err) { next(err) }
}
