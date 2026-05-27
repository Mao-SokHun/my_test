const router = require('express').Router()

router.use('/auth', require('./v1/auth'))
router.use('/teachers', require('./v1/teachers'))
router.use('/sessions', require('./v1/sessions'))
router.use('/communities', require('./v1/communities'))
router.use('/notifications', require('./v1/notifications'))
router.use('/subscriptions', require('./v1/subscriptions'))
router.use('/filters', require('./v1/filters'))
router.use('/search', require('./v1/search'))
router.use('/admin', require('./v1/admin'))

module.exports = router
