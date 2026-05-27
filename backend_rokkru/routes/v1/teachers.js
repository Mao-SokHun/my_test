const router = require('express').Router()
const ctrl = require('../../controllers/teacherController')
const { authenticate } = require('../../middleware/auth')

router.get('/', ctrl.list)
router.get('/:id', ctrl.getById)
router.put('/:id', authenticate, ctrl.update)
router.post('/:id/reviews', authenticate, ctrl.addReview)

module.exports = router
