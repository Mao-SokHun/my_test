const { Notification } = require('../models')

exports.list = async (req, res, next) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: 50,
    })
    res.json({ data: notifications })
  } catch (err) { next(err) }
}

exports.markRead = async (req, res, next) => {
  try {
    await Notification.update({ read: true }, { where: { id: req.params.id, userId: req.user.id } })
    res.json({ success: true })
  } catch (err) { next(err) }
}

exports.markAllRead = async (req, res, next) => {
  try {
    await Notification.update({ read: true }, { where: { userId: req.user.id, read: false } })
    res.json({ success: true })
  } catch (err) { next(err) }
}
