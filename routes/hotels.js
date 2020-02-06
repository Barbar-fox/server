const express = require ('express')
const router = express.Router()
const hotelController = require('../controllers/hotelController')

router.get('/', hotelController.getAll)
router.get('/:id', hotelController.getOne)
router.post('/', hotelController.create)
router.put('/:id', hotelController.update)
router.delete('/:id', hotelController.deleteOne)

module.exports = router