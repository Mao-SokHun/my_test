const router = require('express').Router()
const ctrl = require('../../controllers/adminController')
const { authenticate, requireRole } = require('../../middleware/auth')

router.use(authenticate, requireRole('admin'))

router.get('/users', ctrl.getUsers)
router.put('/users/:id', ctrl.updateUser)
router.delete('/users/:id', ctrl.deleteUser)
router.get('/reports', ctrl.getReports)

module.exports = router
