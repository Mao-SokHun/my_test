const router = require('express').Router()
const ctrl = require('../../controllers/communityController')
const { authenticate } = require('../../middleware/auth')

router.get('/', ctrl.list)
router.get('/:id', ctrl.getById)
router.post('/', authenticate, ctrl.create)
router.post('/:id/posts', authenticate, ctrl.createPost)
router.post('/:id/posts/:postId/like', authenticate, ctrl.likePost)

module.exports = router
