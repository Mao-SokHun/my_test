const { Subscription, Teacher } = require('../models')

exports.getCurrent = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ where: { userId: req.user.id } })
    if (!teacher) return res.status(404).json({ error: 'Teacher profile not found' })

    let sub = await Subscription.findOne({ where: { teacherId: teacher.id } })
    if (!sub) {
      sub = await Subscription.create({ teacherId: teacher.id, plan: 'free' })
    }
    res.json(sub)
  } catch (err) { next(err) }
}

exports.subscribe = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ where: { userId: req.user.id } })
    if (!teacher) return res.status(404).json({ error: 'Teacher profile not found' })

    const { plan, billingInterval } = req.body
    let sub = await Subscription.findOne({ where: { teacherId: teacher.id } })

    const now = new Date()
    const periodEnd = new Date(now)
    periodEnd.setMonth(periodEnd.getMonth() + (billingInterval === 'annual' ? 12 : 1))

    if (sub) {
      await sub.update({ plan, billingInterval, status: 'active', currentPeriodStart: now, currentPeriodEnd: periodEnd, cancelAtPeriodEnd: false })
    } else {
      sub = await Subscription.create({ teacherId: teacher.id, plan, billingInterval, status: 'active', currentPeriodStart: now, currentPeriodEnd: periodEnd })
    }
    res.json(sub)
  } catch (err) { next(err) }
}

exports.cancel = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ where: { userId: req.user.id } })
    const sub = await Subscription.findOne({ where: { teacherId: teacher.id } })
    if (!sub) return res.status(404).json({ error: 'No subscription found' })

    await sub.update({ status: 'canceling', cancelAtPeriodEnd: true })
    res.json(sub)
  } catch (err) { next(err) }
}

exports.resume = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ where: { userId: req.user.id } })
    const sub = await Subscription.findOne({ where: { teacherId: teacher.id } })
    if (!sub) return res.status(404).json({ error: 'No subscription found' })

    await sub.update({ status: 'active', cancelAtPeriodEnd: false })
    res.json(sub)
  } catch (err) { next(err) }
}
