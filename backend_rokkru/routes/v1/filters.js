const router = require('express').Router()
const ctrl = require('../../controllers/filterController')

router.get('/', ctrl.getFilterOptions)

module.exports = router
