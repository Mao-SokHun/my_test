const router = require('express').Router()
const ctrl = require('../../controllers/subscriptionController')
const { authenticate } = require('../../middleware/auth')

router.get('/current', authenticate, ctrl.getCurrent)
router.post('/', authenticate, ctrl.subscribe)
router.post('/cancel', authenticate, ctrl.cancel)
router.post('/resume', authenticate, ctrl.resume)

module.exports = router
